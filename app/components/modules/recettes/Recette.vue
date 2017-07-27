<template>
<section class="section">
  <div class="block">
    <a class="button is-primary" @click="save">Save</a>
    <a class="button is-info" @click="xmlExport">export</a>
    <a class="button is-danger" @click="supress">Delete</a>
  </div>
  <div v-if="dataRecette">
    <p>{{ dataRecette.name }}</p>
    <p>Batch Size: {{ dataRecette.batchSize.toFixed(1)}} litre ({{ Math.round(dataRecette.batchSize / dataRecette.servingSize) }}) bouteille</p>
    <p>Boil Size: {{ dataRecette.boilSize.toFixed(1)}} litre</p>
    <p>OG: {{ dataRecette.og.toFixed(3) }}</p>
    <p>FG: {{ dataRecette.fg.toFixed(3) }}</p>
    <p>
      Color: {{ dataRecette.color.toFixed(1) }} SRM <span class="beercolor" v-bind:style="{ backgroundColor: Rec.srmToCss(dataRecette.color) }"> </span>
    </p>
    <p>IBU: {{ dataRecette.ibu.toFixed(1) }}</p>
    <p>ABV: {{ dataRecette.abv.toFixed(1) }} %</p>
    <p>Calories: {{ Math.round(dataRecette.calories) }}</p>
    <p>BU/GU: {{ dataRecette.buToGu.toFixed(2) }}</p>
    <p>BV: {{ dataRecette.bv.toFixed(2) }}</p>
    <p>Cost: ${{ dataRecette.price.toFixed(2) }} ($ {{ (dataRecette.price / (dataRecette.batchSize / dataRecette.servingSize)).toFixed(2) }} / bottle)</p>
    <beer-style @style-change="updateStyle"></beer-style>
    <svg-bar :width="400" :height="20" :data="stats"></svg-bar>
  </div>
</section>

</template>

<script>
import BeerStyle from 'components/ui/StyleSelect'
import SvgBar from 'components/ui/SvgBar'
import Recette from 'api/recette/recette'
require('api/recette/beerxml')
require('api/recette/styles')

export default {
  name: 'recette',

  components: {
    BeerStyle,
    SvgBar
  },

  data () {
    return {
      Rec: Recette,
      stats: {
        start: null,
        value: null,
        end: null
      }
    }
  },

  methods: {
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
      let varia = value.split(' - ')
      let newstyle = Recette.getStyle(varia[ 0 ], varia[ 1 ])
      this.stats.start = newstyle.og[ 0 ]
      this.stats.end = newstyle.og[ 1 ]
      console.log(newstyle)
    }
  },

  computed: {
    dataRecette () {
      // Create a recipe
      var r = new Recette.Recipe({
        name: 'My test brew',
        description: 'A new test beer using Brauhaus.js!',
        batchSize: 20.0,
        boilSize: 10.0,
        ibuMethod: 'tinseth',
        style: Recette.getStyle('Bock', 'Doppelbock')
      })

      // Add ingredients
      r.add('fermentable', {
        name: 'Extra pale malt',
        color: 2.5,
        weight: 4.2,
        yield: 78.0
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
      this.stats.value = r.og.toFixed(3)

      return r
    }
  },

  mounted () {
    this.$on('style-change', this.updateStyle)
  }
}
</script>

<style lang="scss">

.beercolor {
    display: inline-block;
    width: 12px;
    height: 12px;
}
</style>
