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
    play () {
      this.state.timer = setInterval(() => {
        this.increase(this.state.cut * Math.random())
        if (this.percent > 95) {
          this.finish()
          clearInterval(this.state.timer)
        }
      }, 100)
    },
    finish () {
      this.percent = 100
      clearInterval(this.state.timer)
      this.state.timer = null
      this.show = false
      // setTimeout(() => { this.percent = 0 }, 500)
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
