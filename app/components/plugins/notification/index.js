const Notification = require('./notification')

Notification.install = (Vue, options) => {
  Vue.prototype.$notification = new (Vue.extend(Notification))({propsData: options})
  // if (process.env.NODE_ENV === 'development') window.$toaster = Vue.prototype.$toaster
}
module.exports = Notification
