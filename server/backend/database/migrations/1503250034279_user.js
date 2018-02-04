'use strict'

const Schema = require('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('is_admin').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
