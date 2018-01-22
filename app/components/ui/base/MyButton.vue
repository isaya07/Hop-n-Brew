<template>
  <button 
    class="button"
    :class="classe"
    v-on:click="sendClick">
    <slot>Button</slot>
  </button>
</template>
​
<script>
export default {
  props: {
    classe: {
      type: String,
      default: ''
    }
    /* click: {
      type: Function,
      required: true
    } */
  },

  methods: {
    sendClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>