<template>
  <div v-show="loading" class="txtcenter is-full">
    <icon :icon="['fas', 'spinner']" class="fa-3x fa-spin" />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'loader',

  props: {
    loading: Boolean
  }
}
</script>
