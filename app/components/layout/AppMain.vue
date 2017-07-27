<template>
    <transition
      mode="out-in"
      name="fade"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear>
      <router-view class="animated"></router-view>
    </transition>
</template>

<script>
  export default {

  }
</script>
