'use strict'

/*
|--------------------------------------------------------------------------
| GenreSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Genre = use('App/Models/Genre')

class GenreSeeder {
  async run () {
    await Genre.create({
      name: 'Action'
    })
    await Genre.create({
      name: 'Adventure'
    })
    await Genre.create({
      name: 'Comedy'
    })
    await Genre.create({
      name: 'Demons'
    })
    await Genre.create({
      name: 'Drama'
    })
    await Genre.create({
      name: 'Ecchi'
    })
    await Genre.create({
      name: 'Fantasy'
    })
    await Genre.create({
      name: 'Gender Bender'
    })
    await Genre.create({
      name: 'Harem'
    })
    await Genre.create({
      name: 'Historical'
    })
    await Genre.create({
      name: 'Horror'
    })
    await Genre.create({
      name: 'Josei'
    })
    await Genre.create({
      name: 'Magic'
    })
    await Genre.create({
      name: 'Martial Arts'
    })
    await Genre.create({
      name: 'Mature'
    })
    await Genre.create({
      name: 'Mecha'
    })
    await Genre.create({
      name: 'Military'
    })
    await Genre.create({
      name: 'Mystery'
    })
    await Genre.create({
      name: 'One Shot'
    })
    await Genre.create({
      name: 'Psychological'
    })
    await Genre.create({
      name: 'Romance'
    })
    await Genre.create({
      name: 'School Life'
    })
    await Genre.create({
      name: 'Sci-Fi'
    })
    await Genre.create({
      name: 'Seinen'
    })
    await Genre.create({
      name: 'Shoujo'
    })
    await Genre.create({
      name: 'Shoujoai'
    })
    await Genre.create({
      name: 'Shounen'
    })
    await Genre.create({
      name: 'Shounenai'
    })
    await Genre.create({
      name: 'Slice of Life'
    })
    await Genre.create({
      name: 'Smut'
    })
    await Genre.create({
      name: 'Sports'
    })
    await Genre.create({
      name: 'Super Power'
    })
    await Genre.create({
      name: 'Supernatural'
    })
    await Genre.create({
      name: 'Tragedy'
    })
    await Genre.create({
      name: 'Vampire'
    })
    await Genre.create({
      name: 'Yaoi'
    })
    await Genre.create({
      name: 'Yuri'
    })
  }
}

module.exports = GenreSeeder
