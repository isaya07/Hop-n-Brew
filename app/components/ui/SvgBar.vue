<template>
<div class="svg-container">
  <svg :viewBox="'0 0 '+ width + ' ' +  height" preserveAspectRatio="none">
    <g>
      <rect class="svgbar" :width="width" :height="height" rx="5" ry="5"></rect>
      <rect class="svgbar-interval" :x="points.start" :width="points.end" :height="height" rx="5" ry="5"></rect>
      <line class="svgbar-value" :x1="points.value" y1="0" :x2="points.value" :y2="height"></line>
    </g>
  </svg>
</div>
</template>

<script>
export default {
  name: 'svgbar',

  props: {
    width: Number,
    height: Number,
    max: Number,
    data: Object
  },

  computed: {
    points () {
      return {
        start: this.data.start ? Math.round((this.width * (this.data.start - 1)) / this.max) : null,
        value: Math.round((this.width * (this.data.value - 1)) / this.max),
        end: this.data.end ? Math.round((this.width * (this.data.end - 1)) / this.max) : null
      }
    }
  }

}
</script>

<style lang="scss">
  rect.svgbar {
    fill: lightgrey;
    stroke: grey;
    stroke-opacity:0.5;
    fill-opacity:0.5;
  }
  rect.svgbar-interval {
    fill: red;
    opacity: .25;
    transition: fill 2s ease-out
  }
  line.svgbar-value {
    stroke:red;
  }

  .svg-container {
    width: 100%;
    height: 0;
    padding: 0; /* reset */
    padding-bottom: 10%;
    position: relative;
    // display: inline-block;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 2.4rem;
  }
</style>
