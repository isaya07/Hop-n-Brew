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
              :value="value"
              @input="updateValue($event.target.value)"
              :name="label"
              v-validate="rules">
              <option disabled value="">Please select one</option>
              <template v-if="optionType">
                <option v-for="option in typeList" :key="option.value" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </template>
              <template v-else>
                <option v-for="option in typeList" :key="option">
                  {{ option }}
                </option>
              </template>
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
  name: 'v-select',

  props: {
    label: String,
    value: [String, Number],
    typeList: Array,
    optionType: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: 'required|myAlpha'
    }
  },

  methods: {
    updateValue (value) {
      console.log(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>
