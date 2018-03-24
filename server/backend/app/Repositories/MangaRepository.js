'use strict'

const Logger = use('Logger')
const Manga = use('App/Models/Manga')
const Website = use('App/Models/MangaWebsite')

class MangaRepository {
  async findByDomainOrFail (path, domain) {
    const website = await Website.findOrFail({'name': domain})
    let result = await Manga
      .query()
      .where('path', path)
      .where('manga_website_id', website.id)
      .first()
    if (!result) {
      throw new Error('Not Found')
    } else {
      return result
    }
  }
}

module.exports = MangaRepository
