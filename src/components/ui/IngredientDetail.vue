<template>
  <div class="columns is-multiline is-mobile" slot="content">
    <div
      v-for="(value, key) in ingredient"
      :key="key"
      v-if="keyTest(key)"
      class="column"
      :class="key === 'notes' ? 'item-last is-full' : 'is-4'">
      <v-textarea v-if="key === 'notes'" :label="key | capitalize" :value="value" readonly></v-textarea>
      <v-input v-else-if="key === 'alpha'" :label="key | capitalize" :value="value"></v-input>
      <v-input v-else :label="key | capitalize" :value="value" readonly></v-input>
    </div>
  </div>
</template>

<script>
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

export default {
  name: 'IngredientDetail',

  components: {
    VInput,
    VTextarea
  },

  props: {
    ingredient: Object,
    notShow: Array
  },

  data () {
    return {
      nshow: ['toBeerXml', 'version', 'parent'].concat(this.notShow)
    }
  },

  methods: {
    keyTest: function (key) {
      if (this.nshow.indexOf(key) > -1) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scopped>
  .item-last {
    // flex-grow: 0.9;
    order: 1;
  }
</style>
