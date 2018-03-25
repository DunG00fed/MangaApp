'use strict'

const Env = use('Env')

module.exports = {
  URL: Env.get('MANGA_SCRAPER_URL', 'http://127.0.0.1:3000/api')
}
