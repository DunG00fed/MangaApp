'use strict'

const Model = require('Model')

class MangaChapterPage extends Model {
  static get table () {
    return 'manga_chapter_pages'
  }
}

module.exports = MangaChapterPage
