'use strict'

const Schema = use('Schema')

class UserFavoriteSchema extends Schema {
  up () {
    this.create('user_favorites', (table) => {
      table.uuid('user_id').references('id').inTable('users').notNull()
      table.uuid('manga_id').references('id').inTable('manga').notNull()
      table.primary(['user_id', 'manga_id'])
      table.timestamps()
    })
  }

  down () {
    this.drop('user_favorites')
  }
}

module.exports = UserFavoriteSchema
