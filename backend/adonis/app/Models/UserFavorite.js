'use strict'

const Model = use('Model')

class UserFavorite extends Model {
  static get table () {
    return 'user_favorites'
  }

  /**
   * @method manga
   *
   * @return {Object}
   */
  mangas () {
    return this.hasMany('App/Models/Manga')
  }
}

module.exports = UserFavorite
