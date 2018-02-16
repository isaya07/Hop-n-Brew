<template>
  <section v-if="recipe" class="section">
    <button class="button is-primary is-pulled-right" @click="saveRecipe">Save</button>
    <h3 class="title is-3 has-text-centered">{{recipe && recipe.name ? recipe.name : ''}}</h3>
    <div class="columns is-multiline is-mobile is-centered" v-if="recipe">
      <div class="column is-12-mobile is-6-tablet">
        <div class="card">
          <!-- <header class="card-header">
            <p class="card-header-title">
              About
            </p>
          </header> -->
          <div class="card-content has-text-right">
            <div class="columns is-multiline is-mobile">
              <div class="column is-half">
                <v-input label="Name" v-model="recipe.name"></v-input>
              </div>
              <div class="column is-half">
                <date-picker label="Date" v-model="recipe.date"></date-picker>
              </div>
              <div class="column is-half">
                <v-input label="Brewer" v-model="recipe.brewer"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Asst Brewer" v-model="recipe.asstBrewer"></v-input>
              </div>
              <div class="column is-half">
                <v-select label="Type" v-model="recipe.type" :typeList="recipe.getTypeList()"></v-select>
              </div>
              <div class="column is-half">
                <v-input label="Efficiency" v-model.number.lazy="recipe.efficiency" :unitie="'%'" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-full">
                <profil-select :profil="recipe.style" :type="'style'" :columns="['name', 'category', 'ogMin', 'ogMax', 'fgMin', 'fgMax']" @profil-change="updateStyle"></profil-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <div class="card">
          <div class="card-content">
            <div class="columns is-multiline is-mobile">
              <div class="column is-full">
                <profil-select
                  :profil="recipe.equipment"
                  :type="'equipment'"
                  :columns="['name', 'batchSize', 'boilSize', 'boilTime']"
                  @profil-change="updateEquipment">
                </profil-select>
              </div>
              <div class="column is-half">
                <v-input label="Boil Time" v-model.number.lazy="recipe.boilTime" :unitie="$config.timeUnitie" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Batch size" v-model.number.lazy="batchSize" :unitie="'°' + $config.tempUnitie" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-checkbox label="Calc Boil Volume" v-model="recipe.equipment.calcBoilVolume" :rules="''"></v-checkbox>
              </div>
              <div class="column is-half">
                <v-input label="Boil size" v-model.number.lazy="boilSize" :unitie="$config.volUnitie | capitalize" :readonly="recipe.equipment.calcBoilVolume" :rules="'myNumeric'"></v-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <div class="card">
          <!-- <header class="card-header">
            <p class="card-header-title">
              Stats
            </p>
          </header> -->
          <div class="card-content">
            <bar-graph :og="recipe.getEstOg($config.gravUnit)" :fg="recipe.getEstFg($config.gravUnit)" :ibu="recipe.getIbu()" :abv="recipe.getEstAbv()" :color="parseInt(recipe.estColor)" :beerStyle="recipe.style"></bar-graph>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <div class="card">
          <!-- <header class="card-header">
            <p class="card-header-title">
              Ingredients
            </p>
          </header> -->
          <div class="card-content is-small-padding">
            <ingredients-list
              :recepice="recipe"
              :ingredientsData="ingredients"
              @add="addIngredient"
              @delete="deleteIngredient">
            </ingredients-list>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <div class="card">
          <!-- <header class="card-header">
            <p class="card-header-title">
              Profile
            </p>
          </header> -->
          <div class="card-content is-small-padding">
            <tabs>
              <tab :name="'Mashs'">
                <mash-list :recepice="recipe" @add="addMashStep"></mash-list>
              </tab>
              <tab :name="'Starter'">
                Comming...
              </tab>
              <tab :name="'Fermentation'">
                Comming...
              </tab>
              <tab :name="'Notes'">
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
import Equipment from 'api/recettes/Equipment'
import BarGraph from 'components/ui/BarGraph'
import IngredientsList from 'components/modules/recettes/IngredientsList'
import ProfilSelect from 'components/ui/ProfilSelect'
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
    ProfilSelect,
    MashList,
    VInput,
    VSelect,
    VTextarea,
    VCheckbox,
    Tab,
    Tabs,
    DatePicker,
    EquipmentsEditForm: () => import('components/ui/form/EquipmentsEditForm')
  },

  data () {
    return {
      data: null,
      recipe: new Recipe(this.$config, this.data)// new Recipe(this.$config, this.data)
    }
  },

  firestore () {
    return {
      data: this.$db.collection('recipes').doc(this.$route.params.name)
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
    updateEquipment (equipment) {
      console.log(equipment)
      this.recipe.equipment = new Equipment(equipment)
    },
    addMashStep (mashStep) {
      console.log(mashStep)
    },
    saveSelectProfile (test, profil) {
      this.$bus.$emit('save-profile', test, profil)
    },
    saveRecipe () {
      console.log('test save')
    }
  }
}
</script>
