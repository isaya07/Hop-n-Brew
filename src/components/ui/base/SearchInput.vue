<template>
  <div class="field-body">
    <div class="field is-normal">
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
  </div>
</template>

<script>
export default {
  name: 'v-search-input',

  props: {
    label: {
      type: String,
      default: 'Search'
    },
    value: String
  },

  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }

}
</script>

<style>

</style>
