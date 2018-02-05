<template>
<div>
  <div class="tabs is-boxed is-fullwidth columns is-multiline is-mobile ">
    <ul role="tablist" class="column is-full is-paddingless">
      <li v-for="(tab, index) in tabs" :key="index"
        role="tab"
        :class="{ 'is-active': tab.isActive, 'is-disabled': tab.disabled}"
        :aria-selected="tab.isActive ? 'true' : 'false'"
        :aria-expanded="tab.isActive ? 'true' : 'false'"
        :aria-disabled="tab.disabled ? 'true' : 'false'"
        :aria-controls="tab.name.toLowerCase().replace(/ /g, '-')"
        @click="selectTab(index)">
        <a class="is-unselectable">
          <span :class="'icon'" v-if="tab.icon">
            <icon :icon="tab.icon" />
          </span>
          <span class="has-text-weight-bold">{{ tab.name }}</span>
        </a>
      </li>
    </ul>
  <div class="column is-full tab-content is-paddingless">
    <!-- <transition name="flip"> -->
      <slot></slot>
    <!-- </transition> -->
  </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Tabs',

  /* props: {
    selectedTab: {
      type: Number,
      default: -1
    },
  }, */

  data () {
    return {
      activeIndex: 0,
      tabs: []
    }
  },

  methods: {
    selectTab(index) {
      let selectedTab = this.tabs[index]
      if (! selectedTab) {
        return;
      }
      if (selectedTab.isDisabled) {
        return;
      }
      this.activeIndex = index
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name);
      })

      this.$emit('changed', { tab: selectedTab });

    }
  },

  created() {
    this.tabs = this.$children;
  },

  mounted() {
    this.selectTab(this.activeIndex)
  }
}
</script>

<style lang="scss" scoped>
/* appear at / disappear to */
.tabs-enter,
.tabs-leave-to { 
  opacity: 0;
 }

/* moving */
.tabs-move {
  transition: all 600ms ease-in-out 50ms;
}


/* .tabs-leave,
.tabs-enter-to { opacity: 1; height: 100%; } */

/* appearing */
.tabs-enter-active {
  transition: all 400ms ease-out;
}

/* disappearing */
.tabs-leave-active {
  transition: all 200ms ease-in;
}

.flip-enter-active {
  transition: all .2s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all .25s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter, .flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
