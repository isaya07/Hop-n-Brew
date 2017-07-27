<template>
  <section>
    <h3 class="txtcenter">Create recipe</h3>
    <div class="grid-2 medium-1">
      <div class="col">
        <div class="card">
          <div class="grid-4 small-2 middle">
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
                  <option v-for="option in recipe.typeList">
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
              <input class="pure-input-1" v-model.number="recipe.batchSize" type="text">
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
              <input class="pure-input-1" v-model.number="recipe.boilSize" type="number" :disabled="recipe.equipment.calcBoilVolume">
            </div>
            <div class="is-1-4 col">
              <label class="label">Style:</label>
            </div>
            <div class="is-1-2 col">
              <styles-select :selectStyle="recipe.style.name" @style-change="updateStyle"></styles-select>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <bar-graph :og="recipe.estOg" :fg="recipe.estFg" :ibu="recipe.ibu" :abv="recipe.estAbv" :color="recipe.estColor" :beerStyle="recipe.style"></bar-graph>
        </div>
      </div>
      <div class="col is-full">
        <div class="card">
          <ingredients-list :recepice="recipe" :ingredientsData="ingredients" @add="addIngredient"></ingredients-list>
          <div class="pure-u-1 pure-form">
            <label class="label">Notes:</label>
            <textarea class="pure-input-1" v-model="recipe.notes"></textarea>
          </div>
        </div>
      </div>
      <div class="col is-full">
        <div class="card">
          <mash-list :recepice="recipe" :mashName="'test'" @add="addMashStep"></mash-list>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Recipe from 'api/recettes/Recipe'
import Style from 'api/recettes/Style'
import BarGraph from 'components/ui/BarGraph'
import IngredientsList from 'components/modules/test/IngredientsList'
import StylesSelect from 'components/ui/StyleSelect'
import MashList from 'components/modules/test/MashList'

export default {
  components: {
    IngredientsList,
    BarGraph,
    StylesSelect,
    MashList
  },

  data () {
    return {
      recipe: new Recipe(this.$config, { name: 'test', brewer: 'isaya', notes: 'testing notes' })
    }
  },

  computed: {
    ingredients () {
      return this.recipe.fermentables.concat(this.recipe.hops).concat(this.recipe.yeasts)
    }
  },

  methods: {
    addIngredient (type, ingredient) {
      this.recipe.add(type, ingredient)
    },
    updateStyle (style) {
      this.recipe.style = new Style(style)
    },
    addMashStep (mashStep) {
      console.log(mashStep)
    }
  },

  mounted () {
    this.recipe.name = 'test'
    this.recipe.type = 'All Grain'
    this.recipe.add('fermentable', { amount: 4, yield: 81, color: 3.2, displayAmount: '6 kg', displayColor: '1.8 L' })
    this.recipe.add('fermentable', { amount: 1, yield: 70, color: 120 })
    // this.recipe.add('fermentable', {name: 'proteine2'})
    // this.recipe.add('fermentable', {name: 'proteine1'})
    // this.recipe.remove('fermentable', 'proteine2')
    this.recipe.add('hop', { amount: 0.01, time: 60, alpha: 7, form: 'pellet', displayAmount: '10 g', displayTime: '1 hour' })
    this.recipe.add('yeast', { attenuation: 75, displayAmount: '11 g' })
    this.recipe.add('misc')
    this.recipe.add('water')
    this.recipe.mash.add({name: 'proteine'})
    // this.recipe.Mash.add({name: 'proteine2'})
    // this.recipe.Mash.add({name: 'proteine1'})
    // this.recipe.Mash.remove('proteine2')
    // console.log(this.recipe)
  }
}
</script>
