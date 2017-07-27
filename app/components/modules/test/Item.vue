<template>
  <div class="item center">
    <div class="item-inline">
      <button class="btn first" @click="toggleContent">
        <span class="right-arrow" :class="contentVisible ? 'close' : ''"></span>
      </button>
      <slot></slot>
    </div>
    <transition name="fade">
      <div v-show="contentVisible" class="item-content grid-2 medium-1 small-1">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'item',

  props: {
    itemData: Object,
    id: Number
  },

  data () {
    return {
      contentVisible: false,
      timeUnitie: 'min',
      tempUnitie: '°C'
    }
  },

  methods: {
    toggleContent () {
      this.contentVisible = !this.contentVisible
      if (this.contentVisible) this.$emit('content-visible', this)
    }
  }
}
</script>

<style lang="css">
</style>
