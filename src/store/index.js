import Vue from 'vue'
import Vuex from 'vuex'
// import { firebaseMutations } from 'vuexfire'
import createLogger from 'vuex/dist/logger'
// import { state, mutations } from './mutations'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

const logger = createLogger({
  collapsed: true, // auto-expand logged mutations
  filter (mutation, stateBefore, stateAfter) {
    // returns `true` if a mutation should be logged
    // `mutation` is a `{ type, payload }`
    return mutation.type !== 'aBlacklistedMutation'
  },
  transformer (state) {
    // transform the state before logging it.
    // for example return only a specific sub-tree
    return state // state.subTree
  },
  mutationTransformer (mutation) {
    // mutations are logged in the format of `{ type, payload }`
    // we can format it any way we want.
    return mutation.type
  },
  logger: console // implementation of the `console` API, default `console`
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user: user,
    shared: shared
  },
  /* state: {
    recepices: [],
    user: null
  },
  mutations: {
    ...firebaseMutations
  }, */
  plugins: process.env.NODE_ENV !== 'production'
    ? [logger]
    : []
})
