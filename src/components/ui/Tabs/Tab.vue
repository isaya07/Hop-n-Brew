<template>
  <div v-if="isActive"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    :id="name.toLowerCase().replace(/ /g, '-')"
    :aria-labelledby="name"
    role="tabpanel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tab',

  props: {
    id: { default: null },
    name: { required: true },
    icon: { default: null },
    prefix: { default: '' },
    suffix: { default: '' },
    disabled: { default: false }
  },

  data: () => ({
    isActive: false,
    isVisible: true
  }),

  computed: {
    header () {
      return this.prefix + this.name + this.suffix
    },
    hash () {
      if (this.disabled) {
        return '#'
      }
      return this.id ? '#' + this.id : '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  }
}
</script>

<style lang="scss">
@import 'src/assets/scss/settings';
@import '~bulma/sass/utilities/derived-variables';
.tabs-component-panel {
  background-color: $white;
  border: 1px solid $border;
  // box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: $text;
  padding: 1rem;
  margin-top: -1px;
}
</style>
