'use strict'

const Schema = use('Schema')

class GenreSchema extends Schema {
  up () {
    this.create('genres', (table) => {
      table.uuid('id').primary()
      table.string('name', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('genres')
  }
}

module.exports = GenreSchema
