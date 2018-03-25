'use strict'

const Model = use('Model')

class MangaChapterPage extends Model {
  static get table () {
    return 'manga_chapter_pages'
  }

  /**
   * @method pages
   *
   * @return {Object}
   */
  pages () {
    return this.hasMany('App/Models/MangaChapterPage')
  }
}

module.exports = MangaChapterPage
