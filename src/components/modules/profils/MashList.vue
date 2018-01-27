<template>
  <div class='columns is-multiline is-mobile"'>
    <div class='column is-2'>
      <h5 class="label">Profils:</h5>
    </div>
    <div class="column is-4">
      <div class="select is-fullwidth">
        <select v-model="selectedMash" @input="selectMash($event.target.value)">
          <option v-for="option in mashs" v-bind:value="option.name" :key="option.name">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-6">
      <div class="columns is-1">
        <div class="column is-narrow">
          <import @import="importPress">Import</import>
        </div>
        <div class="column is-narrow">
          <button class="button" @click="exportPress">Export</button>
        </div>
        <div class="column is-narrow">
          <button class="button" @click="savePress">Save</button>
        </div>
        <div class="column is-narrow">
          <button class="button" @click="deletePress">Delete</button>
        </div>
      </div>      
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
          <label class="checkbox">
            Adjust temp equipment
            <input type="checkbox" v-model="recepice.mash.equipAdjust">
          </label>
        </div>
        <div class="column is-4">
          <v-input label="Sparge temp" v-model.number="recepice.mash.spargeTemp"></v-input>
        </div>
        <div class="column is-2">
          °{{$config.tempUnitie}}
        </div>
        <div class="column is-4">
          <v-input label="Sparge vol" v-model.number="recepice.mash.spargeVol"></v-input>
        </div>
        <div class="column is-2">
          {{$config.volUnitie.toUpperCase()}}
        </div>
      </div>
    </div>
    <div class='column is-full'>
      <button class="button" @click="addStep"><i class="fa fa-plus"></i>Add Step</button>
    </div>
    <div class="columns is-multiline is-mobile card">
      <item v-for="(step, index) in recepice.mash.mashSteps"
        :key="index"
        :id="index"
        class="column is-full">
        <div class="control is-expanded">
          <input class="input" type="text" v-model="step.name" placeholder="Step name">
        </div>
        <div class="control">
          <div class="select">
            <select v-model="step.type">
              <option v-for="option in typeSelect" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <input class="input" type="text" v-model.number="step.stepTemp" placeholder="Step temperature">
        </div>
        <div class="control">
          <div class="select">
            <select v-model="$config.tempUnitie">
              <option v-for="option in unitList.temp" :value=option :key="option">
                °{{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <input class="input" type="text" v-model.number="step.stepTime" placeholder="Step time">
        </div>
        <div class="control">
          <div class="select">
            <select v-model="$config.timeUnitie">
              <option v-for="option in unitList.time" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="control">
          <button class="button" @click="removeStep(index)"><i class="fa fa-trash-o"></i><span class="desktop-only">Remove</span></button>
        </div>
        <div class="columns" slot="content">
          <div class="column is-4">
            <v-input label="Ramp Time" v-model.number="step.rampTime"></v-input>
          </div>
          <div class="column is-2">
            {{$config.timeUnitie}}
          </div>
          <div class="column is-2">
            <label>Warter Grain Ratio:</label>
          </div>
          <div class="column is-2">
            <input class="input" type="text" v-model.number="step.waterGrainRatio">
          </div>
          <div class="column is-2">
            {{$config.ratioUnitie}}
          </div>
        </div>
        <div v-if="step.type == 'Decoction'" class="columns" slot="content">
          <div class="column is-2">
            <label>Decoction Amount:</label>
          </div>
          <div class="column is-2">
            <input class="input" type="text" v-model.number="step.decoctionAmt">
          </div>
          <div class="column is-2">
            {{$config.volUnitie.toUpperCase()}}
          </div>
        </div>
        <div v-else-if="step.type == 'Infusion'" class="columns" slot="content">
          <div class="column is-2">
            <label>Infuse Amount:</label>
          </div>
          <div class="column is-2">
            <input class="input" type="text" v-model.number="step.infuseAmount">
          </div>
          <div class="column is-2">
            {{$config.volUnitie.toUpperCase()}}
          </div>
          <div class="column is-2">
            <label>Infuse Temp:</label>
          </div>
          <div class="column is-2">
            <input class="input" type="text" v-model.number="step.infuseTemp">
          </div>
          <div class="column is-2">
            °{{$config.tempUnitie}}
          </div>
        </div>
        <div class="columns" slot="content">
          <div class="column is-2">
            <label>Description:</label>
          </div>
          <div class="column is-10">
            <input class="input" type="text" v-model.number="step.description">
          </div>
        </div>
      </item>
    </div>
    <div class="column is-full">
      <area-chart :chartData="chartData" :width="500" :height="150" :xLabel="'min'" :yLabel="'°' + $config.tempUnitie"></area-chart>
    </div>
    <div class="column is-full">
      <v-textarea label="Mash Notes" v-model="recepice.mash.notes"></v-textarea>
    </div>
  </div>
</template>

<script>
import Item from 'components/ui/Item'
import Mash from 'api/recettes/Mash'
import MashStep from 'api/recettes/MashStep'
import Chart from 'components/ui/Chart'
import Import from 'components/ui/Import'
// import Config from 'api/recettes/Config'
// import Utils from 'api/recettes/Utils'
import AreaChart from 'components/ui/AreaChart'
import VTextarea from 'components/ui/base/Textarea'
import VInput from 'components/ui//base/Input'

export default {
  name: 'mash-list',

  props: {
    recepice: Object,
    mashName: ''
  },

  components: {
    Chart,
    Item,
    Import,
    AreaChart,
    VTextarea,
    VInput
  },

  data () {
    return {
      contentVisible: false,
      selectedMash: this.mashName,
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
          temp = mashsteps[i].stepTemp
          time = time + mashsteps[i].stepTime
        }
        data.push({x: time, y: temp})
      }
      return data
    }
  },

  methods: {
    selectMash (value) {
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
      let test = new Mash(this.$config, Object.assign(mash, {recipe: this.recepice}))
      this.recepice.mash = test
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
