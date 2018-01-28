<template>
  <div class="field-body">
    <p class="control field">
      <input type="checkbox"
        class="is-checkradio"
        :id="label"
        :name="label"
        :checked="value"
        @change="updateValue($event.target.checked)"
        v-validate="rules"
        :class="{'is-danger': errors.has(label) }">
      <label :for="label" class="label">
        {{ label }}
      </label>
      <p v-show="errors.has(label)" class="help is-danger">
        {{ errors.first(label) }}
      </p>
    </p>
  </div>
</template>

<script>
export default {
  name: "v-checkbox",

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
