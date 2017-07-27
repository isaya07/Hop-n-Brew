import MyProgress from './MyProgress'

// export function install (Vue, options = {}) {
  // let myProgress = new (Vue.extend(MyProgress))({propsData: options})
  // Vue.component(MyProgress.name, MyProgress)
  /* Object.defineProperty(Vue.prototype, '$myProgress', {
    get: function get () {
      return MyProgress
    }
  }) */
  // Vue.prototype.$myProgress = new (Vue.extend(MyProgress))({propsData: options})
  // if (process.env.NODE_ENV === 'development') window.$toaster = Vue.prototype.$toaster
// }

/* export {
  MyProgress
} */

const Plugin = {
  install (Vue, options = {}) {
    if (this.installed) return
    this.installed = true

    Vue.component(MyProgress.name, MyProgress)

    let myProgress = new (Vue.extend(MyProgress))({propsData: options})
    // let myProgress = Vue.component(MyProgress.name, MyProgress)
    /* Vue.prototype.$myProgress = {
      start (time) {
        console.log(myProgress)
        myProgress.start(time)
      },
      stop () {
        myProgress.stop()
      },
      pause () {
        myProgress.pause()
      }
    } */

    Object.defineProperty(Vue.prototype, '$myProgress', {
      get: function get () {
        return myProgress
      }
    })
  }
}

export default Plugin
