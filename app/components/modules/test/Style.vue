<template>
  <div>
    <h3 class="text-center">Styles</h3>
    <styles-select :selectStyle="styleSelect" @style-change="updateStyle"></styles-select>
    <table-list
      :colName="columns"
      :ingredientsData="styles"
      :butEdit="false"
      :butDelete="false"
      :search="true"
      :inStock="false"
      :createImport="true"
      @import="importStyle"
      @supress="deleteStyle"
      @create="createStyle"
      @edit="editStyle">
    </table-list>
  </div>
</template>

<script>
import Style from 'api/recettes/Style'
import TableList from 'components/ui/TableList'
import StylesSelect from 'components/ui/StyleSelect'

export default {
  name: 'styles',

  components: {
    TableList,
    StylesSelect
  },

  pouch: {
    styles: {}
  },

  data () {
    return {
      columns: ['name', 'type', 'category', 'styleGuide'],
      styleSelect: 'Australian Sparkling Ale'
    }
  },

  methods: {
    importStyle (xml) {
      let newStyles = Style.fromXml(xml)
      let item
      let item2
      let number
      for (item in newStyles) {
        var data = {}
        number++
        for (item2 in newStyles[item]) {
          data[item2] = newStyles[item][item2]
        }
        data['_id'] = data.name
        // console.log(data)
        this.$pouch.put('styles', data).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          this.$notification.error('Import of' + data.name + ' failed: ' + err)
          console.error('Import of' + name + ' failed: ' + err)
        })
      }
      this.$notification.success(number + ' yeasts successfully imported')
    },
    createStyle () {

    },
    editStyle (style) {

    },
    deleteStyle (style) {

    },
    updateStyle (style) {
      console.log(style)
    }
  }
}
</script>
