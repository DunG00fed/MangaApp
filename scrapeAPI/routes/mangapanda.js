//Dependencies
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio');

var router = express.Router();

const MANGA_PANDA_URL = 'http://www.mangapanda.com/';

/////////////////
//   Routes    //
/////////////////

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

   request(MANGA_PANDA_URL + manga, function(err, resp, html) {

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
  var chapter_url = MANGA_PANDA_URL + manga + '/' + chapter_num;

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
