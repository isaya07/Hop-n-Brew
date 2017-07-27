import Utils from 'api/recettes/Utils'

export function importXML (xml, type, children) {
  let imports = {}
  let obj = {}
  let parser = new DOMParser()
  let doc = parser.parseFromString(xml, 'text/xml')
  let ref = doc.documentElement.childNodes || []
  ref.forEach((item, index) => {
    obj = {}
    if (item.nodeName.toLowerCase() === type) {
      let props = item.childNodes || []
      props.forEach(prop => {
        if (prop.nodeName !== '#text') {
          let propName = camelize(prop.nodeName)
          if (children && propName === children) {
            let arr = []
            let ref = prop.childNodes || []
            ref.forEach(function (child) {
              if (child.nodeName.toLowerCase() === 'mash_step') {
                let options = {}
                let childProps = child.childNodes || []
                childProps.forEach(function (childItem) {
                  if (childItem.nodeName !== '#text') {
                    let itemName = camelize(childItem.nodeName)
                    if (!isNaN(childItem.textContent)) {
                      options[itemName] = +childItem.textContent
                    } else {
                      options[itemName] = childItem.textContent
                    }
                  }
                })
                arr.push(options)
              }
            })
            obj[propName] = arr
          } else {
            if (!isNaN(prop.textContent)) {
              obj[propName] = +prop.textContent
            } else {
              obj[propName] = prop.textContent
            }
          }
        }
      })
      imports[index] = obj
    }
  })
  return imports
}

function childrenXML (child, ref) {
  let xml = ''
  xml += '<' + ref + '>\n'
  if (Utils.isType('array', child)) {
    for (let key in child) {
      let tag = ref.slice(0, -1)
      xml += '<' + tag + '>\n'
      for (let prop in child[key].toJSON()) {
        let ref2 = underscorize(prop).toUpperCase()
        xml += '<' + ref2 + '>' + htmlEncode(child[key][prop]) + '</' + ref2 + '>\n'
      }
      xml += '</' + tag + '>\n'
    }
  }

  xml += '</' + ref + '>\n'
  return xml
}

export function exportXML (obj, type, inRecipe = false) {
  let xml = '<?xml version="1.0" encoding="ISO-8859-1"?>\n'
  if (!inRecipe) xml += '<' + type.toUpperCase() + 'S>\n'
  xml += '<' + type.toUpperCase() + '>\n<VERSION>1</VERSION>\n'
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let ref1 = underscorize(key).toUpperCase()
      if (obj[key] && (Utils.isType('array', obj[key]) || Utils.isType('object', obj[key]))) {
        xml += childrenXML(obj[key], ref1)
      } else {
        xml += '<' + ref1 + '>' + htmlEncode(obj[key]) + '</' + ref1 + '>\n'
      }
    }
  }
  xml += '</' + type.toUpperCase() + '>\n'
  if (!inRecipe) xml += '</' + type.toUpperCase() + 'S>'
  return xml
}

export function camelize (str) {
  return str
    .replace(/^[_.\- ]+/, '')
    .toLowerCase()
    .replace(/[_.\- ]+(\w|$)/g, (m, p1) => p1.toUpperCase())
}

export function underscorize (str) {
  return str.replace(/\.?([A-Z]+)/g, function (x, y) {
    return '_' + y.toLowerCase()
  }).replace(/^_/, '')
}

export function htmlEncode (str) {
  let c = {
    '<': '&#139;',
    '>': '&#155;',
    '&': '&#38;',
    '"': '&#34;',
    "'": '&#39;',
    '#': '&#35;',
    'è': '&#232;',
    'é': '&#233;',
    'ô': '&#244;',
    'â': '&#226;',
    'ç': '&#231;',
    'à': '&#224;',
    '°': '&#176;',
    'û': '&#251;'
  }
  return String(str).replace(/[<&>'"#èéôâçàû]/g, function (s) { return c[s] || s })
}
