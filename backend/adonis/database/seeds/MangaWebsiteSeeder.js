'use strict'

/*
|--------------------------------------------------------------------------
| MangaWebsiteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const MangaWebsite = use('App/Models/MangaWebsite')

class MangaWebsiteSeeder {
  async run () {
    await MangaWebsite.create({
      domain_name: 'mangareader.net',
      name: 'mangareader'
    })
    await MangaWebsite.create({
      domain_name: 'mangapanda.com',
      name: 'mangapanda'
    })
    await MangaWebsite.create({
      domain_name: 'mangaonline.today',
      name: 'mangaonline'
    })
  }
}

module.exports = MangaWebsiteSeeder
