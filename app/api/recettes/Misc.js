// const typeList = ['Spice', 'Fining', 'Water Agent', 'Herb', 'Flavor', 'Other']
// const useList = ['Boil', 'Mash', 'Primary', 'Secondary', 'Bottling']

export default class Misc {
  constructor (options) {
    this.name = ''
    this.type = ''
    this.use = ''
    this.time = null
    this.amount = null
    this.amountIsWeight = false
    this.useFor = ''
    this.notes = ''
    this.displayAmount = ''
    this.inventory = ''
    this.displayTime = ''
    if (options) {
      Object.assign(this, options)
    }
  }

  /* toJSON () {
  } */
}
