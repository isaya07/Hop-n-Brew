export default {
  state: {
    loading: false,
    message: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = null
    }
  },
  actions: {
    clearMessage ({commit}) {
      commit('clearMessage')
    }
  },
  getters: {
    loading: state => state.loading,
    message: state => state.message
  }
}
