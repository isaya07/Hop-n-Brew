<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded">
          <div class="select is-fullwidth" :class="{'is-danger': errors.has(label) }">
            <select 
              v-bind:value="value"
              v-on:input="updateValue($event.target.value)"
              :name="label"
              v-validate="rules">
              <option disabled value="">Please select one</option>
              <option v-for="option in typeList" selected="value" :key="option">
                {{ option }}
              </option>
            </select>
            <p v-show="errors.has(label)" class="help is-danger">{{ errors.first(label) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-select",

  props: {
    label: String,
    value: String,
    typeList: Array,
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
