<template>
  <div class='columns is-multiline is-mobile"'>
    <div class='column is-6'>
      <div class="field is-horizontal">
        <div class="field-label is-normal has-text-left">
          <label class="label">Profils :</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <div class="select is-fullwidth">
                <select v-model="selectedMash" @input="selectMash($event.target.value)">
                  <option disabled value="">Please select one</option>
                  <option v-for="option in mashsList" :value="option" :key="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-6">
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <import @import="importPress">Import</import>
        </div>
        <div class="control">
          <button class="button is-info" @click="exportPress">
            <span class="icon is-small">
              <icon :icon="['fas', 'download']" />
            </span>
            <span>Export</span>
          </button>
        </div>
        <div class="control">
          <button class="button is-success" @click="savePress">
            <span class="icon is-small">
              <icon :icon="['fas', 'save']" />
            </span>
            <span>Save</span>
          </button>
        </div>
        <div class="control">
          <button class="button is-danger" @click="deletePress">
            <span class="icon is-small">
              <icon :icon="['fas', 'trash']" />
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
    <div class='column is-full'>
      <div class="is-divider"></div>
    </div>
    <div class='column is-full'>
      <div class="columns is-multiline is-mobile">
        <div class="column is-6">
          <v-input label="Name" v-model="recepice.mash.name"></v-input>
        </div>
        <div class="column is-4">
          <v-input label="Grain temp" v-model.number="recepice.mash.grainTemp"></v-input>
        </div>
        <div class="column is-2">
          °{{$config.tempUnitie}}
        </div>
        <div class="column is-4">
          <v-input label="Tun temp" v-model.number="recepice.mash.tunTemp"></v-input>
        </div>
        <div class="column is-2">
          °{{$config.tempUnitie}}
        </div>
        <div class="column is-6">
          <v-checkbox label="Adjust temp equipment" v-model="recepice.mash.equipAdjust" :rules="''"></v-checkbox>
        </div>
        <div class="column is-4">
          <v-input label="Sparge temp" v-model.number="recepice.mash.spargeTemp"></v-input>
        </div>
        <div class="column is-2">
          °{{$config.tempUnitie}}
        </div>
        <div class="column is-4">
          <v-input label="Sparge vol" v-model.number="spargeVol" readonly></v-input>
        </div>
        <div class="column is-2">
          {{$config.volUnitie.toUpperCase()}}
        </div>
      </div>
    </div>
    <div class='column is-full'>
      <button class="button is-info" @click="addStep">
        <span class="icon is-small">
          <icon :icon="['fas', 'plus']" />
        </span>
        <span>Add Step</span>
      </button>
    </div>
    <div class='column is-full'>
      <div class="columns is-multiline is-mobile box">
        <mash-step-item v-for="steps in mashSteps" :key="steps.name" :mashStep="steps"></mash-step-item>
      </div>
    </div>
    <div class="column is-full">
      <area-chart :chartData="chartData" :width="600" :height="240" :xLabel="'min'" :yLabel="'°' + $config.tempUnitie"></area-chart>
    </div>
    <div class="column is-full">
      <v-textarea label="Mash Notes" v-model="recepice.mash.notes"></v-textarea>
    </div>
  </div>
</template>

<script>
import Mash from 'api/recettes/Mash'
import MashStep from 'api/recettes/MashStep'

import MashStepItem from 'components/modules/mashs/MashStepItem'
import Chart from 'components/ui/Chart'
import Import from 'components/ui/Import'
// import Config from 'api/recettes/Config'
// import Utils from 'api/recettes/Utils'
import AreaChart from 'components/ui/AreaChart'
import VTextarea from 'components/ui/base/Textarea'
import VInput from 'components/ui//base/Input'
import VCheckbox from 'components/ui/base/Checkbox'
import VSelect from 'components/ui/base/Select'

export default {
  name: 'mash-list',

  props: {
    recepice: Object,
    mashName: ''
  },

  components: {
    Chart,
    MashStepItem,
    Import,
    AreaChart,
    VTextarea,
    VInput,
    VCheckbox,
    VSelect
  },

  data () {
    return {
      contentVisible: false,
      selectedMash: '',
      mashs: [],
      unitList: this.$config.getUnitiesList()
    }
  },

  firestore() {
    return {
        // Collection
        mashs: this.$db.collection('mashs'),
        // Doc
        // ford: this.$db.collection('cars').doc('ford')
    }
  },

  computed: {
    mashsList () {
      let list = []
      for (let i in this.mashs) {
        list.push(this.mashs[i].name)
      }
      return list
    },
    typeSelect () {
      return MashStep.getTypeList()
    },
    chartData () {
      let mashsteps = this.recepice.mash.mashSteps
      let data = []
      let time = 0
      let temp = 0
      if (mashsteps && mashsteps.length !== 0) {
        for (let i = 0; i < mashsteps.length; i++) {
          if (mashsteps[i].rampTime !== 0) {
            data.push({x: time, y: temp})
            time = time + mashsteps[i].rampTime
          }
          data.push({x: time, y: mashsteps[i].stepTemp})
          // temp = mashsteps[i].stepTemp
          time = time + mashsteps[i].stepTime
          data.push({x: time, y: mashsteps[i].endTemp})
          temp = mashsteps[i].endTemp
        }
        // data.push({x: time, y: temp})
      }
      return data
    },
    spargeVol: {
      get: function () {
        return this.recepice.mash.getSpargeVol(this.$config.volUnitie)
      },
      set: function (value) {
        // this.recipe.setBatchSize(value, this.$config.volUnitie)
      }
    },
    mashSteps () {
      return this.recepice.mash.getMashSteps()
    }
  },

  methods: {
    selectMash (value) {
      console.log('value :', value)
      this.selectedMash = value
      let mash
      for (let i = 0; i < this.mashs.length; i++) {
        if (this.mashs[i].name === value) mash = this.mashs[i]
      }
      // console.log(mash)
      /* this.$pouch.get('mashs', value).then((doc) => {
        console.log(doc)
      }).catch((err) => {
        console.error(err)
      }) */
      // let test = new Mash(this.$config, Object.assign(mash, {recipe: this.recepice}))
      // this.recepice.mash = test
      this.recepice.setMash(mash)
      this.recepice.mash.id = mash.id
      // console.log(test)
    },
    // toggleContent (comp) {
    // console.log(this.mashs)
    // },
    addStep () {
      // console.log(this.selectedMash)
      this.recepice.mash.add()
    },
    removeStep (id) {
      this.recepice.mash.remove(id)
    },
    importPress (xml) {
      // this.selectedMash = ''
      let item
      let number = 0
      let error = false
      let imports = Mash.fromBeerXml(xml)
      let data
      for (item in imports) {
        data = imports[item]
        number++
        this.$firestoreRefs.mashs.add(data).catch(err => {
          error = err
        })
        if (error) break
      }
      if (error) {
        this.$store.commit('setMessage', {type: 'error', text: 'Import of ' + data.name + ' failed: ' + error})
        console.error('Import of ' + data.name + ' failed: ' + error)
      }
      if ( !error && number > 1 ) {
        this.$store.commit('setMessage', {type: 'succes', text: number + ' mashs profile successfully imported'})
      } else if (!error) {
        this.$store.commit('setMessage', {type: 'succes', text: data.name + 'mash profile successfully imported'})
      }

      // this.recepice.mash = Mash.fromBeerXml(xml, this.recepice, this.$config)
      // console.log(this.recepice.mash)
    },
    exportPress () {
      let xml = this.recepice.mash.toBeerXml()
      let pom = document.createElement('a')
      pom.setAttribute('href', 'data:text/xml,' + encodeURIComponent(xml))
      pom.setAttribute('download', this.recepice.mash.name + '.xml')
      if (document.createEvent) {
        var event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        pom.dispatchEvent(event)
      } else {
        pom.click()
      }
    },
    savePress () {
      let mash = JSON.parse(JSON.stringify(this.recepice.mash))
      if (this.recepice.mash['_id'] && this.recepice.mash['_rev']) {
        let rev = { _id: this.recepice.mash['_id'], _rev: this.recepice.mash['_rev'] }
        mash = Object.assign(mash, rev)
      }
      // console.log('SAVEPRESS', mash)
      if (mash['_id'] != null) {
        this.$db.put('mashs', mash).then(response => {
          console.log(response)
          this.$notification.success(mash.name + ' successfully updated')
        }).catch(err => {
          this.$notification.error('Update of ' + mash.name + ' failed: ' + err)
          console.error('Update of ' + mash.name + ' failed: ' + err, err)
        })
      } else {
        mash._id = mash.name
        this.$db.put('mashs', mash).then(response => {
          console.log(response)
          this.$notification.success(mash.name + ' successfully created ')
        }).catch(err => {
          this.$notification.error('Creation of ' + mash.name + ' failed: ' + err)
          console.error('Creation of ' + mash.name + ' failed: ' + err, err)
        })
      }
    },
    deletePress () {
      // console.log(this.mashs)
      // console.log(this.this.selectedmash)
      let name = this.recepice.mash.name
      this.$firestoreRefs.mashs.doc(this.recepice.mash.id).delete().then(result => {
        this.$store.commit('setMessage', {type: 'succes', text: name + ' successfully removed'})
      }).catch(err => {
        this.$store.commit('setMessage', {type: 'error', text: 'Remove of ' + name + ' failed: ' + err})
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    }
  }
}
</script>
