'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = require('Route')

Route.post('login', 'AuthController.login')
Route.post('register', 'RegisterController.registerUser')

Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()
}).middleware(['auth'])
