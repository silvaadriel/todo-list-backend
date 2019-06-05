'use strict'

const User = use('App/Models/User')

class AuthController {
  async register({ request, auth }) {
    const data = request.only(['name', 'email', 'password'])
    const { email, password } = data;

    const user = await User.create(data)

    const token = await auth.attempt(email, password)

    return token;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async user({ auth }) {
    const user = await auth.getUser()

    return user
  }
}

module.exports = AuthController
