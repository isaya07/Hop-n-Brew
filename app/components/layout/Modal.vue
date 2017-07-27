<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-overlay" @click="close"></div>
      <div class ="modal-content" :class="size">
        <div class="modal-header">
          <slot name="header">
            <h4 class="modal-title txtcenter">{{ title }}</h4>
          </slot>
          <a class="modal-close" @click="close">&times;</a>
        </div>
        <div class="modal-body" @keydown.27="close">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button v-if="cancelText !== ''" type="button" class="warning is-right" @click="cancel">{{ cancelText }}</button>
          <button v-if="okText !== ''" type="button" class="primary is-right" @click="ok">{{ okText }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',

  props: {
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: 'Valider'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },

  data () {
    return {
    }
  },

  methods: {
    ok () {
      this.$emit('ok')
    },
    cancel () {
      this.$emit('cancel')
    },
    close () {
      this.$emit('close')
    }
  },

  computed: {
    animationin: function () {
      if (this.animation) {
        return this.animation + '-in'
      }
      return ''
    },
    animationout: function () {
      if (this.animation) {
        return this.animation + '-out'
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/modal';
</style>
