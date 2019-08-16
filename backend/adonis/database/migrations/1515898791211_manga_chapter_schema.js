'use strict'

const Schema = use('Schema')

class MangaChapterSchema extends Schema {
  up () {
    this.create('manga_chapters', (table) => {
      table.increments()
      table.integer('manga_id').unsigned().references('id').inTable('manga').notNull()
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
