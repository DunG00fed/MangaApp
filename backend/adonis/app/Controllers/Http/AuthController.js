'use strict'

// const User = use('App/Models/User')

class AuthController {
  async login ({ request, response, auth }) {
    const username = request.input('username')
    const password = request.input('password')

    if (username && password) {
      try {
        const result =  await auth.attempt(username, password, true)
        response.send(result)
      } catch (error) {
        response.send(error)
      }
    }
  }
}

module.exports = AuthController
