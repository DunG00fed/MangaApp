const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()
server.use(cors())

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
server.use(bodyParser.json())

const HOST = '127.0.0.1'
const PORT = 3000

server.use('/api/mangareader', require('./routes/mangareader'))
server.use('/api/mangaonline', require('./routes/mangaonline'))
server.use('/api/mangapanda', require('./routes/mangapanda'))

// ============== Start Server===========//

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`)
})
