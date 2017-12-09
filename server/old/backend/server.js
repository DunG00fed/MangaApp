const http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      passport = require('passport');
      config = require('./config');

const server = express();
const HOST = '127.0.0.1';
const PORT = 3000;

// connect to the database and load models
require('./server/models').connect(config.dbUri);

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
server.use(bodyParser.json());
// pass the passport middleware
server.use(passport.initialize());

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//============== Start Server===========//

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
