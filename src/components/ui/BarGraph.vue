<template>
  <!-- <div class="card"> -->
      <div class="columns is-multiline is-mobile">
        <div class="column is-12-mobile is-6-tablet">
          <div class="columns is-multiline is-mobile">
            <div class="column is-1 has-text-weight-bold">OG:</div>
            <div class="column is-2 has-text-right">{{ ogData.value }}</div>
            <div class="column is-9">
              <svg-bar :data="ogData" :max="0.150"></svg-bar>
            </div>
            <div class="column is-1 has-text-weight-bold">FG:</div>
            <div class="column is-2 has-text-right">{{ fgData.value }}</div>
            <div class="column is-9">
              <svg-bar :data="fgData" :max="0.150"></svg-bar>
            </div>
            <div class="column is-1 has-text-weight-bold">IBU:</div>
            <div class="column is-2 has-text-right">{{ ibuData.value }}</div>
            <div class="column is-9">
              <svg-bar :data="ibuData" :max="200"></svg-bar>
            </div>
          </div>
        </div>
        <div class="column is-12-mobile is-6-tablet">
          <div class="columns is-multiline is-mobile">
            <div class="column is-1 has-text-weight-bold">ABV:</div>
            <div class="column is-2 has-text-right">{{ abvData.value }}</div>
            <div class="column is-9">
              <svg-bar :data="abvData" :max="20"></svg-bar>
            </div>
            <div class="column is-1 has-text-weight-bold">Color:</div>
            <div class="column is-2 has-text-right">{{ colorData.value }}</div>
            <div class="column is-9">
                <svg-bar :data="colorData" :max="200"></svg-bar>
            </div>
          </div>
        </div>
      </div>
  <!-- </div> -->
</template>

<script>
import SvgBar from './SvgBar'

export default {
  props: {
    beerStyle: {},
    og: Number,
    fg: Number,
    ibu: Number,
    abv: Number,
    color: Number
  },

  components: {
    SvgBar
  },

  computed: {
    ogData () {
      return {
        start: this.beerStyle.ogMin,
        end: this.beerStyle.ogMax,
        value: this.og
      }
    },
    fgData () {
      return {
        start: this.beerStyle.fgMin,
        end: this.beerStyle.fgMax,
        value: this.fg
      }
    },
    ibuData () {
      return {
        start: this.beerStyle.ibuMin,
        end: this.beerStyle.ibuMax,
        value: this.ibu
      }
    },
    abvData () {
      return {
        start: this.beerStyle.abvMin,
        end: this.beerStyle.abvMax,
        value: this.abv
      }
    },
    colorData () {
      return {
        start: this.beerStyle.colorMin,
        end: this.beerStyle.colorMax,
        value: this.color
      }
    }
  }
}
</script>
