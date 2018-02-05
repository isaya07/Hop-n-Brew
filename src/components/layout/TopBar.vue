<template>
  <div>
    <nav id="topbar" class="navbar is-fixed-top has-text-weight-bold">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="~assets/img/icon.svg" alt="Logo" height="10">
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
              <div class="navbar-dropdown">
                <router-link :to="subItem.path" class="navbar-item" :index="idx" v-for="(subItem, id) in item.children" :key="id">
                  {{ subItem.name }}
                </router-link>
              </div>
            </div>
          </template>
        </div>
        <div class="navbar-end">
          <div class="navbar-item" v-if="user">
            Hello {{user.name}}&nbsp;
            <button class="delete" aria-label="delete" @click="logOut"></button>
            <!-- <a @click="logOut">log out?</a> -->
          </div>
          <div class="navbar-item" v-else>
            <router-link to="/signin" class="has-text-weight-bold has-text-dark">
              Sign In
            </router-link>
            &nbsp;or&nbsp;
            <router-link to="/signup" class="has-text-weight-bold has-text-dark">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <log-in v-if="showLogin"></log-in>
  </div>
</template>

<script>
import { Menu } from 'components/Menu'

export default {
  name: 'topbar',

  data () {
    return {
      menus: Menu,
      showNav: false,
      showLogin: false
    }
  },

  computed: {
    user () {
      return this.$store.getters.user
    }
  },

  methods: {
    logOut () {
      this.$store.dispatch('logout')
      this.$router.replace('/')
    },
    setShow (value) {
      this.showNav = value
    }
  },

  created: function() {
    this.$parent.$on('show-nav', this.setShow)
  }
}
</script>
