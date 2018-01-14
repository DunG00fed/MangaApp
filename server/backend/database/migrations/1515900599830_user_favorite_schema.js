'use strict'

const Schema = use('Schema')

class UserFavoriteSchema extends Schema {
  up () {
    this.create('user_favorites', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users').notNull()
      table.integer('manga_id').unsigned().references('id').inTable('manga').notNull()
      table.primary(['user_id', 'manga_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('user_favorites')
  }
}

module.exports = UserFavoriteSchema
