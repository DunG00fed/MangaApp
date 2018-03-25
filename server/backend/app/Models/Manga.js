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
    return this.belongsToMany('App/Models/Genre').pivotTable('manga_genre')
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
    return this.belongsTo('App/Models/MangaWebsite')
  }
}

module.exports = Manga
