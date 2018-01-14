'use strict'

const Model = use('Model')

class MangaChapterPage extends Model {
    static get table () {
        return 'manga_chapter_pages'
    }
}

module.exports = MangaChapterPage
