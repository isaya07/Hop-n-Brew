<template>
  <div class="file">
    <label class="file-label">
      <input @change="inputChange" class="file-input" type="file" name="file">
      <span class="file-cta">
        <span class="file-icon">
          <icon :icon="['fas', 'upload']" />
        </span>
        <span class="file-label">
          <slot></slot>
        </span>
      </span>
    </label>
  </div>
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
