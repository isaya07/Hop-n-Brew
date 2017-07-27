<template>
    <label class="btn">
      <i class="fa fa-upload"></i>
      <input @change="inputChange" type="file" name="file" />
      <span>
        <slot></slot>
      </span>
    </label>
</template>

<script>
export default {
  data () {
    return {
      file: ''
    }
  },

  methods: {
    createInput (file) {
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.file = reader.result
        vm.$emit('import', vm.file)
      }
      reader.readAsText(file)
    },
    inputChange (e) {
      var file = e.target.files || e.dataTransfer.files
      if (!file.length) {
        return
      }
      this.createInput(file[0])
    }
  }
}
</script>

<style lang="scss">
  input[type="file"] {
    display:none;
  }

  /* label.marginless {
    margin: 0;
  } */
</style>
