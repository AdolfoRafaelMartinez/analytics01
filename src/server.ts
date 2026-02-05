require('dotenv').config();
import express, { Request, Response } from 'express';
import * as path from "path";
import * as fs from "fs";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import axios from 'axios';

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);
const app = express();
const port = parseInt(process.env.PORT || process.argv[3] || "8080", 10);

const BTC_API_KEY = process.env.BTC_API_KEY;
const QN_BTC_URL = `https://wispy-muddy-mound.btc-testnet4.quiknode.pro/${BTC_API_KEY}/`

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded form data

// Correctly serve static files from 'public' and set 'views' directory for TS projects
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req: Request, res: Response) => {
    res.render('home');
});

app.get('/wallet', (req: Request, res: Response) => {
    const mnemonic = bip39.generateMnemonic();
    res.render('index', { mnemonic: mnemonic });
});

app.get('/private-key-to-address', (req: Request, res: Response) => {
    res.render('private-key-to-address');
});

app.get('/mnemonic-to-private-key', (req: Request, res: Response) => {
    res.render('mnemonic-to-private-key');
});

app.get('/cointypes', (req: Request, res: Response) => {
  const csvPath = path.join(__dirname, '..', 'public', 'coin_types.csv');
  fs.readFile(csvPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      return res.status(500).send("Error reading coin types data.");
    }
    const lines = data.trim().split(/\r?\n/);
    lines.shift(); // remove header
    const cointypes = lines.map(line => {
      const values = line.split(',');
      return {
        bip44_index: values[0],
        symbol: values[2],
        coin: values[3]
      };
    });
    res.render('cointypes', { cointypes });
  });
});

app.get('/transfer', (req: Request, res: Response) => {
    res.render('transfer');
});

app.get('/api', (req: Request, res: Response) => {
  const mnemonic = bip39.generateMnemonic();
  res.json({"msg": "Hello world", "mnemonic": mnemonic});
});

app.post('/api/wallet', (req: Request, res: Response) => {
  const { mnemonic, name, network }: { mnemonic: string; name?: string; network?: string } = req.body;
  if (!mnemonic) {
    return res.status(400).json({ error: 'Mnemonic is required' });
  }
  try {
    const wallet = create_hd_wallet_bitcoin(mnemonic, network || 'testnet4', name);
    res.json(wallet);
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to create wallet. The mnemonic may be invalid.'});
  }
});

app.post('/api/get-address-from-private-key', (req: Request, res: Response) => {
    const { privateKey, network_name } = req.body;

    if (!privateKey) {
        return res.status(400).json({ error: 'Private key is required' });
    }

    try {
        const network = network_name === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
        const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });
        const publicKey = Buffer.from(keyPair.publicKey).toString('hex');
        res.json({ address, publicKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to derive address from private key.' });
    }
});

app.post('/api/get-address-from-mnemonic', (req: Request, res: Response) => {
    const { mnemonic: userMnemonic, network_name } = req.body;
    const mnemonic = userMnemonic || bip39.generateMnemonic();
    try {
        if (userMnemonic && !bip39.validateMnemonic(userMnemonic)) {
            return res.status(400).json({ error: 'Invalid mnemonic phrase.' });
        }
        const wallet = create_hd_wallet_bitcoin(mnemonic, network_name || 'testnet4');
        const firstChild = wallet.childKeys[0];
        res.json({ 
            mnemonic: wallet.mnemonic,
            privateKey: firstChild.privateKey,
            publicKey: firstChild.publicKey,
            address: firstChild.address
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to derive address from mnemonic.' });
    }
});

app.post('/transfer-btc', async (req: Request, res: Response) => {
    const { fromAddress, toAddress, amount, privateKey } = req.body;

    try {
        const network = bitcoin.networks.testnet;
        const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'), { network });
        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network });

        if (address !== fromAddress) {
            return res.status(400).json({ error: 'Private key does not match from address' });
        }

        const utxosResponse = await axios.post(QN_BTC_URL, {
            method: 'qn_listunspent',
            params: [fromAddress],
            id: 1,
            jsonrpc: '2.0'
        });

        const utxos = utxosResponse.data.result;

        if (utxos.length === 0) {
            return res.status(400).json({ error: 'No unspent transaction outputs found' });
        }

        const psbt = new bitcoin.Psbt({ network });
        const SATOSHIS_PER_BTC = 100_000_000;
        let totalInputInSatoshis = BigInt(0);

        for (const utxo of utxos) {
            const utxoAmountInSatoshis = BigInt(Math.floor(utxo.amount * SATOSHIS_PER_BTC));
            totalInputInSatoshis += utxoAmountInSatoshis;
            psbt.addInput({
                hash: utxo.txid,
                index: utxo.vout,
                nonWitnessUtxo: Buffer.from(utxo.hex, 'hex'),
            });
        }

        const amountToSendInSatoshis = BigInt(Math.floor(amount * SATOSHIS_PER_BTC));
        const feeInSatoshis = BigInt(10000); // a fixed fee for simplicity
        const changeInSatoshis = totalInputInSatoshis - amountToSendInSatoshis - feeInSatoshis;

        if (totalInputInSatoshis < amountToSendInSatoshis + feeInSatoshis) {
            return res.status(400).json({ error: 'Insufficient funds' });
        }

        psbt.addOutput({
            address: toAddress,
            value: amountToSendInSatoshis,
        });

        if (changeInSatoshis > BigInt(0)) {
            psbt.addOutput({
                address: fromAddress,
                value: changeInSatoshis,
            });
        }

        for (let i = 0; i < utxos.length; i++) {
            psbt.signInput(i, keyPair);
        }

        psbt.finalizeAllInputs();

        const txHex = psbt.extractTransaction().toHex();

        const sendResponse = await axios.post(QN_BTC_URL, {
            method: 'sendrawtransaction',
            params: [txHex],
            id: 1,
            jsonrpc: '2.0'
        });

        res.json({ txHash: sendResponse.data.result });

    } catch (error) {
        console.error('Error sending BTC transaction:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

function create_hd_wallet_bitcoin(mnemonic: string, network_name: string, name?: string) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    let network;
    let path_prefix;

    if (network_name === 'mainnet') {
        network = bitcoin.networks.bitcoin;
        path_prefix = "m/49'/0'/0'/0";
    } else { // 'testnet4'
        network = bitcoin.networks.testnet;
        path_prefix = "m/49'/1'/0'/0";
    }

    const root = bip32.fromSeed(seed, network);
    const childKeys = [];
    const path_parts = path_prefix.split('/');

    for (let i = 0; i < 10; i++) {
        const childAccount = root.derivePath(`${path_prefix}/${i}`);
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: childAccount.publicKey,
            network: network,
        });

        childKeys.push({
            path: {
                m: path_parts[0],
                purpose: path_parts[1],
                coinType: path_parts[2],
                account: path_parts[3],
                change: path_parts[4],
                index: i
            },
            address: address,
            privateKey: childAccount.privateKey!.toString('hex'),
            publicKey: childAccount.publicKey.toString('hex')
        });
    }

    return {
        name: name,
        mnemonic: mnemonic,
        seed: seed.toString('hex'),
        network: network_name,
        root: root.toBase58(),
        childKeys
    };
}
