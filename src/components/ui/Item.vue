<template>
<div>
  <div class="field has-addons bottom-null">
    <div class="control">
      <button class="button is-success" @click="toggleContent">
        <span class="icon is-small">
          <icon :icon="contentVisible ? ['fas', 'minus'] : ['fas', 'plus']" />
        </span>
      </button>
    </div>
    <slot></slot>
  </div>
  <transition name="fade">
    <div v-if="contentVisible" class="card">
      <div class="card-content">
        <slot name="content"></slot>
      </div>
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
      // if (this.contentVisible) this.$emit('content-visible', this)
    }
  }
}
</script>
