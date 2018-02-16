<template>
<div class="svg-container" ref="container">
  <svg width="100%" height="100%" :viewBox="'0 0 '+ width + ' ' + height">
    <g>
      <rect class="svgbar" :width="width" :height="height" rx="5" ry="5"></rect>
      <rect class="svgbar-interval" :x="points.start" :width="points.end" :height="height" rx="5" ry="5"></rect>
      <line v-if="data.value" class="svgbar-value" :x1="points.value" y1="0" :x2="points.value" :y2="height"></line>
      <text ref="startText" :x="points.start" :y="(height/1.33)">{{ data.start }}</text>
      <text ref="endText" :x="points.start + points.end" :y="(height/1.33)">{{ data.end }}</text>
    </g>
  </svg>
</div>
</template>

<script>
import Utils from 'api/recettes/Utils'

export default {
  name: 'svgbar',

  props: {
    max: Number,
    data: Object
  },

  data () {
    return {
      width: 0,
      height: 0
    }
  },

  updated () {
    if (this.points.value) {
      this.setText()
    }
  },

  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },

  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },

  computed: {
    points () {
      return {
        start: this.data.start ? Utils.roundDecimal((this.width * (this.data.start - 1)) / this.max, 3) : null,
        value: this.data.value ? Utils.roundDecimal((this.width * (this.data.value - 1)) / this.max, 3) : null,
        end: this.data.end ? Utils.roundDecimal((this.width * (this.data.end - 1)) / this.max, 3) : null
      }
    }
  },

  methods: {
    setText (event) {
      let bbox = this.$refs.startText.getBBox()
      let start = this.points.start - bbox.width
      if (start < 0) start = 1
      this.$refs.startText.setAttribute('x', start)
      this.$refs.startText.setAttribute('y', bbox.height)
      bbox = this.$refs.endText.getBBox()
      let end = this.points.start + this.points.end
      let max = this.width - bbox.width
      if (end > max) end = max - 1
      this.$refs.endText.setAttribute('x', end)
      this.$refs.startText.setAttribute('y', bbox.height)
    },
    handleResize (event) {
      this.width = this.$refs.container.offsetWidth
      this.height = this.$refs.container.offsetHeight > 24 ? 24 : this.$refs.container.offsetHeight // 24 -> 1.5rem
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/settings';
@import "~bulma/sass/utilities/derived-variables";

  rect.svgbar {
    fill: $grey-lighter;
    stroke: $grey-light;
    stroke-opacity: 1;
    fill-opacity:0.5;
  }

  rect.svgbar-interval {
    fill: $danger;
    opacity: .25;
    transition: fill 2s ease-out
  }
  line.svgbar-value {
    stroke: $danger;
  }

  .svg-container {
    svg {
      text {
        // font-family: $family-primary;
        // font-size: 0.8rem;
      }
    }
  }

</style>
