require('dotenv').config();
import express from 'express';
import * as path from 'path';
import mainRoutes from './routes/main_routes';
import p2pkhRoutes from './routes/p2pkh_routes';

const app = express();
const port = parseInt(process.env.PORT || process.argv[3] || '8080', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, '..', 'public')));

// Use the new routers
app.use('/', mainRoutes);
app.use('/', p2pkhRoutes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
