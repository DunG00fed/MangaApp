//dependencies
var express = require('express'),
    bodyParser = require('body-parser');
    // cors = require('cors');
    server = express();
    // server.use(cors());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
server.use(bodyParser.json());

const HOST = '127.0.0.1';
const PORT = 3000;

server.use('/api/mangareader', require('./routes/mangareader'));
server.use('/api/mangaonline', require('./routes/mangaonline'));
server.use('/api/mangasupa', require('./routes/mangasupa'));
server.use('/api/manganel', require('./routes/manganel'));
// server.use('/api/mangahere', require('./routes/mangahere'));  // Currently Abandoned

//============== Start Server===========//

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
