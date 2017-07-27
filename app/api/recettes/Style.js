import { DOMParser } from 'xmldom'

export default class Style {
  constructor (options) {
    if (options) {
      this.name = null
      this.category = null
      this.categoryNumber = null
      this.styleLetter = null
      this.styleGuide = null
      this.type = null
      this.typeList = ['Lager', 'Ale', 'Mead', 'Wheat', 'Mixed', 'Cider']
      this.ogMin = null
      this.ogMax = null
      this.fgMin = null
      this.fgMax = null
      this.ibuMin = null
      this.ibuMax = null
      this.colorMin = null
      this.colorMax = null
      this.carbMin = null
      this.carbMax = null
      this.abvMin = null
      this.abvMax = null
      this.notes = null
      this.profile = null
      this.ingredients = null
      this.examples = null
      this.displayOgMin = null
      this.displayOgMax = null
      this.displayFgMin = null
      this.displayFgMax = null
      this.displayColorMin = null
      this.displayColorMax = null
      this.ogRange = null
      this.fgRange = null
      this.ibuRange = null
      this.carbRange = null
      this.colorRange = null
      this.abvRange = null
      Object.assign(this, options)
    }
  }

  static fromXml = xml => {
    let j = 0
    let out = {}
    let style
    var parser = new DOMParser()
    var doc = parser.parseFromString(xml, 'text/xml')
    console.log(doc)
    let ref = doc.documentElement.childNodes || []
    for (let i = 0; i < ref.length; i++) {
      var noeud = ref[ i ]
      if (noeud.nodeName.toLowerCase() !== 'style') {
        continue
      }
      let ref2 = noeud.childNodes || []
      style = new Style()
      for (let m = 0; m < ref2.length; m++) {
        var styleProperty = ref2[m]
        switch (styleProperty.nodeName.toLowerCase()) {
          case 'name':
            style.name = styleProperty.textContent
            break
          case 'category':
            style.category = styleProperty.textContent
            break
          case 'category_number':
            style.categoryNumber = styleProperty.textContent
            break
          case 'style_letter':
            style.styleLetter = styleProperty.textContent
            break
          case 'style_guide':
            style.styleGuide = styleProperty.textContent
            break
          case 'type':
            style.type = styleProperty.textContent
            break
          case 'og_min':
            style.ogMin = parseFloat(styleProperty.textContent).toFixed(3)
            break
          case 'og_max':
            style.ogMax = parseFloat(styleProperty.textContent).toFixed(3)
            break
          case 'fg_min':
            style.fgMin = parseFloat(styleProperty.textContent).toFixed(3)
            break
          case 'fg_max':
            style.fgMax = parseFloat(styleProperty.textContent).toFixed(3)
            break
          case 'ibu_min':
            style.ibuMin = parseFloat(styleProperty.textContent).toFixed()
            break
          case 'ibu_max':
            style.ibuMax = parseFloat(styleProperty.textContent).toFixed()
            break
          case 'color_min':
            style.colorMin = parseFloat(styleProperty.textContent).toFixed()
            break
          case 'color_max':
            style.colorMax = parseFloat(styleProperty.textContent).toFixed()
            break
          case 'carb_min':
            style.carbMin = parseFloat(styleProperty.textContent).toFixed(1)
            break
          case 'carb_max':
            style.carbMax = parseFloat(styleProperty.textContent).toFixed(1)
            break
          case 'abv_min':
            style.abvMin = parseFloat(styleProperty.textContent).toFixed(1)
            break
          case 'abv_max':
            style.abvMax = parseFloat(styleProperty.textContent).toFixed(1)
            break
          case 'profile':
            style.profile = styleProperty.textContent
            break
          case 'ingredients':
            style.ingredients = styleProperty.textContent
            break
          case 'notes':
            style.notes = styleProperty.textContent
            break
          case 'examples':
            style.examples = styleProperty.textContent
            break
          case 'display_og_min':
            style.displayOgMin = styleProperty.textContent
            break
          case 'display_og_max':
            style.displayOgMax = styleProperty.textContent
            break
          case 'display_fg_min':
            style.displayFgMin = styleProperty.textContent
            break
          case 'display_fg_max':
            style.displayFgMax = styleProperty.textContent
            break
          case 'display_color_min':
            style.displayColorMin = styleProperty.textContent
            break
          case 'display_color_max':
            style.displayColorMax = styleProperty.textContent
            break
          case 'og_range':
            style.ogRange = styleProperty.textContent
            break
          case 'fg_range':
            style.fgRange = styleProperty.textContent
            break
          case 'ibu_range':
            style.ibuRange = styleProperty.textContent
            break
          case 'carb_range':
            style.carbRange = styleProperty.textContent
            break
          case 'color_range':
            style.colorRange = styleProperty.textContent
            break
          case 'abv_range':
            style.abvRange = styleProperty.textContent
            break
        }
      }
      console.log(style)
      out[j] = style
      j++
    }
    return out
  }

  /* toJSON () {
  } */
}
