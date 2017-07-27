<template>
  <div>
    <modal
      :visible="visible"
      :title="title"
      :cancelText="textcancel"
      :okText="textok"
      @close="close"
      @cancel="cancel"
      @ok="close" transition="zoom">
      <div class="content">
        <table-list
          :colName="colName"
          :ingredientsData="ingredientsData"
          :title="title"
          :butAdd="butAdd"
          @add="add">
        </table-list>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from 'layout/Modal'
import TableList from './TableList'

export default {
  name: 'modallist',

  components: {
    Modal,
    TableList
  },

  props: {
    title: String,
    visible: Boolean,
    types: String,
    butAdd: {
      type: Boolean,
      default: false
    },
    colName: Array,
    ingredientsData: Array
  },

  data () {
    const data = {
      // columns: this.colName,
      // addBut: this.butAdd,
      textok: 'Close',
      textcancel: 'Cancel'
    }
    return data
  },

  methods: {
    add (entry) {
      var type
      if (this.title.search('fermentable') !== -1) {
        type = 'fermentable'
      } else if (this.title.search('hop') !== -1) {
        type = 'hop'
      } else if (this.title.search('yeast') !== 1) {
        type = 'yeast'
      }
      this.$emit('add', type, entry)
    },
    cancel () {
      this.$emit('cancel')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">

.title .icon.is-angle.asc {
  transform: rotate(180deg);
}
</style>
