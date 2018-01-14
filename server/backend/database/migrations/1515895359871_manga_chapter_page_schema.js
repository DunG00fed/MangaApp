'use strict'

const Schema = use('Schema')

class MangaChapterPageSchema extends Schema {
  up () {
    this.create('manga_chapter_pages', (table) => {
      table.uuid('id').primary()
      table.string('name', 100)
      table.string('ext', 10)
      table.integer('page_num')
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_chapter_pages')
  }
}

module.exports = MangaChapterPageSchema
