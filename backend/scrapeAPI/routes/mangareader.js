// Dependencies
const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const router = express.Router()

const MANGA_READER_URL = 'http://www.mangareader.net/'

// ///////////////
//   Routes    //
// ///////////////

/**
 * Return list of manga from popular page.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/popular', (req, res) => {
  let pageNum = req.query.page ? req.query.page : 1

  console.log('fetching Manga')

  request(MANGA_READER_URL + 'popular/' + pageNum, (err, resp, html) => {
    if (!err && resp.statusCode === 200) {
      var $ = cheerio.load(html)
      var mangaList = []

      $('div.mangaresultinner', '#mangaresults').each(() => {
        mangaList.push({
          title: $(this).find('.manga_name').find('a').text(),
          url: $(this).find('.manga_name').find('a').attr('href'),
          img: $(this).find('.imgsearchresults').attr('style').replace("background-image:url('", '').replace("')", ''),
          genre: $(this).find('.manga_genre').text()
        })
      })
      console.log(mangaList[0])
      res.send(JSON.stringify(mangaList))
    } else {
      console.log(err)
    }
  })
})

/**
 * Return list of manga from advanced search.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/search', (req, res) => {
  var genre = req.query.genre
  var nextManga = req.query.next

  console.log(MANGA_READER_URL + 'search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + nextManga)

  request(MANGA_READER_URL + 'search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + nextManga,
    (err, resp, html) => {
      if (!err && resp.statusCode === 200) {
        var $ = cheerio.load(html)
        var mangaList = []
        $('div.mangaresultinner', '#mangaresults').each(() => {
          mangaList.push({
            title: $(this).find('.manga_name').find('a').text(),
            url: $(this).find('.manga_name').find('a').attr('href'),
            img: $(this).find('.imgsearchresults').attr('style').replace("background-image:url('", '').replace("')", ''),
            genre: $(this).find('.manga_genre').text()
          })
        })
        console.log(mangaList[0])
        res.send(JSON.stringify(mangaList))
      } else {
        console.log(err)
      }
    })
})

/**
 * Return manga details.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/:manga', (req, res) => {
  let manga = req.params.manga

  console.log('fetching Details')

  request(MANGA_READER_URL + manga, (err, resp, html) => {
    if (!err && resp.statusCode === 200) {
      var $ = cheerio.load(html)

      let mangaInfo = {}
      let genreList = []

      mangaInfo.img = ($('#mangaimg').children('img').attr('src'))
      mangaInfo.title = $('.aname', 'div#mangaproperties').text()
      mangaInfo.summary = $('#readmangasum').children('p').text()
      mangaInfo.chapters = $('#listing').children('tbody').find('tr').length

      $('.genretags').each((index, element) => {
        genreList.push($(element).text())
      })

      mangaInfo.genre = genreList
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
router.get('/:manga/:chapter', (req, res) => {
  let manga = req.params.manga
  let chapterNum = req.params.chapter
  let chapterUrl = MANGA_READER_URL + manga + '/' + chapterNum

  console.log('fetching Pages')

  getChapter(chapterUrl, chapterNum).then((pages) => {
    let chapter = {
      chapter: chapterNum,
      pages: pages
    }
    console.log(chapter)
    res.send(JSON.stringify(chapter))
  }).catch((err) => {
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
  return new Promise((resolve, reject) => {
    request(chapterUrl, (err, resp, html) => {
      if (!err && resp.statusCode === 200) {
        let $ = cheerio.load(html)
        let pageNum = $('#pageMenu').find('option').length

        let pages = []
        let promises = []
        let count

        for (count = 1; count <= pageNum; count++) {
          promises.push(getImage(chapterUrl + '/' + count))
        }

        Promise.all(promises).then((imgUrls) => {
          for (count = 0; count < imgUrls.length; count++) {
            pages.push({
              page: count + 1,
              url: imgUrls[count]
            })
          }
          // console.log(pages);
          resolve(pages)
        }).catch((err) => {
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
  return new Promise((resolve, reject) => {
    request(uri, (err, res, html) => {
      if (!err && res.statusCode === 200) {
        var $ = cheerio.load(html)
        $('#img', '#imgholder').each(() => {
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
