'use strict'

const Schema = use('Schema')

class MangaSchema extends Schema {
  up () {
    this.create('manga', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.string('author', 50)
      table.string('artist', 50)
      table.string('release_date', 10)
      table.string('description', 255)
      table.boolean('is_completed')
      table.timestamp('updated_chapters_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('manga')
  }
}

module.exports = MangaSchema
