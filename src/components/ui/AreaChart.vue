<template>
  <div class="area-chart">
    <svg :width="'100%'" :height="'100%'" :viewBox="'0 0 ' + this.width + ' ' + this.height" :preserveAspectRatio="'xMidYMin meet'">
      <g class="chart" :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}">
        <path class="area" :d="paths.area" />
        <path class="line" :d="paths.line" />
      </g>
      <g class="focus">
        <circle class="focus-point" r="3"></circle>
        <text class="focus-text"></text>
      </g>
    </svg>
  </div>
</template>

<script>
import d3 from './d3Import.js'

export default {
  name: 'area-chart',

  props: {
    chartData: Array,
    width: Number,
    height: Number,
    xLabel: String,
    yLabel: String
  },

  data () {
    return {
      margin: {top: 20, right: 30, bottom: 20, left: 30},
      paths: {
        line: '',
        area: ''
      },
      scaled: {
        x: null,
        y: null
      },
      points: []
    }
  },

  mounted () {
    d3.select('.focus').style('display', 'none')
    this.draw(this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom)
  },

  methods: {
    createArea: d3.area().x(d => d.x).y0(d => d.y0).y1(d => d.y),
    createLine: d3.line().x(d => d.x).y(d => d.y),
    draw (width, height) {
      this.scaled.x = d3.scaleLinear().rangeRound([0, width])
      this.scaled.y = d3.scaleLinear().rangeRound([height, 0])
      this.scaled.x.domain(d3.extent(this.chartData, d => d.x))
      this.scaled.y.domain([0, d3.max(this.chartData, d => d.y)])
      for (let coord of this.chartData) {
        this.points.push({
          x: this.scaled.x(coord.x),
          y: this.scaled.y(coord.y),
          y0: this.scaled.y(0)
        })
      }
      this.paths.area = this.createArea(this.points)
      this.paths.line = this.createLine(this.points)

      let g = d3.select('.area-chart g')
      g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(this.scaled.x))
        .append('text')
        .attr('fill', '#000')
        .attr('y', -5)
        .attr('x', width + 10)
        .text(this.xLabel)
      g.append('g')
        .call(d3.axisLeft(this.scaled.y))
        .append('text')
        .attr('fill', '#000')
        .attr('y', -5)
        .attr('x', 5)
        .text(this.yLabel)

      let svg = d3.select('.area-chart svg')
      let vm = this
      svg.on('mousemove', function () {
        let point = d3.mouse(this)
        vm.mouseOver({x: point[0], y: point[1]})
      }).on('mouseout', function () {
        d3.select('.focus').style('display', 'none')
      }).on('mouseover', function () { // on mouse in show line, circles and text
        d3.select('.focus').style('display', null)
      })
    },
    mouseOver (event) {
      let pathEl = d3.select('.line').node()
      let x = event.x - this.margin.left
      let beginning = x
      let end = pathEl.getTotalLength()
      let target
      let pos
      while (true) {
        target = Math.floor((beginning + end) / 2)
        pos = pathEl.getPointAtLength(target)
        if ((target === end || target === beginning) && pos.x !== x) break
        if (pos.x > x) end = target
        else if (pos.x < x) beginning = target
        else break // position found
      }
      if (pos !== null && x >= 0) {
        d3.select('.focus-point').attr('transform', `translate(${pos.x + this.margin.left},${pos.y + this.margin.top})`)
        d3.select('.focus-text').attr('transform', `translate(${pos.x + this.margin.left + 5},${pos.y + this.margin.top - 5})`)
          .text(this.scaled.y.invert(pos.y).toFixed(1))
      }
    }
  },

  watch: {
    chartData: {
      handler: function (newData, oldData) {
        this.points = []
        d3.selectAll('.area-chart svg g > g').remove()
        this.draw(this.width - this.margin.left - this.margin.right, this.height - this.margin.top - this.margin.bottom)
      }
    }
  }
}
</script>

<style lang="scss" scopped>
@import './../../assets/scss/settings';

.area-chart {
  margin: auto;
  width: 80%;

  .focus {
    .focus-point {
      fill: $warning;
    }

    .focus-text {
      font-size: 70%;
    }
    // display: none;
  }

  path.domain {
    transition: all .4s ease;
    stroke: $grey-darker;
  }

  text {
    font-family: $family-primary;
    // font-size: 100%;
  }

  g.tick {
    fill: $grey-darker;
    line {
      stroke: $grey-darker;
    }
  }

  path.area {
    transition: all .4s ease;
    fill: rgba($warning, 0.4);
    stroke: none;
  }
  path.line {
    transition: all .4s ease;
    fill: none;
    stroke: $warning;
    stroke-width: 1.5;
  }
  path.selector {
    stroke: black;
    fill: none;
  }
}
</style>