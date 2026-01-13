import * as express from "express";
import * as path from "path";
import * as bip39 from "bip39";

const app = express();
const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

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

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
