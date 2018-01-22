<template>
	<div id="app">
    <nav id="topbar" class="navbar is-light is-fixed-top">
      <div class="navbar-brand">
        <div class="navbar-item">
          <img src="./assets/img/icon.svg" alt="Logo" height="10">          
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
          <div v-for="(item, idx) in menus" :key="idx">
            <router-link :to="item.path" v-if="!item.children" class="navbar-item">
              {{ item.name }}
            </router-link>
            <div v-else-if="item.children.length" class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                {{ item.name }}
              </a>
              <div class="navbar-dropdown is-boxed">
                <router-link :to="subItem.path" class="navbar-item" :index="idx" v-for="(subItem, id) in item.children" :key="id">
                  {{ subItem.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <progress-bar></progress-bar>
    <div id="main" class="container has-text-left">
      <div v-if="error">{{error}}</div>
      <transition
        class="container"
        mode="out-in"
        name="fade"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
	</div>
</template>

<script>
import ProgressBar from 'layout/Progress'
import { Menu } from 'components/Menu'

export default {
  name: 'app',

  components: {
    ProgressBar
  },

  data () {
    return {
      index: '',
      menus: Menu,
      user: this.$auth.currentUser,
      error: null,
      showNav: false
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

  methods: {
    /* toggleNav (event) {
      let side = document.getElementById('sidenav')
      let main = document.getElementById('main')
      let top = document.getElementById('topbar')
      // let hamb = document.getElementById('hanburger')
      if (side.style.width === '0px') {
        side.style.width = '220px'
        main.style.marginLeft = '220px'
        top.style.marginLeft = '220px'
        // hamb.style.left = '220px'
      } else {
        side.style.width = '0'
        main.style.marginLeft = '0'
        top.style.marginLeft = '0'
        // hamb.style.left = '0'
      }
      document.getElementById('hanburger').classList.toggle('change')
    },
    toggle (index) {
      // console.log('new: %s, old: %s', index, this.index)
      this.index = (this.index === index) ? '' : index
    }, */
    logOut () {
      this.$auth.signOut().then(() => {
        this.user = ''
        this.$router.replace('/');
      }).catch(() => {
        alert('Failed to signout user, try again later')
      })
    }
  },

  created () {
    // this.$myProgress.start(300)
    // this.$bus.$emit('progress', 'start')
    this.$router.beforeEach((to, from, next) => {
      this.$bus.$emit('progress', 'start')
      this.showNav = false
      // this.$myProgress.start(300)
      next()
    })
    this.$router.afterEach((to, from) => {
      // this.$bus.$emit('progress', 'stop')
    })
  },

  mounted () {
    /* let active = document.querySelectorAll('.active')
    if (active[0]) {
      let index = active[0].getAttribute('index')
      this.index = index
    } */
    // this.$bus.$emit('progress', 'stop')
    // this.$myProgress.stop()
  }
}
</script>

<style lang="scss">
  // @import './assets/scss/app';
  @import "./node_modules/bulma/sass/utilities/initial-variables";
  @import "./node_modules/bulma/sass/utilities/derived-variables";

  /* #topbar {
    width: 100%;
    height: 42px;
    background-color: $white;
    display: inline-flex;
    box-shadow: 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1);
    margin-left: 220px;
    transition: 0.5s;
    img {
      width: 35px;
      float: left;
      margin-left: 1rem;
      // filter:invert(1);
    }
    h3 {
      margin: 0;
      margin-left: 5rem;
      line-height: 35px;
    }
  } */

  /* The side navigation menu */
  /* #sidenav {
      height: 100%; // 100% Full-height
      width: 220px; // 0 width - change this with JavaScript
      position: fixed; // Stay in place
      z-index: 3; // Stay on top
      top: 0px;
      left: 0;
      background-color: $white; // Black
      overflow-x: hidden; // Disable horizontal scroll
      // padding-top: 20px; // Place content 60px from the top
      transition: 0.5s; // 0.5 second transition effect to slide in the sidenav
      // border-right: 1px solid rgba($black, 0.3);
      box-shadow: 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1);
  } */

  /* The navigation menu links */
  /* .sidenav a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s
  } */

  /* When you mouse over the navigation links, change their color */
  /* .sidenav a:hover, .offcanvas a:focus{
      color: #f1f1f1;
  } */

  /* Style page content - use this if you want to push the page content to the right when you open the side navigation */
  #main {
    // margin-left: 220px;
    transition: 0.5s;
    //padding: 20px;
    /* max-width: 1280px;
    margin: 0 auto; */
  }

  #hanburger {
    // position: fixed;
    // top: 0px;
    // left: 220px;
    // margin-left: 250px;
    padding: 3px 5px;
    display: inline-block;
    cursor: pointer;
    z-index: 2;
    background-color: $white;
    // box-shadow: 0 2px 3px rgba($black, 0.1), 0 0 0 1px rgba($black, 0.1);
    // border-bottom-right-radius: $global-radius;
    transition: 0.5s;
    .bar1, .bar2, .bar3 {
        width: 30px;
        height: 3px;
        background-color: $text;
        margin: 6px 0;
        border-radius: 3px;
        transition: 0.5s;
    }
    &.change {
      .bar1 {
        -webkit-transform: rotate(-45deg) translate(-6px, 6px) ;
        transform: rotate(-45deg) translate(-6px, 6px) ;
      }
      .bar2 {opacity: 0;}
      .bar3 {
          -webkit-transform: rotate(45deg) translate(-7px, -7px) ;
          transform: rotate(45deg) translate(-7px, -7px) ;
      }
    }
  }

  .title-bar {
    position: relative;
    z-index: 2;
    top: 0;
  }

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  /* @media screen and (max-height: 450px) {
      .sidenav {padding-top: 15px;}
      .sidenav a {font-size: 18px;}
  } */
</style>
