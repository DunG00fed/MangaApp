'use strict'

const Service = use('App/Services/MangaService')
const Logger = use('Logger')

class MangaController {
  async index ({ request, response }) {
    const title = request.input('title')
    const mangaService = new Service()

    const result = await mangaService.index(title)
    Logger.error(result)
    response.json(result)
  }

  async store ({ request, response }) {
  }

  async show () {
  }

  async update () {
  }

  async delete () {
  }
}

module.exports = MangaController
