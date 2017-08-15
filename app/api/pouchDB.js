import PouchDB from 'pouchdb-browser'
// PouchDB.plugin(require('pouchdb-find'))
// PouchDB.plugin(require('pouchdb-live-find'))
// PouchDB.plugin(require('pouchdb-authentication'))
// PouchDB.debug.disable('*')
if (process.env.NODE_ENV !== 'production') {
  window.PouchDB = PouchDB
}

export default class DB {
  constructor (options) {
    this.getOptions = {
      include_docs: true
    }
    this.putOptions = {
      force: false
    }
    this.removeOptions = {
      force: false
    }
    this.syncOptions = {
      live: false,
      retry: false
    }
    if (options) {
      Object.assign(this, options)
    }
  }

  gets (database) {
    let db = new PouchDB(database)
    return new Promise((resolve, reject) => {
      db.allDocs(this.getOptions).then(response => {
        let data = []
        for (let i = 0; i < response.total_rows; i++) {
          data.push(response.rows[i].doc)
        }
        resolve(data)
      }).catch(err => reject(err))
    })
  }

  put (database, doc) {
    // console.log('DB', 'PUT', database, doc)
    let db = new PouchDB(database)
    return new Promise((resolve, reject) => {
      db.put(doc, this.putOptions).then(response => {
        resolve(response)
      }).catch(err => reject(err))
    })
  }

  remove (database, doc) {
    let db = new PouchDB(database)
    return new Promise((resolve, reject) => {
      db.remove(doc, this.removeOptions).then(response => {
        resolve(response)
      }).catch(err => reject(err))
    })
  }

  sync (local, remote) {
    let db = new PouchDB(local)
    return new Promise((resolve, reject) => {
      db.replicate.to(remote).then(response => {
        resolve(response)
      }).catch(err => reject(err))
    })
  }
}
