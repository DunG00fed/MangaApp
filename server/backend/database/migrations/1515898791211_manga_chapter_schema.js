'use strict'

const Schema = use('Schema')

class MangaChapterSchema extends Schema {
  up () {
    this.create('manga_chapters', (table) => {
      table.integer('manga_id').unsigned().references('id').inTable('manga').notNull()
      table.integer('manga_website_id').unsigned().references('id').inTable('manga_websites').notNull()
      table.primary(['manga_id', 'manga_website_id'])
      table.string('name', 100)
      table.integer('chapter_num')
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_chapters')
  }
}

module.exports = MangaChapterSchema
