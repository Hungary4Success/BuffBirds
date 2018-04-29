const { print } = require('./server/utils');

const compression = require('compression');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const morgan = require('morgan');

global.Promise = require('bluebird');

// HTTPS Webserver
const app = express();
app.use(compression());
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({
//   secret: '98414c22d7e2cf27b3317ca7e19df38e9eb221bd',
//   resave: true,
//   saveUninitialized: false
// }));

app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
app.use(express.static(path.join(__dirname, 'www'), { index: false }));

app.get('/*', (request, response) => {
  console.log();
  console.log(`Request: ${request.originalUrl}`);
  response.sendFile(path.join(__dirname, '/www/index.html'));
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server/ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'server/ssl/cert.crt')),
  passphrase: 'iManT'
};
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const port = process.env.PORT || 443;
https.createServer(options, app).listen(port);
print(`HTTPS webserver is listening on port ${port}.`);
