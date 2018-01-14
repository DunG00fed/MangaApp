'use strict'

const Schema = use('Schema')

class MangaChapterPageSchema extends Schema {
  up () {
    this.create('manga_chapter_pages', (table) => {
      table.increments()
      table.integer('manga_chapter_id').unsigned().references('id').inTable('manga_chapters').notNull()
      table.string('name', 100)
      table.string('ext', 10)
      table.integer('page_num').unsigned().notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_chapter_pages')
  }
}

module.exports = MangaChapterPageSchema
