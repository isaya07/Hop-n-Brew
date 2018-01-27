import { line, area } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { select, mouse, selectAll } from 'd3-selection'
import { extent, max } from 'd3-array'

export default {
  line: line,
  area: area,
  scaleLinear: scaleLinear,
  axisBottom: axisBottom,
  axisLeft: axisLeft,
  select: select,
  selectAll: selectAll,
  mouse: mouse,
  extent: extent,
  max: max
}
