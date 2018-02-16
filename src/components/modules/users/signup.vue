<template>
<section class="section">
  <h3 class="title is-3 has-text-centered">Sign Up</h3>
  <div class="columns is-mobile is-centered">
    <div class="column is-10-mobile is-8-desktop is-narrow">
      <div class="card">
        <div class="card-content">
          <v-input label="User name" v-model="name" :rules="'required|myAlpha'"></v-input>
          <div class="columns">
            <div class="column is-6">
              <v-input label="Email address" v-model="email" :rules="'required|email'"></v-input>
              <v-input label="Confirm Email" v-model="emailConf" :rules="{ required: true, confirmed: email }"></v-input>
            </div>
            <div class="column is-6">
              <v-input label="Password" v-model="password" :type="'password'" :rules="{ required: true, min: 6, max: 12 }"></v-input>
              <v-input label="Confirm Password" v-model="passwordConf" :type="'password'" :rules="{ required: true, confirmed: password }"></v-input>
            </div>
          </div>
          <p v-show="error" class="help is-danger">
            {{ errors }}
          </p>
          <button type="button" @click="signUp" class="button is-primary is-pulled-right" :class="loading ? 'is-loading':''">Sign Up</button>
          <p>You already have an account ? You can <router-link to="/signin">sign in here</router-link></p>
        </div>
      </div>
    </div>
  </div>
</section>
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
      emailConf: '',
      password: '',
      passwordConf: '',
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
