'use strict'

const Schema = use('Schema')

class MangaSchema extends Schema {
  up () {
    this.create('manga', (table) => {
      table.increments()
      table.integer('manga_website_id').unsigned().references('id').inTable('manga_websites')
      table.string('path', 100).notNullable()
      table.string('name', 100).notNullable()
      table.string('author', 64)
      table.string('artist', 64)
      table.string('description', 1024)
      table.boolean('is_completed')
      table.timestamps()
    })
  }

  down () {
    this.drop('manga')
  }
}

module.exports = MangaSchema
