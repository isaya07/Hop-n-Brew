<template>
<div class="menu">
  <div class="menu-titre">
    <img src="./../../assets/img/icon.svg" alt="Logo">
    <h3>Hop'n Brew</h3>
  </div>
  <ul class="menu-list">
    <li class="menu-item" v-for="(item, x) in menus" :key="x">
      <router-link :to="item.path" v-if="!item.children" class="menu-link">
        {{ item.name }}
      </router-link>
      <a v-if="item.children && item.children.length" class="menu-link" @click="toggle(x)">
        {{ item.name }}
        <span v-if="item.children && item.children.length" :class="(x)===index ? 'close' : ''"></span>
      </a>
      <transition name="fade">
        <ul v-if="item.children && item.children.length" v-show="(x)===index" class="menu-list">
          <li class="menu-item children" v-for="(subItem, index) in item.children" :key="index">
            <router-link :to="subItem.path" class="menu-link" :index="x" exact>
              {{ subItem.name }}
            </router-link>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</div>
</template>

<script>
import { Menu } from '../Menu'

export default {
  name: 'sidebar',

  data () {
    return {
      index: '',
      menus: Menu
    }
  },

  methods: {
    toggle (index) {
      // console.log('new: %s, old: %s', index, this.index)
      this.index = (this.index === index) ? '' : index
    }
  },

  /* watch: {
    index (val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
      this.toggle(val)
    }
  }, */
  beforeMount () {
    this.$bus.$on('menu-index', this.toggle)
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/settings';
@import './../../assets/scss/mixins';

.menu-titre {
  padding-top: 1rem;
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
}

@media (max-width: 768px) {
  .menu-titre {
    img {
      width: 25px;
    }
    h5 {
      margin-left: 3rem;
      line-height: 25px;
    }
  }
}


.menu {
  font-size: 120%;

  ul {
    padding-left: 2rem;
    li.children {
      padding-left: 0rem;
    }
    li.children a {
        font-size: 90%;
    }
    li a.active {
      color: $primary-color;
    }
    li a span {
      @include arrow($dark-grey, -90deg);
      transition: 0.4s;

      &.close {
        transform: rotate(0deg);
      }
    }
  }
}

/* .pure-menu li span {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid $medium-grey;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  transition: 0.4s;
}

.pure-menu li span.close {
  transform: rotate(180deg);
} */

.fade-enter-active, .fade-leave-active {
  max-height: 300px;
  transition:all 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  max-height: 0;
  opacity: 0;
  transition:all 0.5s ease-out;
}

</style>
