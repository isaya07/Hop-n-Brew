import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      if (payload) {
        state.user = {
          id: payload.uid,
          name: payload.displayName,
          email: payload.email,
          photoUrl: payload.photoURL
        }
      } else {
        state.user = null
      }
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearMessage')
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setLoading', false)
            commit('setUser', user)
            resolve()
          }).catch(error => {
            commit('setLoading', false)
            commit('setMessage', {type: 'error', text: error.message})
            reject(error)
          })
      })
    },
    signUserIn ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearMessage')
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setLoading', false)
            commit('setUser', user)
            resolve()
          }).catch(error => {
            commit('setLoading', false)
            commit('setMessage', {type: 'error', text: error.message})
            reject(error)
          })
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    updateUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearMessage')
        firebase.auth().currentUser.updateProfile({
          photoUrl: payload.photoURL,
          displayName: payload.name
        }).then(() => {
          commit('setLoading', false)
          const newUser = {...firebase.auth().currentUser, ...payload}
          commit('setUser', newUser)
          resolve(newUser)
        }).catch(error => {
          commit('setLoading', false)
          commit('setMessage', {type: 'error', text: error.message})
          console.log(error)
          reject(error)
        })
      })
    }
  },

  getters: {
    user (state) {
      return state.user
    }
  }
}
