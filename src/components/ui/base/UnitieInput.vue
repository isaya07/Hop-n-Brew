<template>
  <div class="field has-addons">
    <div class="field-label is-expanded has-text-left">
      <label class="label">{{ label }} :</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input 
            class="input"
            type="number"
            step=".1"
            ref="input"
            :name="label"
            :placeholder="label"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            v-validate="rules"
            :class="{'is-danger': errors.has(label) }">
          <div class="select" :class="{'is-danger': errors.has(label) }">
            <select
              v-bind:value="unitie"
              v-on:input="updateValue($event.target.value)"
              :name="label"
              v-validate="rules">
              <option v-for="option in unitieList" selected="value" :key="option">
                {{ option }}
              </option>
            </select>
            <p v-show="errors.has(label)" class="help is-danger">{{ errors.first(label) }}</p>
          </div>
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
  name: "v-unitie-input",

  props: {
    label: String,
    value: Number,
    unitie: String,
    unitieList: Array,
    rules: {
      type: String,
      default: 'required|myNumeric'
    }
  },

  computed: {

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
