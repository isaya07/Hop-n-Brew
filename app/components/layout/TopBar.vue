<template>
  <div id="topbar"class="grid">
    <div class="col">
      <img src="./../../assets/img/icon.svg" alt="Logo">
      <router-link :to="{ name: 'acceuil'}">
        <h3>Hop'n Brew</h3>
      </router-link>
    </div>
    <div class="col">
      <div id="hanburger" class="change mobile-only" @click="toggleNav">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
    </div>
    <div class="col">
      {{user.name}}
      <a class="button" v-on:click="signOut" v-if="user">Sign-out</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topbar',

  data () {
    return {
      user: this.$auth.currentUser
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/settings';
@import './../../assets/scss/mixins';

#topbar {
  background-color: $white;
}

</style>
