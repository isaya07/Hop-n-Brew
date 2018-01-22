<template>
<div>
  <nav id="topbar" class="navbar is-light is-fixed-top">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img :src="logo" alt="Logo" height="10">          
      </div>
      <router-link :to="{ name: 'acceuil'}" class="navbar-item">
        <h5 class="title is-5">Hop'n Brew</h5>
      </router-link>
      <div class="navbar-burger"  @click="showNav = !showNav" :class="{ 'is-active': showNav }">
        <span></span>
        <span></span>
        <span></span>
      </div>        
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <template v-for="(item, idx) in menus">
          <router-link :to="item.path" v-if="!item.children" class="navbar-item" :key="idx">
            {{ item.name }}
          </router-link>
          <div v-else-if="item.children.length" class="navbar-item has-dropdown is-hoverable" :key="idx">
            <a class="navbar-link">
              {{ item.name }}
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="subItem.path" class="navbar-item" :index="idx" v-for="(subItem, id) in item.children" :key="id">
                {{ subItem.name }}
              </router-link>
            </div>
          </div>
        </template >
      </div>
      <div class="navbar-end">
        <div class="navbar-item" v-if="user">
          Hello {{user.displayName}},
          <a @click="logOut">log out?</a>
        </div>
        <div class="navbar-item" v-else>
          <v-button @click="showLogin = !showLogin">Log In</v-button>
        </div>
      </div>
    </div>
  </nav>
  <log-in v-if="showLogin"></log-in>
</div>  
</template>

<script>
import { Menu } from 'components/Menu'
import VButton from 'components/ui/base/Button'
import Logo from 'assets/img/icon.svg'
import LogIn from 'components/modules/users/login'

export default {
  name: 'topbar',

  components: {
    VButton,
    LogIn
  },

  data () {
    return {
      menus: Menu,
      logo: Logo,
      user: this.$auth.currentUser,
      showNav: false,
      showLogin: false
    }
  },

  methods: {
    logOut () {
      this.$auth.signOut().then(() => {
        this.user = ''
        this.$router.replace('/');
      }).catch(() => {
        alert('Failed to signout user, try again later')
      })
    },
    setShow (value) {
      this.showNav = value
    }
  },

  created: function() {
    console.log(this.user)
    this.$parent.$on('show-nav', this.setShow)
  }
}
</script>

<style lang="scss">

</style>
