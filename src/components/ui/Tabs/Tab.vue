<template>
  <section v-if="isActive"
    :aria-hidden="!isActive"
    class="tabs-component-panel"
    :id="name.toLowerCase().replace(/ /g, '-')"
    :aria-labelledby="name"
    role="tabpanel">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "Tab",

  props: {
    id: { default: null },
    name: { required: true },
    icon: { default: null },
    prefix: { default: '' },
    suffix: { default: '' },
    disabled:{ default: false },
  },

  data: () => ({
    isActive: false,
    isVisible: true,
  }),

  computed: {
    header() {
      return this.prefix + this.name + this.suffix;
    },
    hash() {
      if (this.disabled) {
        return '#';
      }
      return this.id ? '#' + this.id : '#' + this.name.toLowerCase().replace(/ /g, '-');
    },
  }
}
</script>
