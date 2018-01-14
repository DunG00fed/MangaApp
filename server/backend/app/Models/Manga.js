'use strict'

const Model = use('Model')

class Manga extends Model {
    static get table () {
        return 'manga'
    }
}

module.exports = Manga
