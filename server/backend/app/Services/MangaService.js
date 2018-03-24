'use strict'

const Logger = use('Logger')
const Axios = require('axios')
const Manga = use('App/Models/Manga')
const Website = use('App/Models/MangaWebsite')

class MangaService {
  async index (title) {
    try {
      let manga = await Manga.findByOrFail('path', title)
      return manga
    } catch (error) {
      let manga
      await Axios.get('http://127.0.0.1:3000/api/mangareader/' + title)
        .then(async (response) => {
          const data = response.data
          let website = await Website.findBy('name', 'mangareader')
          manga = await Manga.create({
            name: data.title,
            path: title,
            description: data.summary
          })
          await manga.source().associate(website)
        })
      return manga
    }
  }
}

module.exports = MangaService
