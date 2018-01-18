<template>
  <div class='grid'>
    <div class='col is-1-3'>
      <h5>Mash</h5>
    </div>
    <div class="is-1-3 col">
      <div class="select is-flex-grow-4">
        <select v-model="selectedMash" @input="selectMash($event.target.value)">
          <option v-for="option in mashs" v-bind:value="option.name" :key="option.name">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="col is-1-3">
      <import @import="importPress">Import</import>
      <button @click="exportPress">Export</button>
      <button @click="savePress">Save</button>
      <button @click="deletePress">Delete</button>
    </div>
    <div class='col is-full grid-4 small-2 middle'>
      <div class="is-1-6 col">
        <label>Name:</label>
      </div>
      <div class="is-1-3 col">
        <input v-model.number="recepice.mash.name" type="text" placeholder="Name">
      </div>
      <div class="is-1-6 col">
        <label>Grain temp:</label>
      </div>
      <div class="is-1-6 col">
        <input v-model.number="recepice.mash.grainTemp" type="text">
      </div>
      <div class="is-1-6 col">
        °{{$config.tempUnitie}}
      </div>
      <div class="is-1-6 col">
        <label>Tun temp:</label>
      </div>
      <div class="is-1-6 col">
        <input v-model.number="recepice.mash.tunTemp" type="text">
      </div>
      <div class="is-1-6 col">
        °{{$config.tempUnitie}}
      </div>
      <div class="is-1-2 col">
        <label class="checkbox">
          Adjust temp equipment
          <input type="checkbox" v-model="recepice.mash.equipAdjust">
        </label>
      </div>
      <div class="is-1-6 col">
        <label>Sparge temp:</label>
      </div>
      <div class="is-1-6 col">
        <input v-model.number="recepice.mash.spargeTemp" type="text">
      </div>
      <div class="is-1-6 col">
        °{{$config.tempUnitie}}
      </div>
      <div class="is-1-6 col">
        <label>Sparge vol:</label>
      </div>
      <div class="is-1-6 col">
        <input v-model.number="recepice.mash.spargeVol" type="text">
      </div>
      <div class="is-1-6 col">
        {{$config.volUnitie.toUpperCase()}}
      </div>
    </div>
    <div class='col is-1-2'>
      <button @click="addStep"><i class="fa fa-plus"></i>Add Step</button>
    </div>
    <div class="grid card invert">
    <item v-for="(step, index) in recepice.mash.mashSteps"
      :key="index"
      :id="index"
      class="col is-full">
      <input class="is-flex-grow-2" type="text" v-model="step.name" placeholder="Step name">
      <div class="select is-flex-grow-4">
        <select v-model="step.type">
          <option v-for="option in typeSelect" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <input class="is-flex-grow-1" type="text" v-model.number="step.stepTemp" placeholder="Step temperature">
      <div class="select is-flex-grow-4">
        <select v-model="$config.tempUnitie">
          <option v-for="option in unitList.temp" :value=option :key="option">
            °{{ option }}
          </option>
        </select>
      </div>
      <input class="is-flex-grow-1" type="text" v-model.number="step.stepTime" placeholder="Step time">
      <div class="select is-flex-grow-4">
        <select v-model="$config.timeUnitie">
          <option v-for="option in unitList.time" :key=option>
            {{ option }}
          </option>
        </select>
      </div>
      <button class="btn last" @click="removeStep(index)"><i class="fa fa-trash-o"></i><span class="desktop-only">Remove</span></button>
      <div class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Ramp Time:</label>
        </div>
        <div class="col is-1-3">
          <input type="text" v-model.number="step.rampTime">
        </div>
        <div class="col is-1-3">
          {{$config.timeUnitie}}
        </div>
      </div>
      <div class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Warter Grain Ratio:</label>
        </div>
        <div class="col is-1-3">
          <input type="text" v-model.number="step.waterGrainRatio">
        </div>
        <div class="col is-1-3">
          {{$config.ratioUnitie}}
        </div>
      </div>
      <div v-if="step.type == 'Decoction'" class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Decoction Amount:</label>
        </div>
        <div class="col is-1-3">
          <input type="text" v-model.number="step.decoctionAmt">
        </div>
        <div class="col is-1-3">
          {{$config.volUnitie.toUpperCase()}}
        </div>
      </div>
      <div v-if="step.type == 'Infusion'" class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Infuse Amount:</label>
        </div>
        <div class="col is-1-3">
          <input type="text" v-model.number="step.infuseAmount">
        </div>
        <div class="col is-1-3">
          {{$config.volUnitie.toUpperCase()}}
        </div>
      </div>
      <div v-if="step.type == 'Infusion'" class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Infuse Temp:</label>
        </div>
        <div class="col is-1-3">
          <input type="text" v-model.number="step.infuseTemp">
        </div>
        <div class="col is-1-3">
          °{{$config.tempUnitie}}
        </div>
      </div>
      <div class="item-data col middle grid-2" slot="content">
        <div class="col is-1-3">
          <label>Description:</label>
        </div>
        <div class="col is-2-3">
          <input type="text" v-model.number="step.description">
        </div>
      </div>
    </item>
    </div>
    <div class="col is-full">
      <area-chart :chartData="chartData" :width="500" :height="150" :xLabel="'min'" :yLabel="'°' + $config.tempUnitie"></area-chart>
    </div>
    <div class="col is-full">
      <label class="label">Mash Notes:</label>
      <textarea class="" v-model="recepice.mash.notes"></textarea>
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
    AreaChart
  },

  mounted () {
    // this.$db.sync('mashs', 'http://localhost:5984/mashs')
    this.$db.gets('mashs').then(rows => {
      this.mashs = rows
    }).catch(err => {
      console.log(err)
    })
  },

  data () {
    return {
      contentVisible: false,
      selectedMash: this.mashName,
      mashs: [],
      unitList: this.$config.getUnitiesList()
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
      for (item in imports) {
        let data = imports[item]
        data['_id'] = data.name
        this.$db.put('mashs', data, {force: false}).then(() => {
          this.$notification.success(data.name + ' successfully imported')
        }).catch(err => {
          error = true
          this.$notification.error('Import of ' + data.name + ' failed: ' + err)
          console.error('Import of ' + data.name + ' failed: ' + err)
        })
        number++
      }
      if (!error) this.$notification.success(number + ' mash profile successfully imported')

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
      this.$db.remove('mashs', this.recepice.mash).then(response => {
        console.log(response)
        this.$notification.success(name + ' successfully removed')
        this.selectedMash = ''
      }).catch(err => {
        this.$notification.error('Remove of ' + name + ' failed: ' + err)
        console.error('Remove of ' + name + ' failed: ' + err)
      })
    }
  }
}
</script>
