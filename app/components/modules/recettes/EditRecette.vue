<template>
<section class="section">
  <div class="columns">
    <div class="column">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="field label">Name:</label>
        </div>
        <div class="field-body">
          <input v-model="name" @change="updateData('name', name)" class="input" type="text" :value="name" placeholder="Name">
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Description:</label>
        </div>
        <div class="field-body">
          <textarea v-model="description" @change="updateData('description', description)" class="textarea control" placeholder="Description" :value="description" maxlength="100"></textarea>
        </div>
      </div>
      <beer-style :beer-style="beerStyle" @style-change="updateStyle"></beer-style>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Batch size:</label>
        </div>
        <div class="field-body">
          <input v-model="batchsize" @change="updateData('batchsize', batchsize)" class="input" type="number" placeholder="25" :value="batchsize">
        </div>
        <div class="field-label is-normal">
          <label class="label">Boil size:</label>
        </div>
        <div class="field-body">
          <input v-model="boilsize" @change="updateData('boilsize', boilsize)" class="input" type="number" placeholder="20" :value="boilsize">
        </div>
      </div>
    </div>
    <div class="column">
      <div class="level">
        <div class="block level-left">
          <span class="beercolor" v-bind:style="{ backgroundColor: util.srmToCss(dataRecette.color) }"> </span>
          <span>{{ util.srmToName(dataRecette.color) }}</span>
        </div>
        <div class="block level-right">
          <a class="button is-primary" @click="save">Save</a>
          <a class="button is-info" @click="xmlExport">export</a>
          <a class="button is-danger" @click="supress">Delete</a>
        </div>
      </div>
      <bar-graph :ogData="ogData" :fgData="fgData" :ibuData="ibuData" :abvData="abvData" :colorData="colorData"></bar-graph>
    </div>
  </div>
  <button class="button is-primary modal-button" @click="addIngredients('fermentable')">Add Fermentable</button>
  <button class="button is-primary modal-button" @click="addIngredients('hop')">Add Hops</button>
  <button class="button is-primary modal-button" @click="addIngredients('yeast')">Add Yeast</button>
  <table-list
    :colName="ingredientsColumns"
    :editableValue="ingredientsEditable"
    :ingredientsData="ingredientsData"
    :butDelete="ingredientsDelete"
    @quantitieUp="ingredientsUpdate"
    @delete="deleteIngredients">
  </table-list>
  <div v-if="dataRecette">
    <p>{{ dataRecette.name }}</p>
    <p>Batch Size: {{ batchsize }} litre ({{ Math.round(dataRecette.batchSize / dataRecette.servingSize) }}) bouteille</p>
    <p>Boil Size: {{ boilsize }} litre</p>
    <p>Calories: {{ Math.round(dataRecette.calories) }}</p>
    <p>BU/GU: {{ dataRecette.buToGu.toFixed(2) }}</p>
    <p>BV: {{ dataRecette.bv.toFixed(2) }}</p>
    <p>Cost: ${{ dataRecette.price.toFixed(2) }} ($ {{ (dataRecette.price / (dataRecette.batchSize / dataRecette.servingSize)).toFixed(2) }} / bottle)</p>
  </div>
  <modal-list
    :visible="modalVisible"
    :title="modalTitle"
    :colName="modalColumns"
    :ingredientsData="modalIngredients"
    :butAdd="modalAdd"
    @add="addModal"
    @close="closeModal"
    @cancel="closeModal">
  </modal-list>
</section>

</template>

<script>
import ModalList from 'components/ui/ModalList'
import BeerStyle from 'components/ui/StyleSelect'
import BarGraph from 'components/ui/BarGraph'
import Recette from 'api/recette/recette'
import TableList from 'components/ui/TableList'
// import { mapGetters } from 'vuex'

require('api/recette/beerxml')
require('api/recette/styles')

export default {
  name: 'recette',

  components: {
    ModalList,
    BeerStyle,
    BarGraph,
    TableList
  },

  data () {
    return {
      modalVisible: false,
      modalTitle: '',
      modalColumns: [],
      modalAdd: true,
      modalIngredients: [],
      ingredientsColumns: ['type', 'quantitie', 'name', 'Number', '%', 'Stock', 'cost'],
      ingredientsData: [],
      ingredientsDelete: true,
      ingredientsEditable: 'quantitie',
      util: Recette,
      dataRecette: new Recette.Recipe(),
      name: '',
      description: '',
      beerStyle: '',
      batchsize: 25,
      boilsize: 20,
      ogData: {
        start: null,
        value: null,
        end: null
      },
      fgData: {
        start: null,
        value: null,
        end: null
      },
      ibuData: {
        start: null,
        value: null,
        end: null
      },
      abvData: {
        start: null,
        value: null,
        end: null
      },
      colorData: {
        start: null,
        value: null,
        end: null
      }
    }
  },

  methods: {
    ingredientsUpdate (data, value) {
      var ref
      switch (data.type.toLowerCase()) {
        case 'grain':
          for (ref in this.dataRecette.fermentables) {
            if (this.dataRecette.fermentables[ref].name === data.name) {
              this.dataRecette.fermentables[ref].weight = Number(value)
              this.updateValue()
            }
          }
          break
        case 'aroma':
        case 'bittering':
        case 'both':
          for (ref in this.dataRecette.spices) {
            if (this.dataRecette.spices[ref].name === data.name) {
              this.dataRecette.spices[ref].weight = Number(value)
              this.updateValue()
            }
          }
          break
        case 'ale':
        case 'lager':
        case 'wine':
          for (ref in this.dataRecette.yeast) {
            if (this.dataRecette.yeast[ref].name === data.name) {
              this.dataRecette.yeast[ref].weight = Number(value)
              this.updateValue()
            }
          }
          break
      }
    },
    addIngredients (type) {
      switch (type) {
        case 'fermentable':
          this.modalTitle = 'Select a fermentable'
          this.modalColumns = ['name', 'origin', 'type', 'color', 'yield', 'max_in_batch', 'inventory', 'prix']
          this.modalIngredients = this.grains
          break
        case 'hop':
          this.modalTitle = 'Select a hop'
          this.modalColumns = ['name', 'origin', 'type', 'alpha', 'beta', 'use', 'inventory', 'prix']
          this.modalIngredients = this.hops
          break
        case 'yeast':
          this.modalTitle = 'Select a yeast'
          this.modalColumns = ['name', 'laboratory', 'productId', 'type', 'form', 'attenuation', 'inventory', 'prix']
          this.modalIngredients = this.yeasts
          break
      }
      this.modalVisible = true
    },
    addModal (type, entry) {
      var weight = 0
      switch (type) {
        case 'fermentable':
          weight = 0.5
          this.dataRecette.add('fermentable', {
            name: entry.name,
            color: entry.color,
            weight: weight,
            yield: entry.yield
          })
          break
        case 'hop':
          weight = 0.03
          this.dataRecette.add('hop', {
            name: entry.name,
            weight: weight,
            aa: entry.alpha,
            time: 60, // entry.time,
            use: entry.use,
            form: entry.form
          })
          break
        case 'yeast':
          weight = 1
          this.dataRecette.add('yeast', {
            name: entry.name,
            type: entry.type,
            form: entry.form,
            attenuation: entry.attenuation
          })
          break
      }
      console.log(entry)

      this.dataRecette.calculate()
      var ingr = {
        type: entry.type,
        name: entry.name,
        quantitie: weight,
        stock: entry.stock
      }
      this.ingredientsData.push(ingr)
    },
    closeModal () {
      this.modalVisible = false
    },
    deleteIngredients (entry) {
      console.log(entry)
    },
    updateData (type, value) {
      switch (type) {
        case 'name':
          this.dataRecette.name = value
          this.updateValue()
          break
        case 'description':
          this.dataRecette.description = value
          this.updateValue()
          break
        case 'batchsize':
          this.dataRecette.batchSize = value
          this.updateValue()
          break
        case 'boilsize':
          this.dataRecette.boilsize = value
          this.updateValue()
          break
      }
      // console.log(this.dataRecette)
    },
    updateValue () {
      console.log(this.dataRecette)
      this.dataRecette.calculate()
      this.ogData.value = this.dataRecette.og.toFixed(3)
      this.fgData.value = this.dataRecette.fg.toFixed(3)
      this.ibuData.value = this.dataRecette.ibu.toFixed(1)
      this.abvData.value = this.dataRecette.abv.toFixed(3)
      this.colorData.value = this.dataRecette.color.toFixed(3)
      // console.log('test')
    },
    xmlExport () {
      console.log(this.dataRecette.toBeerXml())
    },
    save () {
      console.log('save')
    },
    supress () {
      console.log('supress')
    },
    updateStyle (value) {
      var varia = value.split(' - ')
      var newstyle = Recette.getStyle(varia[ 0 ], varia[ 1 ])
      this.ogData.start = newstyle.og[ 0 ]
      this.ogData.end = newstyle.og[ 1 ]
      this.fgData.start = newstyle.fg[ 0 ]
      this.fgData.end = newstyle.fg[ 1 ]
      this.ibuData.start = newstyle.ibu[ 0 ]
      this.ibuData.end = newstyle.ibu[ 1 ]
      this.abvData.start = newstyle.abv[ 0 ]
      this.abvData.end = newstyle.abv[ 1 ]
      this.colorData.start = newstyle.srm[ 0 ]
      this.colorData.end = newstyle.srm[ 1 ]
      this.dataRecette.style = newstyle
      this.beerStyle = newstyle.category + ' - ' + newstyle.name
      this.updateValue()
    }
  },

  computed: {
    /* ...mapGetters({
      grains: 'allGrains',
      hops: 'allHops',
      yeasts: 'allYeasts'
    }),

    dataRecette: {
      get: function () {
        // Create a recipe
        var newstyle = Recette.getStyle('Bock', 'Doppelbock')
        this.beerStyle = newstyle.category + ' - ' + newstyle.name
        console.log(this.beerStyle)
        var r = new Recette.Recipe({
          name: 'My test brew',
          description: 'A new test beer using Brauhaus.js!',
          batchSize: 25.0,
          boilSize: 20.0,
          ibuMethod: 'tinseth',
          style: newstyle
        })

        // Add ingredients
        r.add('fermentable', {
          name: 'Extra pale malt',
          color: 2.5,
          weight: 4.2,
          yield: 78.0,
          use: 'boil'
        })

        r.add('hop', {
          name: 'Cascade hops',
          weight: 0.028,
          aa: 5.0,
          time: 60,
          use: 'boil',
          form: 'pellet'
        })

        r.add('yeast', {
          name: 'Wyeast 3724 - Belgian Saison',
          type: 'ale',
          form: 'liquid',
          attenuation: 80
        })

        // Set up a simple infusion mash
        r.mash = new Recette.Mash({
          name: 'My mash',
          ph: 5.4
        })

        r.mash.addStep({
          name: 'Saccharification',
          type: 'Infusion',
          time: 60,
          temp: 68,
          waterRatio: 2.75
        })

        // Calculate values
        r.calculate()
        this.ogData.value = r.og.toFixed(3)
        this.fgData.value = r.fg.toFixed(3)
        this.ibuData.value = r.ibu.toFixed(1)
        this.abvData.value = r.abv.toFixed(3)
        this.colorData.value = r.color.toFixed(3)
        // this.updateValue()

        return r
      },
      set: function (type, value) {
        // console.log(type, value)
      }
    } */
  },

  mounted () {
    this.$on('style-change', this.updateStyle)
    this.$store.dispatch('getAllGrains')
    this.$store.dispatch('getAllHops')
    this.$store.dispatch('getAllYeasts')
  }
}
</script>

<style lang="scss">

.beercolor {
    display: inline-block;
    width: 30px;
    height: 30px;
}
</style>
