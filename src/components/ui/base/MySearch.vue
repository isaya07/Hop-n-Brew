<template>
<div class="field">
  <div class="control has-icons-right">
    <input
      class="input"
      type="text"
      ref="input"
      :name="label"
      :placeholder="label"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)">
    <span class="icon is-small is-right">
      <icon :icon="['fas', 'search']" />
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: "MyTextInput",

  props: {
    label: {
      type: String,
      default: 'Search'
    },
    value: String
  },

  methods: {
    updateValue: function(value) {
      this.$emit('input', value)
    }
  }

}
</script>

<style>

</style>
