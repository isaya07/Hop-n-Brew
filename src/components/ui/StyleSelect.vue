<template>
  <search-select :options="styles"
                :selectedOption="selected"
                placeholder="Select a style"
                @select="onSelect">
  </search-select>
</template>

<script>
import SearchSelect from 'components/ui/SearchSelect'

export default {
  name: 'style-select',

  components: {
    SearchSelect
  },

  mounted () {
    /* this.$db.gets('styles').then(rows => {
      this.styles = rows
      this.selected = this.search(this.selectStyle, 'name', this.styles)
    }).catch(err => {
      console.log(err)
    }) */
  },

  props: {
    selectStyle: String
  },

  data () {
    return {
      selected: {name: this.selectStyle} || '',
      styles: []
    }
  },

  firestore() {
    return {
        // Collection
        styles: this.$db.collection('styles'),
        // Doc
        // ford: this.$db.collection('cars').doc('ford')
    }
  },

  methods: {
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
    onSelect (selected) {
      this.selected = selected
      let test = this.search(this.selected.name, 'name', this.styles)
      this.$emit('style-change', test)
    },
    selectOption () {
      // select option from parent component
      this.selected = this.options[0]
    }
  }
}
</script>
