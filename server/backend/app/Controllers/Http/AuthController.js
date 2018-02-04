'use strict'

// const User = require('App/Models/User')

class AuthController {
  async login ({ request, response, auth }) {
    const username = request.input('username')
    const password = request.input('password')

    if (username && password) {
      try {
        return await auth.attempt(username, password, true)
      } catch (error) {
        response.send(error)
      }
    }
  }
}

module.exports = AuthController
