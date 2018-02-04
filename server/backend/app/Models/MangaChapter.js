'use strict'

const Model = use('Model')

class MangaChapter extends Model {
  static get table () {
    return 'manga_chapters'
  }
}

module.exports = MangaChapter
