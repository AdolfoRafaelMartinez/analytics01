import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mainRoutes from './routes/main_routes.js';
import p2pkhRoutes from './routes/p2pkh_routes.js';
import balanceRoutes from './routes/balance_routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || process.argv[2] || '8080', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Serve static files from the project's 'public' directory
app.use(express.static(join(__dirname, '..', 'public')));

// Use the new routers
app.use('/', mainRoutes);
app.use('/', p2pkhRoutes);
app.use('/', balanceRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
