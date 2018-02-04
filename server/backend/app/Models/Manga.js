'use strict'

const Model = use('Model')

class Manga extends Model {
  static get table () {
    return 'manga'
  }

  /**
   * @method genres
   *
   * @return {Object}
   */
  genres () {
    return this.hasMany('App/Models/Genre')
  }

  /**
   * @method chapters
   *
   * @return {Object}
   */
  chapters () {
    return this.hasMany('App/Models/MangaChapter')
  }

  /**
   * @method source
   *
   * @return {Object}
   */
  source () {
    return this.hasOne('App/Models/MangaWebsite')
  }
}

module.exports = Manga
