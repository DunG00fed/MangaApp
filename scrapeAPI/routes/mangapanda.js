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
 * Return a list of image urls of a single manga chapter.
 * @method
 * @param  {Http (https) Request Object} req
 * @param  {Http (https) Request Object} res
 * @return {JSON}
 */
router.get('/:manga/:chapter', function(req, res) {
  var manga = req.params.manga;
  var chapter = req.params.chapter;
  var chapter_url = MANGA_PANDA_URL + manga + '/' + chapter;

  console.log("fetching Pages");

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
