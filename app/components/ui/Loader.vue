<template>
  <div v-show="loading" class="txtcenter is-full">
    <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
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
