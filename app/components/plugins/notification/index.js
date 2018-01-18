/* const Notification = require('./notification')

Notification.install = (Vue, options) => {
  Vue.prototype.$notification = new (Vue.extend(Notification))({propsData: options})
  // if (process.env.NODE_ENV === 'development') window.$toaster = Vue.prototype.$toaster
}
module.exports = Notification */
import VueNotify  from './notification.vue'
import Vue from 'vue'

export const events = new Vue()

const plugin = {
  install (Vue, params = {}) {
    if (this.installed) {
      return
    }

    this.installed = true

    // Vue.extend(VueNotify)
    Vue.component('notification', VueNotify)

    Vue.prototype.$notification = new (Vue.extend(VueNotify))({propsData: params})
  }
}

export default plugin
