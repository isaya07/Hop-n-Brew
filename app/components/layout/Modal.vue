<template>
  <transition name="modal">
    <div class="modal animated is-active">
      <div class="modal-background" @click="close"></div>
      <div class ="modal-card" :class="size">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">{{ title }}</p>
          <button class="delete" aria-label="close" @click="close"></button>          
        </header>
        <section class="modal-card-body" @keydown.27="close">
          <slot name="header">
          </slot>
          <slot></slot>
        </section>
        <footer  class="modal-card-foot">
          <button v-if="cancelText !== ''" type="button" class="button is-warning is-pulled-right" @click="cancel">{{ cancelText }}</button>
          <button v-if="okText !== ''" type="button" class="button is-primary is-pulled-right" @click="ok">{{ okText }}</button>
        </footer >
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
