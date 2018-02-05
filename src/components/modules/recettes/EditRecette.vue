<template>
  <section v-if="recipe">
    <h3 class="title is-3 has-text-centered">{{$route.params.name === 'new' ? 'Create recipe' : recipe.name}}</h3>
    <div class="columns is-multiline is-mobile is-centered" v-if="recipe">
      <div class="column is-narrow-mobile is-11-mobile is-6-desktop is-6-tablet">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              About
            </p>
          </header>
          <div class="card-content">
            <div class="content columns is-multiline is-mobile">
              <div class="column is-half">
                <v-input label="Name" v-model="recipe.name"></v-input>
              </div>
              <div class="column is-half">
                <date-picker label="Date" v-model="recipe.date"></date-picker>
              </div>
              <div class="column is-half">
                <v-select label="Type" v-model="recipe.type" :typeList="recipe.getTypeList()"></v-select>
              </div>
              <div class="column is-half">
                <v-input label="Brewer" v-model="recipe.brewer"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Efficiency" v-model.number.lazy="recipe.efficiency" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Boil Time" v-model.number.lazy="recipe.boilTime" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Batch size" v-model.number.lazy="batchSize" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-checkbox label="Calc Boil Volume" v-model="recipe.equipment.calcBoilVolume" :rules="''"></v-checkbox>
              </div>
              <div class="column is-half">
                <v-input label="Boil size" v-model.number.lazy="boilSize" :readonly="recipe.equipment.calcBoilVolume" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-full">
                <styles-select :selectStyle="recipe.style.name" @style-change="updateStyle"></styles-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow-mobile is-11-mobile is-6-desktop is-6-tablet">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Stats
            </p>
          </header>
          <div class="card-content">
            <bar-graph class="content" :og="recipe.getEstOg($config.gravUnit)" :fg="recipe.getEstFg($config.gravUnit)" :ibu="recipe.ibu" :abv="recipe.getEstAbv()" :color="parseInt(recipe.estColor)" :beerStyle="recipe.style"></bar-graph>
          </div>
        </div>
      </div>
      <div class="column is-narrow-mobile is-11-mobile is-12-desktop is-11-tablet">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Ingredients
            </p>
          </header>
          <div class="card-content">
            <ingredients-list
              :recepice="recipe"
              :ingredientsData="ingredients"
              @add="addIngredient"
              @delete="deleteIngredient">
            </ingredients-list>
          </div>
        </div>
      </div>
      <div class="column is-narrow-mobile is-11-mobile is-12-desktop is-11-tablet">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Profile
            </p>
          </header>
          <div class="card-content">
            <tabs>
              <tab class="box" :name="'Mashs'">
                <mash-list class="card-content" :recepice="recipe" @add="addMashStep"></mash-list>
              </tab>
              <tab class="box" :name="'Starter'">
                Comming...
              </tab>
              <tab class="box" :name="'Fermentation'">
                Comming...
              </tab>
              <tab class="box" :name="'Notes'">
                <v-textarea label="Notes" v-model="recipe.notes" :rules="'myAlpha'"></v-textarea>
              </tab>
            </tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Recipe from 'api/recettes/Recipe'
import Style from 'api/recettes/Style'
import BarGraph from 'components/ui/BarGraph'
import IngredientsList from 'components/modules/recettes/IngredientsList'
import StylesSelect from 'components/ui/StyleSelect'
import MashList from 'components/modules/profils/MashList'
import VInput from 'components/ui/base/Input'
import VSelect from 'components/ui/base/Select'
import VTextarea from 'components/ui/base/Textarea'
import VCheckbox from 'components/ui/base/Checkbox'
import {Tab, Tabs} from 'components/ui/Tabs'
import DatePicker from 'components/ui/DatePicker'

export default {
  components: {
    IngredientsList,
    BarGraph,
    StylesSelect,
    MashList,
    VInput,
    VSelect,
    VTextarea,
    VCheckbox,
    Tab,
    Tabs,
    DatePicker
  },

  data () {
    return {
      data: null,
      recipe: new Recipe(this.$config, this.data)// new Recipe(this.$config, this.data)
    }
  },

  firestore() {
    return {
      data: this.$db.collection('recipes').doc(this.$route.params.name),
    }
  },

  computed: {
    /* recipe () {
      if (this.data) return new Recipe(this.$config, this.data)
      else return new Recipe(this.$config, { name: 'New Recepice', brewer: 'New Brewer', notes: 'Testing notes' })
    }, */
    ingredients () {
      return this.recipe.fermentables.concat(this.recipe.hops).concat(this.recipe.yeasts)
    },
    batchSize: {
      get: function () {
        return this.recipe.getBatchSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.recipe.setBatchSize(value, this.$config.volUnitie)
      }
    },
    boilSize: {
      get: function () {
        return this.recipe.getBoilSize(this.$config.volUnitie)
      },
      set: function (value) {
        this.recipe.setBoilSize(value, this.$config.volUnitie)
      }
    }
  },

  watch: {
    data: function () {
      if (this.data) this.recipe = new Recipe(this.$config, this.data)
      else this.recipe = new Recipe(this.$config, { name: 'test', brewer: 'isaya', notes: 'testing notes' })
    }
  },

  methods: {
    addIngredient (type, ingredient) {
      this.recipe.add(type, ingredient)
    },
    deleteIngredient (type, ingredient) {
      this.recipe.remove(type, ingredient)
    },
    updateStyle (style) {
      this.recipe.style = new Style(style)
    },
    addMashStep (mashStep) {
      console.log(mashStep)
    }
  }
}
</script>
