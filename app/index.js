// import isElectron from 'is-electron-renderer'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import router from './router'

import Config from 'api/recettes/Config'
import DB from 'api/pouchDB'

import MyNotification from 'components/plugins/notification'
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
Vue.use(MyNotification, {timeout: 5000})

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

new Vue({
  router,
  ...App
}).$mount('#app')
