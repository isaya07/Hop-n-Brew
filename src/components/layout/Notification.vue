<template>
<transition name="fade">
  <div v-if="message" class="message" :class="classes">
    <div class="message-header">
      <p class="is-capitalized">{{message.type}}</p>
      <button class="delete" aria-label="delete" @click="remove(message)"></button>
    </div>
    <div class="message-body" >
      {{ message.text }}
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 'v-notif',

  props: {
    timeout: {
      type: Number,
      default: 5000
    }
  },

  data () {
    return {
      // type: '',
      // items: []
    }
  },

  computed: {
    classes () {
      if (this.message) {
        switch (this.message.type) {
          case 'succes':
            return 'is-success'
          case 'info':
            return 'is-info'
          case 'error':
            return 'is-danger'
          default:
            return 'is-primary'
        }
      } else {
        return ''
      }
    },
    message () {
      return this.$store.getters.message
    }
  },

  methods: {
    /* success (message, option = {}) { this.add(message, {theme: 'success', timeout: option.timeout}) },
    primary (message, option = {}) { this.add(message, {theme: 'primary', timeout: option.timeout}) },
    warning (message, option = {}) { this.add(message, {theme: 'warning', timeout: option.timeout}) },
    error (message, option = {}) { this.add(message, {theme: 'alert', timeout: option.timeout}) },
    add (message, {theme, timeout}) {
      if (!this.$parent) {
        this.$mount()
        document.body.appendChild(this.$el)
      }
      let item = {message, theme, key: `${Date.now()}-${Math.random()}`}
      this.items.push(item)
      setTimeout(() => this.remove(item), timeout || this.timeout)
    }, */
    remove (item) {
      this.$store.dispatch('clearMessage')
      /* let i = this.items.indexOf(item)
      if (i >= 0) {
        this.items.splice(i, 1)
      } */
    }
  },

  watch: {
    message (val) {
      if (val && val.type && val.type !== 'error') {
        setTimeout(() => this.remove(val), this.timeout)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.message {
  position: fixed;
  margin: 1em;
  right: 0;
  z-index: 100;
}
/* @mixin varient($color) {
  background: rgba($color, 0.7);
  border-color: color;
}

.notification {
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 999;
  padding: 1rem;

  .item {
    // margin-bottom: 10px;
    padding: 1rem;
    transition: all .3s ease;
    @include varient($light-grey);
    border-radius: $global-radius;
    box-shadow: 1px 1px 8px rgba($black, 0.3), 1px 1px 8px rgba(black, 0.3) inset;
    width: 400px;
    &.success {
      @include varient($success-color);
    }
    &.warning {
      @include varient($warning-color);
    }
    &.alert {
      @include varient($alert-color);
    }
    &.primary {
      @include varient($primary-color);
    }

    .btn-clear {
      position: relative;
      background: transparent;
      border: 0;
      right: -0.2rem;
      top: -1.2rem;
      color: $text-color;
      opacity: .8;
      font-size: 20px;
      text-decoration: none;
      // text-shadow: 0 1px 0 rgba($black, 0.2);
      float: right;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
} */
</style>
