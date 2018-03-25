'use strict'

const Axios = require('axios')
const Config = use('Config')
const Logger = use('Logger')
const Manga = use('App/Models/Manga')
const Website = use('App/Models/MangaWebsite')
const Genre = use('App/Models/Genre')
const MangaRepository = use('App/Repositories/MangaRepository')

class MangaService {
  async index (path, domain) {
    try {
      const mangaRepository = new MangaRepository()
      let manga = await mangaRepository.findByDomainOrFail(path, domain)
      return manga
    } catch (error) {
      let manga
      await Axios.get(Config.get('scraperAPI.URL') + '/' + domain + '/' + path)
        .then(async (response) => {
          const data = response.data
          manga = await Manga.create({
            name: data.title,
            path: path,
            description: data.summary
          })
          let website = await Website.findBy('name', domain)
          await manga.source().associate(website)

          // TODO Change this to a Promise All
          for (let genre of data.genre) {
            let genreEntity = await Genre.findBy('name', genre)
            await manga.genres().attach([genreEntity.id])
          }
        })
      return manga
    }
  }
}

module.exports = MangaService
