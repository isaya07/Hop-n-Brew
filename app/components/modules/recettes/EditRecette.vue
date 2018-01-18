<template>
  <section>
    <h3 class="txtcenter">{{$route.params.name === 'new' ? 'Create recipe' : $route.params.name}}</h3>
    <div class="grid-2 medium-1" v-if="recipe">
      <div class="col">
        <div class="card">
          <div class="card-content grid-4 small-2 middle">
            <div class="is-1-4 col">
              <label>Name:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" v-model="recipe.name" type="text">
            </div>
            <div class="is-1-4 col">
              <label>Type:</label>
            </div>
            <div class="is-1-4 col">
              <span class="select">
                <select class="pure-input-1" v-model="recipe.type">
                  <option v-for="option in recipe.getTypeList()" :key="option">
                    {{ option }}
                  </option>
                </select>
              </span>
            </div>
            <div class="is-1-4 col">
              <label>Brewer:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" v-model="recipe.brewer" type="text">
            </div>
            <div class="is-1-4 col">
              <label>Efficiency:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" v-model.number="recipe.efficiency" type="number">
            </div>
            <div class="is-1-4 col">
              <label>Boil Time:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" v-model.number="recipe.boilTime" type="number">
            </div>
            <div class="is-1-4 col">
              <label>Batch size:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" :value="recipe.getBatchSize($config.volUnitie)" @input="value => { recipe.setBatchSize(value, $config.volUnitie) }" type="text">
            </div>
            <div class="is-1-2 col">
              <label class="checkbox">
                Calc Boil Volume
                <input type="checkbox" v-model="recipe.equipment.calcBoilVolume">
              </label>
            </div>
            <div class="is-1-4 col">
              <label class="label">Boil size:</label>
            </div>
            <div class="is-1-4 col">
              <input class="pure-input-1" :value="recipe.getBoilSize($config.volUnitie)" @input="value => { recipe.setBoilSize(value, $config.volUnitie) }" :disabled="recipe.equipment.calcBoilVolume" type="text">
            </div>
            <div class="is-1-4 col">
              <label class="label">Style:</label>
            </div>
            <div class="is-3-4 col">
              <styles-select :selectStyle="recipe.style.name" @style-change="updateStyle"></styles-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <bar-graph class="card-content" :og="recipe.getEstOg($config.gravUnit)" :fg="recipe.getEstFg($config.gravUnit)" :ibu="recipe.ibu" :abv="recipe.getEstAbv()" :color="parseInt(recipe.estColor)" :beerStyle="recipe.style"></bar-graph>
        </div>
      </div>
      <div class="col is-full">
        <div class="card">
          <ingredients-list
            class="card-content"
            :recepice="recipe"
            :ingredientsData="ingredients"
            @add="addIngredient"
            @delete="deleteIngredient">
          </ingredients-list>
          <div class="pure-u-1 pure-form">
            <label class="label">Notes:</label>
            <textarea class="pure-input-1" v-model="recipe.notes"></textarea>
          </div>
        </div>
      </div>
      <div class="col is-full">
        <div class="card">
          <mash-list class="card-content" :recepice="recipe" :mashName="'test'" @add="addMashStep"></mash-list>
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

export default {
  components: {
    IngredientsList,
    BarGraph,
    StylesSelect,
    MashList
  },

  /* props: {
    data: Object,
    db: 'recipes'
  }, */

  mounted () {
    // let test
    this.fetchData()
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
      recipe: null,
      data: null
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
        this.$db.get('recipes', this.$route.params.name).then(rows => {
          this.data = rows
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.data = {}
      }
    }
  }
}
</script>
