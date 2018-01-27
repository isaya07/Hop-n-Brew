<template>
<div class="signin">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Sign In
      </p>
    </header>
    <div class="card-content">
      <div class="field">
      <v-input label="Email address" v-model="email" :rules="'required|email'"></v-input>
      <v-input label="Password" v-model="password" :type="'password'" :rules="'required'"></v-input>
      <p v-show="error" class="help is-danger">
        {{ errors }}
      </p>
      <button type="button" @click="signUp" class="button is-primary is-pulled-right" :class="loading ? 'is-loading':''">Sign In</button>
      <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VInput from 'components/ui/base/Input'

export default {
  name: 'signin',

  components: {
    VInput
  },

  data () {
    return {
      email: '',
      password: ''
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
    signUp (event) {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      .then(() => {
        this.$router.replace('/')
      }).catch((err) => {
        console.log(err)
      })
    },
  }
}
</script>
