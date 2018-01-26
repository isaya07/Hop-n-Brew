// Vue binding
let Vue

/**
 * Check if a record is an object.
 *
 * @param {*} val
 * @return {boolean}
 */
function isObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

/**
* Normalize Firebase snapshot into a bindable data record.
*
* @param {FirebaseSnapshot} snapshot
* @return {object}
*/
function normalize (snapshot) {
  var value = snapshot.doc ? snapshot.doc.data() : snapshot.data()
  var out = isObject(value) ? value : { '.value': value }
  out['.key'] = snapshot.doc ? snapshot.doc.id : snapshot.id
  return out
}

/**
* Ensure firebasestore option on a vue instance.
*
* @param {Vue} vm
*/
function ensureRefs (vm) {
  if (!vm.$firestore) {
    vm.$firestore = Object.create(null)
  }
}

/**
 * Define a reactive property to a given Vue instance.
 *
 * @param {Vue} vm
 * @param {string} key
 * @param {*} val
 */
function defineReactive (vm, key, val) {
  if (key in vm) {
    vm[key] = val
  } else {
    Vue.util.defineReactive(vm, key, val)
  }
}

/**
 * Bind firestore collection source to a key on a Vue instance.
 *
 * @param {Vue} vm
 * @param {string} key
 * @param {object} source
 */
function collections ({ vm, key, source, resolve, reject }) {
  vm.$firestore[key] = source
  let container = []
  defineReactive(vm, key, container)
  source.onSnapshot((doc) => {
    doc.docChanges.forEach(snapshot => {
      switch (snapshot.type) {
        case 'added':
          container.splice(snapshot.newIndex, 0, normalize(snapshot))
          break
        case 'removed':
          container.splice(snapshot.oldIndex, 1)
          break
        case 'modified':
          if (snapshot.oldIndex !== snapshot.newIndex) {
            container.splice(snapshot.oldIndex, 1)
            container.splice(snapshot.newIndex, 0, normalize(snapshot))
          } else {
            container.splice(snapshot.newIndex, 1, normalize(snapshot))
          }
          break
      }
      resolve(container)
    }, reject)
  })
}

/**
 * Bind firestore doc source to a key on a Vue instance.
 *
 * @param {Vue} vm
 * @param {string} key
 * @param {object} source
 */
function documents ({ vm, key, source, resolve, reject }) {
  vm.$firestore[key] = source
  let container = []
  defineReactive(vm, key, container)
  source.onSnapshot((doc) => {
    if (doc.exists) {
      container = normalize(doc)
      vm[key] = container
      resolve(vm[key])
    } else {
      delete vm.$firestore[key]
      reject('Doc is not exist')
    }
  })
}

/**
 * Listen for changes, and bind firestore doc source to a key on a Vue instance.
 *
 * @param {Vue} vm
 * @param {string} key
 * @param {object} source
 */
function bind (vm, key, source) {
  return new Promise((resolve, reject) => {
    if (source.where) {
      collections({ vm, key, source, resolve, reject })
    } else {
      documents({ vm, key, source, resolve, reject })
    }
  })
}

let init = function () {
  var bindings = this.$options.firestore
  if (typeof bindings === 'function') bindings = bindings.call(this)
  if (!bindings) return
  ensureRefs(this)
  for (var key in bindings) {
    bind(this, key, bindings[key])
  }
}

/**
 * Vue Mixin
 */
let Mixin = {
  created: init
}

/**
 * Install function.
 *
 * @param {Vue} _Vue
 */
let install = function (_Vue) {
  Vue = _Vue
  Vue.mixin(Mixin)
  var mergeStrats = Vue.config.optionMergeStrategies
  mergeStrats.fireStore = mergeStrats.provide

  // Manually binding
  Vue.prototype.$binding = function (key, source) {
    ensureRefs(this)
    return bind(this, key, source)
  }
}

// Install automatically (browser).
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
