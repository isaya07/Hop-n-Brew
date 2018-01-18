<template>
  <div class="grid">
    <div class="col is-1-4">
      <div class="card">
        <h3 style="text-align: center;">Login using firebase</h3>
        <form>
          <label>Email address</label>
          <input v-model="email" type="email" placeholder="Email">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password">
          <div v-if="error !== ''" class="alert">
            <p><strong>{{error}}</strong></p>
          </div>
          <button type="button" @click="login" class="btn primary">Login</button>
          <p>You don't have an account ? You can <router-link to="/signup">create one</router-link></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },

  methods: {

    /**
     * Authenticate the user
     *
     * @param object event
     */
    login (event) {
      var vm = this
      // vm.auth.message = ''
      // vm.auth.hasErrors = false

      if (this.email === '' || this.password === '') {
        this.error = 'Please provide the email and password'
        return
      }
      // Sign-in the user with the email and password
      this.$auth.signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          alert('Ok')
          this.$router.replace('acceuil')
        }).catch((error) => {
          this.error = error.message
        })
    },
  }
}
</script>

<style lang="css">
</style>
