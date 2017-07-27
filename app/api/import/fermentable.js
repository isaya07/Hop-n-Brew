import { DOMParser } from 'xmldom'

export default function fromBeerXml (xml) {
  var i
  var j = 0
  var m
  var len
  var len1
  var out = {}
  var fermentable
  var parser = new DOMParser()
  var doc = parser.parseFromString(xml, 'text/xml')
  var ref2 = doc.documentElement.childNodes || []
  for (i = 0, len = ref2.length; i < len; i++) {
    var noeud = ref2[ i ]
    if (noeud.nodeName.toLowerCase() !== 'fermentable') {
      continue
    }
    var ref6 = noeud.childNodes || []
    fermentable = {}
    for (m = 0, len1 = ref6.length; m < len1; m++) {
      var fermentableProperty = ref6[ m ]
      switch (fermentableProperty.nodeName.toLowerCase()) {
        case 'name':
          fermentable.name = fermentableProperty.textContent
          break
        case 'type':
          fermentable.type = fermentableProperty.textContent
          break
        case 'amount':
          fermentable.amount = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'yield':
          fermentable.yield = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'color':
          fermentable.color = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'add_after_boil':
          fermentable.addAfterBoil = fermentableProperty.textContent.toLowerCase() === 'true'
          break
        case 'origin':
          fermentable.origin = fermentableProperty.textContent
          break
        case 'supplier':
          fermentable.supplier = fermentableProperty.textContent
          break
        case 'notes':
          fermentable.notes = fermentableProperty.textContent
          break
        case 'coarse_fine_dif':
          fermentable.coarseFineDif = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'moisture':
          fermentable.moisture = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'diastatic_power':
          fermentable.diastaticPower = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'protein':
          fermentable.proteine = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'max_in_batch':
          fermentable.maxInBatch = parseFloat(fermentableProperty.textContent).toFixed()
          break
        case 'recommend_mash':
          fermentable.recomendMash = fermentableProperty.textContent.toLowerCase() === 'true'
          break
        case 'ibu_gal_per_lb':
          fermentable.ibuGalPerLb = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'inventory':
          fermentable.inventory = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'potential':
          fermentable.potential = parseFloat(fermentableProperty.textContent).toFixed(3)
          break
      }
    }
    console.log(fermentable)
    out[j] = fermentable
    j++
  }
  return out
}
