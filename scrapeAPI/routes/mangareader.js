//Dependencies
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio');

var router = express.Router();

const MANGA_READER_URL = 'http://www.mangareader.net/';

/////////////////
//   Routes    //
/////////////////

/**
 * Return list of manga from popular page.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/popular', function(req, res) {
  var page_num = req.query.page ? req.query.page: 1;

  console.log("fetching Manga");

  request(MANGA_READER_URL + 'popular/' + page_num, function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);
      var manga_list = [];

      $('div.mangaresultinner', '#mangaresults').each(function() {
        manga_list.push({
          title: $(this).find('.manga_name').find('a').text(),
          url: $(this).find('.manga_name').find('a').attr('href'),
          img: $(this).find('.imgsearchresults').attr('style').replace("background-image:url('", '').replace("')", ''),
          genre: $(this).find('.manga_genre').text()
        });
      });
      console.log(manga_list[0]);
      res.send(JSON.stringify(manga_list));
    }
    else {
      console.log(err);
    }
  });
});

/**
 * Return list of manga from advanced search.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/search', function(req, res) {
  var genre = req.query.genre;
  var next_manga = req.query.next;

  console.log(MANGA_READER_URL + 'search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + next_manga);

  request(MANGA_READER_URL + 'search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + next_manga,
    function(err, resp, html) {
      if (!err && resp.statusCode == 200) {
        var $ = cheerio.load(html);
        var manga_list = [];
        $('div.mangaresultinner', '#mangaresults').each(function() {
          manga_list.push({
            title: $(this).find('.manga_name').find('a').text(),
            url: $(this).find('.manga_name').find('a').attr('href'),
            img: $(this).find('.imgsearchresults').attr('style').replace("background-image:url('", '').replace("')", ''),
            genre: $(this).find('.manga_genre').text()
          });
        });
        console.log(manga_list[0]);
        res.send(JSON.stringify(manga_list));
      }
      else {
        console.log(err);
      }
    });
});

/**
 * Return manga details.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
 router.get('/:manga', function(req, res) {
   var manga = req.params.manga;

   console.log("fetching Details");

   request(MANGA_READER_URL + manga, function(err, resp, html) {

     if (!err && resp.statusCode == 200) {
       var $ = cheerio.load(html);

       var manga_info = {};
       var genre_list = [];

       manga_info.img = ($('#mangaimg').children('img').attr('src'));
       manga_info.title = $('.aname', 'div#mangaproperties').text();
       manga_info.summary = $('#readmangasum').children('p').text();
       manga_info.chapters = $('#listing').children('tbody').find('tr').length;

       $('.genretags').each(function() {
         genre_list.push($(this).text());
       });

       manga_info.genre = genre_list;
       console.log(manga_info);

       res.send(JSON.stringify(manga_info));
     } else {
       console.log(err);
     }
   });
 });

/**
 * Return a list of image urls of a single manga chapter.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/:manga/:chapter', function(req, res) {
  var manga = req.params.manga;
  var chapter_num = req.params.chapter;
  var chapter_url = MANGA_READER_URL + manga + '/' + chapter_num;

  console.log("fetching Pages");

  getChapter(chapter_url, chapter_num).then(function(pages) {
    var chapter = {
        chapter: chapter_num,
        pages: pages
    };
    console.log(chapter);
    res.send(JSON.stringify(chapter));
  }).catch(function(err) {
    console.log(err);
  });
});


/**
 * Retrieve manga chapter image urls.
 * @method
 * @param  {string} chapter_url
 * @param  {integer} chapter_num
 * @return {promise}
 */
function getChapter(chapter_url, chapter_num) {
  return new Promise(function(resolve, reject) {
    request(chapter_url, function(err, resp, html) {
      if (!err && resp.statusCode == 200) {
        var $ = cheerio.load(html);
        var page_num = $('#pageMenu').find('option').length;

        var pages = [];
        var promises = [];
        var count;

        for (count = 1; count <= page_num; count++) {
          promises.push(getImage(chapter_url + '/' + count));
        }

        Promise.all(promises).then(function(img_urls) {
          for(count = 0; count < img_urls.length; count++){
            pages.push( {
              page: count + 1,
              url: img_urls[count]
            });
          }
          // console.log(pages);
          resolve(pages);
        }).catch(function(err) {
          reject(err);
        });
      }
    });
  });
}

/**
 * Retrieve manga page image url.
 * @method
 * @param  {string} uri
 * @return {Promise}
 */
function getImage(uri) {
  return new Promise(function(resolve, reject) {
    request(uri, function(err, res, html) {
      if (!err && res.statusCode == 200) {
        var $ = cheerio.load(html);
        $('#img', '#imgholder').each(function() {
          resolve($(this).attr('src'));
        });
      } else {
        reject(err);
      }
    });
  });
}

//Return router
module.exports = router;
