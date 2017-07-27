import { DOMParser } from 'xmldom'

export default function fromBeerXml (xml) {
  var i
  var j = 0
  var m
  var len
  var len1
  var out = {}
  var yeast
  var parser = new DOMParser()
  var doc = parser.parseFromString(xml, 'text/xml')
  var ref2 = doc.documentElement.childNodes || []
  for (i = 0, len = ref2.length; i < len; i++) {
    var noeud = ref2[ i ]
    if (noeud.nodeName.toLowerCase() !== 'yeast') {
      continue
    }
    var ref6 = noeud.childNodes || []
    yeast = {}
    for (m = 0, len1 = ref6.length; m < len1; m++) {
      var fermentableProperty = ref6[ m ]
      switch (fermentableProperty.nodeName.toLowerCase()) {
        case 'name':
          yeast.name = fermentableProperty.textContent
          break
        case 'type':
          yeast.type = fermentableProperty.textContent
          break
        case 'amount':
          yeast.amount = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'flocculation':
          yeast.flocculation = fermentableProperty.textContent
          break
        case 'attenuation':
          yeast.attenuation = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'form':
          yeast.form = fermentableProperty.textContent
          break
        case 'laboratory':
          yeast.laboratory = fermentableProperty.textContent
          break
        case 'notes':
          yeast.notes = fermentableProperty.textContent
          break
        case 'product_id':
          yeast.productId = fermentableProperty.textContent
          break
        case 'min_temperature':
          yeast.minTemperature = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'max_temperature':
          yeast.maxTemperature = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'best_for':
          yeast.bestFor = fermentableProperty.textContent
          break
        case 'times_cultured':
          yeast.timesCultured = parseInt(fermentableProperty.textContent)
          break
        case 'max_reuse':
          yeast.maxReuse = parseInt(fermentableProperty.textContent)
          break
        case 'add_to_secondary':
          yeast.addToSecondary = fermentableProperty.textContent.toLowerCase() === 'true'
          break
        case 'inventory':
          yeast.inventory = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'culture_date':
          yeast.cultureDate = fermentableProperty.textContent
          break
      }
    }
    out[j] = yeast
    j++
  }
  return out
}
