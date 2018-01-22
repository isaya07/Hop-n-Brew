<template>
<div class="login">
  <div class="card">
    <div class="card-content">
      <v-input label="Email address" v-model="email" :rules="'required|email'"></v-input>
      <v-input label="Password" v-model="password" :type="'password'" :rules="'required'"></v-input>
      <p v-show="error" class="help is-danger">
        {{ errors }}
      </p>
      <button type="button" @click="login" class="button primary">Login</button>
      <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
    </div>
  </div>
</div>
</template>

<script>
import VInput from 'components/ui/base/Input'

export default {
  name: 'login',

  components: {
    VInput
  },

  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {

    login (event) {
      // Sign-in the user with the email and password
      this.$auth.signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace('/')
        }).catch((error) => {
          this.error = error.message
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  right: 0;
  z-index: 100;
}
</style>
