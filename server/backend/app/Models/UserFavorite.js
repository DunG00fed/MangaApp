'use strict'

const Model = require('Model')

class UserFavorite extends Model {
  static get table () {
    return 'user_favorites'
  }
}

module.exports = UserFavorite
