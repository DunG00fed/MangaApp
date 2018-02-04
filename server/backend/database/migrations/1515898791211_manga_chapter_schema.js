'use strict'

const Schema = require('Schema')

class MangaChapterSchema extends Schema {
  up () {
    this.create('manga_chapters', (table) => {
      table.increments()
      table.integer('manga_id').unsigned().references('id').inTable('manga').notNull()
      table.integer('manga_website_id').unsigned().references('id').inTable('manga_websites').notNull()
      table.string('name', 100)
      table.decimal('chapter_num').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_chapters')
  }
}

module.exports = MangaChapterSchema
