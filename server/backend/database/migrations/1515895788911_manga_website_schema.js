'use strict'

const Schema = use('Schema')

class MangaWebsiteSchema extends Schema {
  up () {
    this.create('manga_websites', (table) => {
      table.increments()
      table.string('name', 100).notNullable().unique()
      table.string('ext', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('manga_websites')
  }
}

module.exports = MangaWebsiteSchema
