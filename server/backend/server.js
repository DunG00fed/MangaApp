const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      passport = require('passport');
      config = require('./config');

const server = express();
const HOST = '127.0.0.1';
const PORT = 3000;

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
server.use(bodyParser.json());
// pass the passport middleware
server.use(passport.initialize());
//============== Start Server===========//

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
