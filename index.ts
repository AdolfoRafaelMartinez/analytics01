import * as express from "express";
import * as path from "path";
import * as bip39 from "bip39";
import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);
const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  const mnemonic = bip39.generateMnemonic();
  res.render('index', { mnemonic: mnemonic });
});

app.get('/api', (req, res) => {
  const mnemonic = bip39.generateMnemonic();
  res.json({"msg": "Hello world", "mnemonic": mnemonic});
});

app.post('/api/wallet', (req, res) => {
  const { mnemonic } = req.body;
  if (!mnemonic) {
    return res.status(400).json({ error: 'Mnemonic is required' });
  }
  try {
    const wallet = create_hd_wallet_bitcoin(mnemonic, 'bitcoin-mainnet');
    res.json(wallet);
  } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to create wallet. The mnemonic may be invalid.'});
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

function create_hd_wallet_bitcoin(mnemonic, network_name) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    let network;
    let path_prefix;

    if (network_name === 'bitcoin-mainnet') {
        network = bitcoin.networks.bitcoin;
        path_prefix = "m/49'/0'/0'/0";
    } else {
        network = bitcoin.networks.testnet;
        path_prefix = "m/49'/1'/0'/0";
    }

    const root = bip32.fromSeed(seed, network);
    const childKeys = [];

    for (let i = 0; i < 10; i++) {
        const childAccount = root.derivePath(`${path_prefix}/${i}`);
        const { address } = bitcoin.payments.p2wpkh({
            pubkey: childAccount.publicKey,
            network: network,
        });

        childKeys.push({
            path: `${path_prefix}/${i}`,
            address: address,
            privateKey: childAccount.privateKey.toString('hex'),
            publicKey: childAccount.publicKey.toString('hex')
        });
    }

    return {
        mnemonic: mnemonic,
        seed: seed.toString('hex'),
        network: network_name,
        root: root.toBase58(),
        childKeys
    };
}
