<template>
  <div class="field">
    <div class="control">
      <input type="checkbox"
        class="is-checkradio"
        :id="label"
        :name="label"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
        v-validate="rules"
        :class="{'is-danger': errors.has(label) }">
      <label :for="label">
        {{ label }}
      </label>
      <p v-show="errors.has(label)" class="help is-danger">
        {{ errors.first(label) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCheckBox",

  props: {
    label: String,
    value: [String, Boolean],
    rules: {
      type: String,
      default: 'required'
    }
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
