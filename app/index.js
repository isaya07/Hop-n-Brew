// import isElectron from 'is-electron-renderer'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'

import Config from 'api/recettes/Config'
import { firebase, DB } from 'api/firebase'

import Notif from 'components/plugins/notification'

import VueCordova from 'vue-cordova'

/* Pick one way between the 2 following ways */

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/search'

// or import all icons if you don't care about bundle size
// import 'vue-awesome/icons'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)

// Vue.config.productionTip = false

Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})

if (window.location.protocol === 'file://' || window.location.port === '8000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

// import MyProgress from 'components/plugins/MyProgress'

/* import PouchDB from 'pouchdb-browser'
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-live-find'))
// PouchDB.plugin(require('pouchdb-authentication'))
// PouchDB.debug.disable('*')
if (process.env.NODE_ENV !== 'production') {
  window.PouchDB = PouchDB
}
// PouchDB.debug.disable('*')

Vue.use(require('vue-pouch'), {
  pouch: PouchDB/* ,    // optional if `PouchDB` is available on the global object
  defaultDB:         // the database to use if none is specified in the pouch setting of the vue component
}) */

Vue.use(VeeValidate)
Vue.use(Notif, {timeout: 5000})

Vue.filter('capitalize', str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1'))

VeeValidate.Validator.extend('myAlpha', {
  getMessage: field => 'The ' + field + ' value is not alpha.',
  // validate: value => /^[\w\d\s\-\(\)\,\:\.\%]+$/.test(value)
  // eslint-disable-next-line
  validate: value => {
    let test = /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ:()_'.",%/\-\s]*$/i.test(value)
    console.log(test)
    return test
  }
})

VeeValidate.Validator.extend('myNumeric', {
  getMessage: field => 'The ' + field + ' value is not numeric.',
  // eslint-disable-next-line
  validate: value => /\d*([.,\/]?\d+)/.test(value)
})

Vue.config.performance = true
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

Vue.config.debug = true

const db = new DB()
Object.defineProperties(Vue.prototype, {
  $db: {
    get: function () {
      return db
    }
  }
})

Object.defineProperties(Vue.prototype, {
  $auth: {
    get: function () {
      return firebase.auth()
    }
  }
})

Object.defineProperties(Vue.prototype, {
  $firestore: {
    get: function () {
      return firebase.firestore()
    }
  }
})

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

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

// Wrap the vue instance in a Firebase onAuthStateChanged method
// This stops the execution of the navigation guard 'beforeEach'
// method until the Firebase initialization ends
firebase.auth().onAuthStateChanged(function (user) {
  if (window.location.port !== '8000') {
    new Vue({
      router,
      ...App
    }).$mount('#app')
  } else {
    // listen to Cordova event
    Vue.cordova.on('deviceready', () => {
      new Vue({
        router,
        ...App
      }).$mount('#app')
    })
  }
})
