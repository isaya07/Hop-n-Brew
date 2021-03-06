import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let config = {
  apiKey: 'AIzaSyCZGuCrxMas0dWC2LXm9mrj7vIKAHYyf6M',
  authDomain: 'hop-n-brew.firebaseapp.com',
  databaseURL: 'https://hop-n-brew.firebaseio.com',
  projectId: 'hop-n-brew',
  storageBucket: 'hop-n-brew.appspot.com',
  messagingSenderId: '716052929936'
}

firebase.initializeApp(config)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
  // console.log('Persistance OK')
}).catch(error => {
  console.log(error.code + ' : ' + error.message)
})

class DB {
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
      retry: true
    }
    this.online = false

    if (options) {
      Object.assign(this, options)
    }
    firebase.firestore().enablePersistence().then(() => {
      // Initialize Cloud Firestore through firebase
      this.db = firebase.firestore()
    }).catch(err => {
      if (err.code === 'failed-precondition') {
        console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time')
      } else if (err.code === 'unimplemented') {
        console.log('The current browser does not support all of the features required to enable persistence')
      }
    })
  }

  get (database, docId) {
    return new Promise((resolve, reject) => {
      this.db.collection(database).where('_id', '==', docId).get().then(querySnapshot => {
        console.log(querySnapshot)
        if (!querySnapshot.empty) resolve(querySnapshot.docs[0].data())
      }).catch(error => {
        console.error('Error getting documents: ', error)
        reject(error)
      })
    })
  }

  gets (database) {
    console.log(database)
    return new Promise((resolve, reject) => {
      let col = this.db.collection(database)
      console.log(database)
      col.get().then(querySnapshot => {
        let data = []
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
        resolve(data)
      }).catch(error => {
        console.error('Error getting documents: ', error)
        reject(error)
      })
    })
  }

  put (database, doc) {
    return new Promise((resolve, reject) => {
      this.db.collection(database).add(doc).then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        resolve(docRef)
      }).catch(error => {
        console.error('Error adding document: ', error)
        reject(error)
      })
    })
  }

  remove (database, doc) {
    return new Promise((resolve, reject) => {
      this.db.collection(database).doc(doc).delete().then(querySnapshot => {
        resolve(querySnapshot)
      }).catch(error => {
        console.error('Error removing  documents: ', error)
        reject(error)
      })
    })
  }
}

export { firebase, DB }
