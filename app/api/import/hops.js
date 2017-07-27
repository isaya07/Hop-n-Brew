import { DOMParser } from 'xmldom'

export default function fromBeerXml (xml) {
  var i
  var j = 0
  var m
  var len
  var len1
  var out = {}
  var hop
  var parser = new DOMParser()
  var doc = parser.parseFromString(xml, 'text/xml')
  var ref2 = doc.documentElement.childNodes || []
  for (i = 0, len = ref2.length; i < len; i++) {
    var noeud = ref2[ i ]
    if (noeud.nodeName.toLowerCase() !== 'hop') {
      continue
    }
    var ref6 = noeud.childNodes || []
    hop = {}
    for (m = 0, len1 = ref6.length; m < len1; m++) {
      var fermentableProperty = ref6[ m ]
      switch (fermentableProperty.nodeName.toLowerCase()) {
        case 'name':
          hop.name = fermentableProperty.textContent
          break
        case 'type':
          hop.type = fermentableProperty.textContent
          break
        case 'amount':
          hop.amount = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
        case 'alpha':
          hop.alpha = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'beta':
          hop.beta = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'use':
          hop.use = fermentableProperty.textContent
          break
        case 'origin':
          hop.origin = fermentableProperty.textContent
          break
        case 'substitutes':
          hop.substitutes = fermentableProperty.textContent
          break
        case 'notes':
          hop.notes = fermentableProperty.textContent
          break
        case 'form':
          hop.form = fermentableProperty.textContent
          break
        case 'hsi':
          hop.hsi = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'time':
          hop.time = parseInt(fermentableProperty.textContent)
          break
        case 'humulene':
          hop.humulene = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'caryophyllene':
          hop.caryophyllene = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'cohumulone':
          hop.cohumulone = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'myrcene':
          hop.myrcene = parseFloat(fermentableProperty.textContent).toFixed(1)
          break
        case 'inventory':
          hop.inventory = parseFloat(fermentableProperty.textContent).toFixed(2)
          break
      }
    }
    out[j] = hop
    j++
  }
  return out
}
