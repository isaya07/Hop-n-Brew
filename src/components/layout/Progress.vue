<template>
  <div class="progres" :style="style"></div>
</template>

<script>
export default {
  name: 'Progress',

  created () {
    this.start(100)
  },

  data () {
    return {
      show: true,
      percent: 0,
      state: {
        timer: null,
        cut: 0
      }
    }
  },
  computed: {
    style () {
      let style = {
        'width': this.percent + '%',
        'opacity': this.show ? 1 : 0
      }
      return style
    }
  },
  methods: {
    startTimer () {
      this.state.timer = setInterval(() => {
        this.increase(this.state.cut * Math.random())
        if (this.percent >= 100) {
          this.finish()
          // clearInterval(this.state.timer)
        }
      }, 100)
    },
    start (time) {
      this.percent = 0
      this.show = true
      this.state.cut = 10000 / Math.floor(time)
      this.startTimer()
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
    },
    pause () {
      clearInterval(this.state.timer)
    },
    play () {
      this.startTimer()
    },
    finish () {
      this.percent = 100
      clearInterval(this.state.timer)
      this.show = false
      this.state.timer = null
      setTimeout(() => {
        this.percent = 0
      }, 250)
    },
    progressGest (action) {
      switch (action) {
        case 'start':
          this.start(500)
          break
        case 'stop':
          this.finish()
          break
        case 'pause':
          this.pause()
          break
        case 'play':
          this.play()
          break
      }
    }
  },

  mounted () {
    this.$bus.$on('progress', this.progressGest)
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/bulma/sass/utilities/initial-variables";
@import "./node_modules/bulma/sass/utilities/derived-variables";

.progres {
  // margin-top: -3px;
  z-index: 999999;
  background-color: $primary;
  height: 3px;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s, opacity 0.3s;
  box-shadow: 0px 3px 8px rgba($black, 0.4);
}
</style>
