<template>
	<div id="app">
    <v-notif></v-notif>
    <top-bar></top-bar>
    <progress-bar></progress-bar>
    <div class="container has-text-left">
      <div v-if="error">{{error}}</div>
      <transition name="fade">
        <router-view class="animated"></router-view>
      </transition>
    </div>
	</div>
</template>

<script>
import VNotif from 'layout/Notification'
import TopBar from 'layout/TopBar'
import ProgressBar from 'layout/Progress'
// import { Menu } from 'components/Menu'

export default {
  name: 'app',

  components: {
    VNotif,
    TopBar,
    ProgressBar
  },

  data () {
    return {
      // index: '',
      // menus: Menu,
      // user: this.$auth.currentUser,
      error: null,
      // showNav: false
    }
  },

  /* errorCaptured (err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    return false
  }, */

  /* firebase () {
    // const userId = this.$auth.currentUser.uid
    return {
      // users: db.ref('users').child(userId)
    }
  }, */

  /* methods: {
    logOut () {
      this.$auth.signOut().then(() => {
        this.user = ''
        this.$router.replace('/');
      }).catch(() => {
        alert('Failed to signout user, try again later')
      })
    }
  }, */

  created () {
    // this.$myProgress.start(300)
    // this.$bus.$emit('progress', 'start')
    this.$router.beforeEach((to, from, next) => {
      this.$bus.$emit('progress', 'start')
      this.$emit('show-nav', false)
      // this.$myProgress.start(300)
      next()
    })
    this.$router.afterEach((to, from) => {
      // this.$bus.$emit('progress', 'stop')
    })
  },

  mounted () {
    // this.$bus.$emit('progress', 'stop')
    // this.$myProgress.stop()
  }
}
</script>

<style lang="scss">
  // @import "./node_modules/bulma/sass/utilities/initial-variables";
  // @import "./node_modules/bulma/sass/utilities/derived-variables";

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
