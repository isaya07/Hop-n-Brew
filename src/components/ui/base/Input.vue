<template>
  <div class="field is-horizontal">
    <div v-if="label" class="field-label is-normal has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded" :class="unitie ? 'has-icons-right' : ''">
          <input
            class="input"
            :type="type"
            :id="id"
            ref="input"
            :name="label"
            :placeholder="label"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-validate="rules"
            :disabled="disabled"
            :readonly="readonly"
            :class="errors.has(label) ? 'is-danger ' + this.align : this.align ">
            <span v-if="unitie" class="icon is-right">{{ unitie }}</span>
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
  name: 'v-input',

  props: {
    label: String,
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    id: '',
    disabled: {
      type: [String, Boolean],
      default: false
    },
    readonly: {
      type: [String, Boolean],
      default: false
    },
    rules: {
      type: [String, Object],
      default: 'required|myAlpha'
    },
    align: {
      type: String,
      default: ''
    },
    unitie: String
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
