<template>
<div class="item-container">
  <div class="item">
    <div class="item-control is-primary" @click="contentVisible = !contentVisible">
      <!-- <a class="is-primary" @click="contentVisible = !contentVisible"> -->
        <span class="icon is-small">
          <icon :icon="contentVisible ? ['fas', 'minus'] : ['fas', 'plus']" />
        </span>
      <!-- </a> -->
    </div>
    <slot></slot>
    <div class="item-control is-danger" @click="deleteItem">
      <!-- <a class="is-danger" @click="deleteItem(type, ingredient)"> -->
        <span class="icon is-small">
          <icon :icon="['fas', 'trash']" />
        </span>
        <span class="is-hidden-touch">Remove</span>
      <!-- </a> -->
    </div>
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
    deleteItem () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';
@import 'src/assets/scss/settings';
@import '~bulma/sass/utilities/derived-variables';
@import '~bulma/sass/utilities/controls';
@import 'src/assets/scss/item';
</style>
