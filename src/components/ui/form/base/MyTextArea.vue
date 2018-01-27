<template>
  <div class="field is-horizontal">
    <div class="field-label is-expanded has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <textarea
            class="textarea"
            :name="label"
            :placeholder="label"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-validate="rules"
            :disabled="disabled"
            :readonly="readonly"
            :class="{'is-danger': errors.has(label) }">
          </textarea>
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
  name: "MyTextArea",

  props: {
    label: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
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
