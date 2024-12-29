const express = require('express');
const routes = require('./routes/routes.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongooseSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: ['https://storeroomclient.vercel.app', 'https://storeroomserver.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  })
);

// API routes
app.use('/api', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/stock-room/dist/index.html'));
});

module.exports = app;
