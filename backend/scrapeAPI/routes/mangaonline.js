// Dependencies
const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const router = express.Router()

const MANGA_ONLINE_URL = 'https://mangaonline.fun/'

// ///////////////
//   Routes    //
// ///////////////

/**
 * Return manga details.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/:manga', function (req, res) {
  let manga = req.params.manga

  console.log('fetching Details')

  request(MANGA_ONLINE_URL + manga, function (err, resp, html) {
    if (!err && resp.statusCode === 200) {
      let $ = cheerio.load(html)

      let mangaInfo = {}

      mangaInfo.img = $('img.cvr').attr('src')
      mangaInfo.title = $('h1.ttl').text()
      mangaInfo.chapters = $('ul.chp_lst').find('li').length

      console.log(mangaInfo)

      res.send(JSON.stringify(mangaInfo))
    } else {
      console.log(err)
    }
  })
})

/**
 * Return a list of image urls of a single manga chapter.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/:manga/:chapter', function (req, res) {
  let manga = req.params.manga
  let chapterNum = req.params.chapter
  let chapterUrl = MANGA_ONLINE_URL + manga + '/' + chapterNum

  console.log('fetching Pages')

  getChapter(chapterUrl, chapterNum).then(function (pages) {
    let chapter = {
      chapter: chapterNum,
      pages: pages
    }
    console.log(chapter)
    res.send(JSON.stringify(chapter))
  }).catch(function (err) {
    console.log(err)
  })
})

/**
 * Retrieve manga chapter image urls.
 * @method
 * @param  {string} chapterUrl
 * @param  {integer} chapterNum
 * @return {promise}
 */
function getChapter (chapterUrl, chapterNum) {
  return new Promise(function (resolve, reject) {
    request(chapterUrl, function (err, resp, html) {
      if (!err && resp.statusCode === 200) {
        let $ = cheerio.load(html)
        let pageNum = $('.cbo_wpm_pag').find('option').length

        let pages = []
        let promises = []
        let count

        for (count = 1; count <= pageNum; count++) {
          promises.push(getImage(chapterUrl + '/' + count))
        }

        Promise.all(promises).then(function (imgUrls) {
          for (count = 0; count < imgUrls.length; count++) {
            pages.push({
              page: count + 1,
              url: imgUrls[count]
            })
          }
          // console.log(pages);
          resolve(pages)
        }).catch(function (err) {
          reject(err)
        })
      }
    })
  })
}

/**
 * Retrieve manga page image url.
 * @method
 * @param  {string} uri
 * @return {Promise}
 */
function getImage (uri) {
  return new Promise(function (resolve, reject) {
    request(uri, function (err, res, html) {
      if (!err && res.statusCode === 200) {
        let $ = cheerio.load(html)
        $('img', '.mng_rdr').each(function () {
          resolve($(this).attr('src'))
        })
      } else {
        reject(err)
      }
    })
  })
}

// Return router
module.exports = router
