'use strict'

const Model = require('Model')

class MangaChapter extends Model {
  static get table () {
    return 'manga_chapters'
  }

  static get primaryKey () {
    return ['manga_id', 'manga_page_id']
  }
}

module.exports = MangaChapter
