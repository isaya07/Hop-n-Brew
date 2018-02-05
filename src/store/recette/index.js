import Recipe from 'api/recettes/Recipe'
import Config from 'api/recettes/Config'

let config = new Config()

export default {
  state: {
    recipe: Recipe
  },

  mutations: {
    setRecipe (state, payload) {
      if (payload) {
        state.recipe = new Recipe(config, payload)
      } else {
        state.user = new Recipe(config)
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
    fermentables (state) {
      return state.recipe.fermentables
    },
    hops (state) {
      return state.recipe.hops
    },
    yeasts (state) {
      return state.recipe.yeasts
    },
    miscs (state) {
      return state.recipe.miscs
    },
    waters (state) {
      return state.recipe.waters
    },
    mashs (state) {
      return state.recipe.mashs
    }
  }
}
