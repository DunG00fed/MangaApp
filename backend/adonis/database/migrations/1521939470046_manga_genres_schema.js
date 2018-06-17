'use strict'

const Schema = use('Schema')

class MangaGenresSchema extends Schema {
  up () {
    this.create('manga_genre', (table) => {
      table.increments()
      table.integer('manga_id').unsigned().references('id').inTable('manga')
      table.integer('genre_id').unsigned().references('id').inTable('genres')
    })
  }

  down () {
    this.drop('manga_genre')
  }
}

module.exports = MangaGenresSchema
