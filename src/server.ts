import express, { Request, Response } from 'express';
import * as path from "path";
import * as fs from "fs";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);
const app = express();
const port = parseInt(process.env.PORT || process.argv[3] || "8080", 10);

app.use(express.json()); // Used to parse JSON bodies

// Correctly serve static files from 'public' and set 'views' directory for TS projects
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req: Request, res: Response) => {
  const mnemonic = bip39.generateMnemonic();
  res.render('index', { mnemonic: mnemonic });
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
    const wallet = create_hd_wallet_bitcoin(mnemonic, network || 'testnet', name);
    res.json(wallet);
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to create wallet. The mnemonic may be invalid.'});
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
    } else { // 'testnet'
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