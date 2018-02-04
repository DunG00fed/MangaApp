'use strict'

const Model = require('Model')

class Manga extends Model {
  static get table () {
    return 'manga'
  }
}

module.exports = Manga
