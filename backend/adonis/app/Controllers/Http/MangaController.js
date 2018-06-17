'use strict'

const Service = use('App/Services/MangaService')
const Logger = use('Logger')

class MangaController {
  async index ({ request, response }) {
    const path = request.input('path')
    const domain = request.input('domain')
    const mangaService = new Service()

    try {
      const result = await mangaService.index(path, domain)
      response.json(result.toJSON())
    } catch (error) {
      Logger.error(error)
    }
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
