'use strict'

// const Manga = use('App/Models/Manga')
const Logger = use('Logger')
const Request = require('request')

class MangaService {
  async index (title) {
    return doRequest('http://127.0.0.1:3000/api/mangapanda/' + title)

    function doRequest (url) {
      return new Promise(function (resolve, reject) {
        Request(url, function (error, res, body) {
          if (!error && res.statusCode === 200) {
            resolve(body)
          } else {
            reject(error)
          }
        })
      })
    }
  }
}

module.exports = MangaService
