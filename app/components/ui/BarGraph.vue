<template>
  <!-- <div class="card"> -->
      <div class="grid-3">
        <div class="col is-1-6">OG:</div>
        <div class="col is-1-6">{{ ogData.value }}</div>
        <div class="col is-2-3">
          <svg-bar :width="200" :height="20" :data="ogData" :max="0.150"></svg-bar>
        </div>
        <div class="col is-1-6">FG:</div>
        <div class="col is-1-6">{{ fgData.value }}</div>
        <div class="col is-2-3">
          <svg-bar :width="200" :height="20" :data="fgData" :max="0.150"></svg-bar>
        </div>
        <div class="col is-1-6">IBU:</div>
        <div class="col is-1-6">{{ ibuData.value }}</div>
        <div class="col is-2-3">
          <svg-bar :width="200" :height="20" :data="ibuData" :max="200"></svg-bar>
        </div>
        <div class="col is-1-6">ABV:</div>
        <div class="col is-1-6">{{ abvData.value }}</div>
        <div class="col is-2-3">
          <svg-bar :width="200" :height="20" :data="abvData" :max="20"></svg-bar>
        </div>
        <div class="col is-1-6">Color:</div>
        <div class="col is-1-6">{{ colorData.value }}</div>
        <div class="col is-2-3">
            <svg-bar :width="200" :height="20" :data="colorData" :max="200"></svg-bar>
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
