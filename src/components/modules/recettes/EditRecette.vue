<template>
  <section>
    <h3 class="title is-3 has-text-centered">{{$route.params.item.name === 'new' ? 'Create recipe' : recipe.name}}</h3>
    <div class="columns is-multiline is-mobile" v-if="recipe">
      <div class="column is-half">
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
                <my-select label="Type" v-model="recipe.type" :typeList="recipe.getTypeList()"></my-select>
              </div>
              <div class="column is-half">
                <v-input label="Brewer" v-model="recipe.brewer"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Efficiency" v-model="recipe.efficiency" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Boil Time" v-model="recipe.boilTime" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <v-input label="Batch size" :value="recipe.getBatchSize($config.volUnitie)" @input="value => { recipe.setBatchSize(value, $config.volUnitie) }" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-half">
                <my-checkbox label="Calc Boil Volume" v-model="recipe.equipment.calcBoilVolume" :rules="''"></my-checkbox>
              </div>
              <div class="column is-half">
                <v-input label="Boil size" :value="recipe.getBoilSize($config.volUnitie)" @input="value => { recipe.setBoilSize(value, $config.volUnitie) }" :disabled="recipe.equipment.calcBoilVolume" :rules="'myNumeric'"></v-input>
              </div>
              <div class="column is-one-quarter">
                <label class="label">Style :</label>
              </div>
              <div class="column is-three-quarter">
                <styles-select :selectStyle="recipe.style.name" @style-change="updateStyle"></styles-select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half">
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
      <div class="column is-full">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Ingredients
            </p>
          </header>
          <div class="card-content">
            <ingredients-list
              class="content"
              :recepice="recipe"
              :ingredientsData="ingredients"
              @add="addIngredient"
              @delete="deleteIngredient">
            </ingredients-list>
            <v-textarea label="Notes" v-model="recipe.notes" :rules="'myAlpha'"></v-textarea>
          </div>
        </div>
      </div>
      <div class="column is-full">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Mash
            </p>
          </header>
          <div class="card-content">
            <mash-list class="card-content" :recepice="recipe" :mashName="'test'" @add="addMashStep"></mash-list>
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
import MySelect from 'components/ui/form/base/MySelect'
import VTextarea from 'components/ui/base/Textarea'
import MyCheckbox from 'components/ui/form/base/MyCheckbox'

export default {
  components: {
    IngredientsList,
    BarGraph,
    StylesSelect,
    MashList,
    VInput,
    MySelect,
    VTextarea,
    MyCheckbox
  },

  props: ['item'],

  mounted () {
    // let test
    // this.fetchData()
    /* if (this.data) test = new Recipe(this.$config, this.data)
    else test = new Recipe(this.$config, { name: 'test', brewer: 'isaya', notes: 'testing notes' })
    this.recipe = test */
  },

  data () {
    /* let test
    let data = this.fetchData()
    console.log(data)
    if (data) test = new Recipe(this.$config, data)
    else test = new Recipe(this.$config, { name: 'test', brewer: 'isaya', notes: 'testing notes' }) */
    return {
      recipe: new Recipe(this.$config, this.item)/* ,
      data: this.$route.params.item */
    }
  },

  computed: {
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
      console.log(this.recipe)
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
    },
    fetchData () {
      if (this.$route.params.name !== 'new') {
        console.log(this.$route.params)
        this.$binding('recipes', this.$db.db.collection('recipes').where('_id', '==', this.$route.params.name))
        .then((data) => {
          this.data = data
          // this.$bus.$emit('progress', 'stop')
        }).catch(err => {
          console.error(err)
        })
        /* this.$db.get('recipes', this.$route.params.name).then(rows => {
          this.data = rows
        }).catch(err => {
          console.log(err)
        }) */
      } else {
        this.data = {}
      }
    }
  }
}
</script>
