'use strict'

const User = use('App/Models/User')

class RegisterController {
  async registerUser ({request}) {
    const username = request.input('username')
    const email = request.input('email')
    const password = request.input('password')

    if (username && password) {
      const user = await User.create({
        username: username,
        email: email,
        password: password
      })
      await user.save() // SQL Insert
    }
  }
}

module.exports = RegisterController
