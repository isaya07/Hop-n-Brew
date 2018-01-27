<template>
<div class="grid">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Sign Up
      </p>
    </header>
    <div class="card-content">
      <div class="field">
      <v-input label="User name" v-model="name" :rules="'required|myAlpha'"></v-input>
      <v-input label="Email address" v-model="email" :rules="'required|email'"></v-input>
      <v-input label="Password" v-model="password" :type="'password'" :rules="'required'"></v-input>
      <p v-show="error" class="help is-danger">
        {{ errors }}
      </p>
      <button type="button" @click="signUp" class="button is-primary is-pulled-right" :class="loading ? 'is-loading':''">Sign Up</button>
      <p>You already have an account ? You can <router-link to="/signin">sign in here</router-link></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VInput from 'components/ui/base/Input'

export default {
  name: 'signup',

  components: {
    VInput
  },

  data () {
    return {
      email: '',
      password: '',
      name: '',
      photoUrl: ''
    }
  },

  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },

  methods: {
    signUp: function (event) {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      .then(() => {
        this.$store.dispatch('updateUser', {name: this.name, photoUrl: this.photoUrl})
        .then(() => {
          this.$router.push('/')
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
