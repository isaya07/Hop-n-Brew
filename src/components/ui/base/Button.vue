<template>
  <button
    class="button"
    :class="classe"
    @click="sendClick">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'v-button',

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
