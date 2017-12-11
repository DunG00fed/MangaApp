'use strict'

class AuthController {

  async login ({ request, auth }) {
    const { email, password } = request.all()
     await auth.attempt(email, password)

     return 'Logged in successfully'
  }
}

module.exports = AuthController
