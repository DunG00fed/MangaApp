'use strict'

const Model = require('Model')

class MangaWebsite extends Model {
  static get table () {
    return 'manga_websites'
  }
}

module.exports = MangaWebsite
