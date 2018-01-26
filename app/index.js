// import isElectron from 'is-electron-renderer'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'
// import VueFirestore from 'components/plugins/vue-firestore'
import Config from 'api/recettes/Config'
import store from './store'
import FontAwesomeIcon from './fontawesome'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import VueFire from 'components/plugins/vuefire'
// Style
import './assets/scss/main.scss'

Vue.use(VueFire)

let fireConfig = {
  apiKey: 'AIzaSyCZGuCrxMas0dWC2LXm9mrj7vIKAHYyf6M',
  authDomain: 'hop-n-brew.firebaseapp.com',
  databaseURL: 'https://hop-n-brew.firebaseio.com',
  projectId: 'hop-n-brew',
  storageBucket: 'hop-n-brew.appspot.com',
  messagingSenderId: '716052929936'
}

firebase.initializeApp(fireConfig)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
  // console.log('Persistance OK')
}).catch(error => {
  console.log(error.code + ' : ' + error.message)
})
firebase.firestore().enablePersistence().then(() => {
  // Initialize Cloud Firestore through firebase
  firebase.firestore()
}).catch(err => {
  if (err.code === 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time')
  } else if (err.code === 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence')
  }
})

Vue.component('icon', FontAwesomeIcon) // Use the icon component anywhere in the app

// Vue.use(VueFirestore)

Vue.use(VeeValidate)
// Vue.use(Notif, {timeout: 5000})

Vue.filter('capitalize', str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1'))

VeeValidate.Validator.extend('myAlpha', {
  getMessage: field => 'The ' + field + ' value is not alpha.',
  // validate: value => /^[\w\d\s\-\(\)\,\:\.\%]+$/.test(value)
  // eslint-disable-next-line
  validate: value => {
    let test = /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ:()_'.",%/\-\s]*$/i.test(value)
    // console.log(test)
    return test
  }
})

VeeValidate.Validator.extend('myNumeric', {
  getMessage: field => 'The ' + field + ' value is not numeric.',
  // eslint-disable-next-line
  validate: value => /\d*([.,\/]?\d+)/.test(value)
})

Vue.config.warnHandler = function (msg, vm, trace) {
  console.log(msg)
  console.log(vm)
  console.log(trace)
}
Vue.config.errorHandler = (err, vm, info) => {
  console.error(err)
  console.log(vm)
  console.info(info)
}

Vue.config.performance = true
Vue.config.productionTip = false
Vue.config.debug = true

Object.defineProperties(Vue.prototype, {
  $auth: {
    get: function () {
      return firebase.auth()
    }
  }
})

Object.defineProperties(Vue.prototype, {
  $db: {
    get: function () {
      return firebase.firestore()
    }
  }
})

/* Object.defineProperties(Vue.prototype, {
  $firestore: {
    get: function () {
      return firebase.firestore()
    }
  }
}) */

const config = new Config()
Object.defineProperties(Vue.prototype, {
  $config: {
    get: function () {
      return config
    }
  }
})

// global bus event system
const eventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return eventBus
    }
  }
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    let olduser = store.getters.user
    if (!olduser || !olduser.email || olduser.email !== user.email) store.dispatch('autoSignIn', user)
  }
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')
