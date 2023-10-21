// Express app

const express = require('express');
const { auth } = require('express-openid-connect');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// enviorment variables
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};
app.use(auth(config));
app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

app.listen(port, () => console.log(`Backend listening on ${port}!`));