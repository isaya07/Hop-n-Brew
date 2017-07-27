<template>
<div>
  <search-select :options="options"
                :selectedOption="item"
                placeholder="Select a style"
                @select="onSelect">
  </search-select>
</div>
</template>

<script>
import SearchSelect from 'components/ui/SearchSelect'

export default {
  name: 'style-select',

  components: {
    SearchSelect
  },

  pouch: {
    styles: {}
  },

  props: {
    selectStyle: String
  },

  data () {
    return {
      selected: this.selectStyle || '',
      item: {
        value: '',
        text: ''
      }
    }
  },

  computed: {
    options () {
      let options = []
      if (this.styles !== undefined && this.styles !== null) {
        for (let i = 0; i < this.styles.length; i++) {
          let temp = {}
          temp.value = this.styles[i].id
          temp.text = this.styles[i].name
          options.push(temp)
        }
      }
      return options
    }
  },

  methods: {
    setValue (data) {
      this.selected = data.selected
    },
    search (nameKey, prop, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i][prop] === nameKey) {
          return myArray[i]
        }
      }
    },
    updateStyle (data, event) {
      if (data !== undefined) {
        let test = this.search(data, 'name', this.styles)
        this.$emit('style-change', test)
      }
    },
    onSelect (item) {
      this.item = item
      let test = this.search(this.item.text, 'name', this.styles)
      this.$emit('style-change', test)
      console.log(this.item)
    },
    selectOption () {
      // select option from parent component
      this.item = this.options[0]
    }
  }
}
</script>
