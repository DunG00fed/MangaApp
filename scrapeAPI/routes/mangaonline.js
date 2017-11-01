//Dependencies
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio');

var router = express.Router();

const MANGA_ONLINE_URL = 'http://www5.mangaonline.today/';

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

  request(MANGA_ONLINE_URL + manga, function(err, resp, html) {

    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);

      var manga_info = {};
      var genre_list = [];
      var chapter_list = [];

      manga_info.img = ($('#mangaimg').children('img').attr('src'));
      manga_info.title = $('.aname', 'div#mangaproperties').text();
      manga_info.summary = $('#readmangasum').children('p').text();

      $('.genretags').each(function() {
        genre_list.push($(this).text());
      });

      manga_info.genre = genre_list;

      $('div.chico_manga', '#chapterlist').each(function() {
        var chapter;
        chapter = {
          number: parseFloat($(this).next().text().replace(manga_info.title, '')),
          title: $(this).parent().text().replace('\n\n' + $(this).next().text() + ' : ', ''),
          url: $(this).next().attr('href'),
          date: $(this).parent().next().text()
        };
        chapter_list.push(chapter);
      });

      manga_info.chapter_list = chapter_list;
      manga_info.chapter_length = chapter_list.length;

      console.log(manga_info);

      res.send(JSON.stringify(manga_info));
    }
    else {
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
  var chapter = req.params.chapter;
  var chapter_url = MANGA_ONLINE_URL + manga + '/' + chapter;

  console.log("fetching Pages");

  request(chapter_url, function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);
      var page_num = $('.cbo_wpm_pag').find('option').length;

      var pages = [];
      var promises = [];
      var count;

      for (count = 1; count <= page_num; count++) {
        promises.push(getImage(chapter_url + '/' + count));
      }

      Promise.all(promises).then(function(values) {
        count = 0;
        values.forEach(function() {
          var new_page = {
            url: values[count]
          };
          pages[count++] = new_page;
        });
        console.log(pages);
        res.send(JSON.stringify(pages));
      }).catch(function(err) {
        console.log(err);
      });
    }
  });
});

/**
 * Retrieve manga chapter image url.
 * @method
 * @param  {string} uri
 * @return {Promise}
 */
function getImage(uri) {
  return new Promise(function(resolve, reject) {
    request(uri, function(err, res, html) {
      if (!err && res.statusCode == 200) {
        var $ = cheerio.load(html);
        $('img', '.mng_rdr').each(function() {
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
