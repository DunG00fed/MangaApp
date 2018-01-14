'use strict'

const Schema = use('Schema')

class MangaWebsiteSchema extends Schema {
  up () {
    this.create('manga_websites', (table) => {
      table.uuid('id').primary()
      table.string('name', 100)
      table.string('ext', 10)
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_websites')
  }
}

module.exports = MangaWebsiteSchema
