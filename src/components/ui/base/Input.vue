<template>
  <div class="field is-horizontal">
    <div v-if="label" class="field-label has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input 
            class="input"
            :type="type"
            ref="input"
            :name="label"
            :placeholder="label"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-validate="rules"
            :disabled="disabled"
            :readonly="readonly"
            :class="{'is-danger': errors.has(label) }">
          <p v-show="errors.has(label)" class="help is-danger">
            {{ errors.first(label) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-input",

  props: {
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: [String, Boolean],
      default: false
    },
    readonly: {
      type: [String, Boolean],
      default: false
    },
    rules: {
      type: String,
      default: 'required|myAlpha'
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
