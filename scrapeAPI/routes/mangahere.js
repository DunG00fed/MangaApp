//Dependencies
var express = require('express'),
  request = require('request'),
  cheerio = require('cheerio');

var router = express.Router();

const MANGA_HERE_URL = 'http://www.mangahere.co';

/////////////////
//   Routes    //
/////////////////

/**
 * Return manga details from popular page.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/popular', function(req, res) {
  var page_num = req.params.page;

  console.log("fetching Manga");

  request(MANGA_HERE_URL + '/directory/' + page_num + '.htm', function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);
      var manga_list = [];

      $('li', '.directory_list').each(function() {
        manga_list.push({
          title: $(this).find('.title').children('a').attr('title'),
          url: $(this).find('.title').children('a').attr('href'),
          img: $(this).find('img').attr('src'),
          genre: $(this).find('.title').next().next().text()
        });
      });
      res.send(JSON.stringify(manga_list));
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
  var genre = req.params.genre;
  var next_manga = req.params.next;

});

/**
 * Return single manga details.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/details', function(req, res) {
  var manga_url = req.params.url;
  console.log(manga_url);

  request(manga_url, function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);

      var manga_info = {};
      var genre_list = [];
      var chapter_list = [];

      manga_info.img = ($('.manga_detail_top').children('img').attr('src'));
      manga_info.title = $('h2').text().replace(' Manga', '');
      manga_info.summary = $('p#show').text().replace('Show less', '');

      manga_info.genre = $('li.posR').next().next().text().replace('Genre(s):', '');

      $('li', '.detail_list').each(function() {
        var chapter;
        chapter = {
          number: parseFloat($(this).find('a').text().replace(manga_info.title, '').replace('\n', '')),
          // title: $(this).find('span.left').text(),
          url: $(this).find('a').attr('href'),
          date: $(this).find('span.right').text()
        };
        chapter_list.push(chapter);
      });

      manga_info.chapter_list = chapter_list;
      manga_info.chapter_length = chapter_list.length;

      console.log(manga_info);

      res.send(JSON.stringify(manga_info));
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
  var chapter_url = req.params.url;

  console.log("fetching Pages");

  console.log(chapter_url);

  request(chapter_url + '1.html', function(err, resp, html) {
    if (!err && resp.statusCode == 200) {
      var $ = cheerio.load(html);
      var page_num = $('.readpage_top').find('select.wid60').children('option').length;

      var pages = [];
      var promises = [];
      var count;

      for (count = 1; count <= page_num; count++) {
        promises.push(getImage(chapter_url + count + '.html'));
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
 * Retrieve managa chapter image url.
 * @method
 * @param  {string} uri
 * @return {Promise}
 */
function getImage(uri) {
  return new Promise(function(resolve, reject) {
    request(uri, function(err, res, html) {
      if (!err && res.statusCode == 200) {
        var $ = cheerio.load(html);
        resolve($('section#viewer').children('a').children('img').attr('src'));
      } else {
        reject(err);
      }
    });
  });
}

//Return router
module.exports = router;
