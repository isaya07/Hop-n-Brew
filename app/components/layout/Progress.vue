<template>
  <div class="progress" :style="style"></div>
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
    start (time) {
      this.percent = 0
      this.show = true
      this.state.cut = 10000 / Math.floor(time)
      this.state.timer = setInterval(() => {
        this.increase(this.state.cut * Math.random())
        if (this.percent > 95) {
          this.finish()
          clearInterval(this.state.timer)
        }
      }, 100)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
    },
    pause () {
      clearInterval(this.state.timer)
    },
    finish () {
      this.percent = 100
      clearInterval(this.state.timer)
      this.state.timer = null
      this.show = false
      setTimeout(() => { this.percent = 0 }, 500)
    },
    progressGest (action) {
      switch (action) {
        case 'start':
          this.start(300)
          break
        case 'stop':
          this.finish()
          break
        case 'pause':
          this.pause()
          break
      }
    }
  },

  mounted () {
    this.$bus.$on('progress', this.progressGest)
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/settings';

.progress {
  margin-top: -3px;
  z-index: 999999;
  background-color: $primary-color;
  height: 3px;
  top: 0;
  left: 0;
  transition: width 0.3s, opacity 0.3s;
  box-shadow: 0px 3px 8px rgba($black, 0.4);
}
</style>
