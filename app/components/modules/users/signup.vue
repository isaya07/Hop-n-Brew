<template>
  <div class="grid">
    <div class="col is-1-4">
      <div class="card">
        <h3>SignUp</h3>
        <form>
          <label>Email address</label>
          <input v-model="email" type="email" placeholder="Email">
          <label>User name</label>
          <input v-model="name" type="text" placeholder="Name">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password">
          <div v-if="error !== ''" class="alert">
            <p><strong>{{error}}</strong></p>
          </div>
          <button type="button" @click="signUp" class="btn success">Sign Up</button>
          <span>or go back to <router-link to="/login">login</router-link>.</span>
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
      name: '',
      error: ''
    }
  },

  methods: {
    /**
     * Create a new user account
     *
     * @param object event
     */
    signUp: function (event) {
      // var vm = this
      // vm.auth.message = ''
      // vm.auth.hasErrors = false
      this.error = ''
      if (this.email === '' || this.name === '' || this.password === '') {
        this.error = 'Please provide the email, name and password'
        return
      }

      // Create a new user in firebase
      this.$auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$auth.currentUser.updateProfile({
            displayName: this.name
          }).then(() => {
            this.error = 'Successfully created user'
          }, (error) => {
            this.error = 'can\'t set the user name: ' + error
          })
        }).catch((error) => {
          this.error = error.message
        })
    }
  }
}
</script>

<style lang="css">
</style>
