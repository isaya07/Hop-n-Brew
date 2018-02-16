<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal has-text-left">
      <label class="label">{{ type | capitalize }} :</label>
    </div>
    <div class="field-body">
      <div class="field is-expanded">
        <div class="field has-addons">
          <div class="control is-expanded">
            <search-select
              :options="profils"
              v-model="selected"
              placeholder="Select a style">
            </search-select>
          </div>
          <div class="control is-normal">
            <button class="button is-primary" @click="modalShow = true">
              <span class="icon">
                <icon :icon="['fas', 'folder-open']" />
              </span>
              <span>Select</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="modalShow"
      :title="type | capitalize"
      :okText='"Close"'
      :size='"large"'
      @close="modalShow = false"
      @cancel="modalShow = false"
      @ok="modalShow = false">
      <list
        :columns="columns"
        :type="type"
        :title="false"
        :search="true"
        :forSelection="true"
        @selected="listSelected">
      </list>
    </modal>
  </div>
</template>

<script>
import SearchSelect from 'components/ui/SearchSelect'

export default {
  name: 'profil-select',

  components: {
    SearchSelect,
    Modal: () => import('components/layout/Modal'),
    List: () => import('components/ui/list/List')
  },

  props: {
    profil: Object,
    type: String,
    columns: Array
  },

  data () {
    return {
      profils: [],
      modalShow: false
    }
  },

  firestore () {
    return {
      // Collection
      profils: this.$db.collection(this.type + 's')
      // Doc
      // ford: this.$db.collection('cars').doc('ford')
    }
  },

  computed: {
    selected: {
      get: function () {
        if (this.profil) return this.profil.name
        else return ''
      },
      set: function (value) {
        let test = this.search(value.name, 'name', this.profils)
        this.$emit('profil-change', test)
      }
    }
  },

  methods: {
    search (nameKey, prop, myArray) {
      for (let i = 0; i < myArray.length; i++) {
        if (myArray[i][prop] === nameKey) {
          return myArray[i]
        }
      }
    },
    listSelected (entry) {
      let test = this.search(entry.name, 'name', this.profils)
      this.$emit('profil-change', test)
      this.modalShow = false
    }
  }
}
</script>
