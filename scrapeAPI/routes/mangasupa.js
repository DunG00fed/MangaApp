//Dependencies
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio');

var router = express.Router();

const MANGA_SUPA_URL = 'http://mangasupa.com/';

/////////////////
//   Routes    //
/////////////////

/**
 * Return list of manga details from popular page.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/popular', function(req, res) {
  var page_num = req.query.page ? req.query.page: 1;

  console.log("fetching Manga");

  request(MANGA_READER_URL + '/popular/' + page_num, function(err, resp, html) {
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
 * Return manga details from search.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/search', function(req, res) {
  var genre = req.query.genre;
  var next_manga = req.query.next;

  console.log(MANGA_READER_URL + '/search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + next_manga);

  request(MANGA_READER_URL + '/search/?w=&rd=0&status=0&order=2&genre=' + genre + '&p=' + next_manga,
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
 * Return single manga details.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/details', function(req, res) {
  var manga_url = req.query.url;

  console.log("fetching Details");

  request(MANGA_READER_URL + manga_url, function(err, resp, html) {

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
router.get('/read', function(req, res) {
  var url = req.query.url;

  console.log("fetching Pages");

  request(MANGA_READER_URL + url, function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);
      var page_num = $('#pageMenu').find('option').length;

      var pages = [];
      var promises = [];
      var count;

      for (count = 1; count <= page_num; count++) {
        promises.push(getImage(MANGA_READER_URL + url + '/' + count));
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
