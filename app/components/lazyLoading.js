export default (name, index = false) => () => import(`../${name}${index ? '/index' : ''}.vue`)
