import Utils from './Utils'

export function importXml (xml, type, func) {
  let parser = new DOMParser()
  let doc = parser.parseFromString(xml, 'text/xml')
  importNodes(doc.documentElement, type, func)
}

export function importNodes (nodes, type, func) {
  let ref = nodes.childNodes || []
  ref.forEach((item) => {
    if (item.nodeName.toLowerCase() === type) {
      let props = item.childNodes || []
      props.forEach(func)
    }
  })
}

export function importXML (xml, type) {
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
          if (!isNaN(prop.textContent)) {
            obj[propName] = Utils.roundDecimal(prop.textContent, 3)
          } else {
            obj[propName] = prop.textContent
          }
        }
      })
      imports[index] = obj
    }
  })
  return imports
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
