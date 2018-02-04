'use strict'

const Schema = require('Schema')

class UserFavoriteSchema extends Schema {
  up () {
    this.create('user_favorites', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNull()
      table.integer('manga_id').unsigned().references('id').inTable('manga').notNull()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_favorites')
  }
}

module.exports = UserFavoriteSchema
