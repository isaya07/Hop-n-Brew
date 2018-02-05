<template>
  <div class="field-body">
    <div class="field">
      <div class="field-label is-normal" :class="align">
        <input type="checkbox"
          class="is-checkradio"
          :id="label"
          :name="label"
          :checked="value"
          @change="updateValue($event.target.checked)"
          v-validate="rules"
          :class="{'is-danger': errors.has(label) }">
        <!-- <div class="field-label is-normal"> -->
        <label :for="label" class="label is-normal">
          {{ label }}
        </label>
      </div>

      <p v-show="errors.has(label)" class="help is-danger">
        {{ errors.first(label) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-checkbox",

  props: {
    label: String,
    value: [String, Boolean],
    align: {
      type: String,
      default: 'has-text-left'
    },
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
