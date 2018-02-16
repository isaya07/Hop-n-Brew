<template>
  <div v-show="loading" class="txtcenter is-full">
    <icon :icon="['fas', 'spinner']" :spin="true" size="3x"/>
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
