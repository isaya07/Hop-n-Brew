<template>
  <div class="search-select select" @click="openOptions">
    <input type="text"
           class="search"
           autocomplete="off"
           tabindex="0"
           :value="searchText"
           @input="updatevalue($event.target.value)"
           ref="input"
           :placeholder="placeholder"
           @blur="blurInput"
           @keydown.up="prevItem"
           @keydown.down="nextItem"
           @keyup.enter="enterItem"
           @keydown.27="showMenu = false"/>

    <div class="menu"
      :class="{ 'active':showMenu, 'hidden':!showMenu }"
      ref="menu"
      @mousedown.prevent
      @keydown.prevent
      tabindex="-1">
      <div v-for="(option, idx) in filteredOptions"
        :key="idx"
        class="item"
        :class="{ 'selected': option.selected, 'current': pointer === idx }"
        @click.stop="selectItem(option)"
        @mousedown="mousedownItem"
        @mouseenter="pointerSet(idx)">
        {{option.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array
      },
      selectedOption: {
        type: Object
      },
      isError: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showMenu: false,
        searchText: this.selectedOption.name || '',
        // mousedownState: false, // mousedown on option menu
        pointer: 0
      }
    },
    watch: {
      filteredOptions () {
        this.pointerAdjust()
      },
      selectedOption (newName) {
        if (newName) this.searchText = newName.name
      }
    },
    computed: {
      textClass () {
        if (!this.selectedOption.name && this.placeholder) {
          return 'default'
        } else {
          return ''
        }
      },
      /* menuClass () {
        return {
          // visible: this.showMenu,
          hidden: !this.showMenu
        }
      }, */
      /* menuStyle () {
        return {
          display: this.showMenu ? 'block' : 'none'
        }
      }, */
      filteredOptions () {
        if (this.searchText) {
          return this.options.filter(option => {
            return option.name.match(new RegExp(this.searchText, 'i'))
          })
        } else {
          return this.options
        }
      }
    },
    methods: {
      updatevalue (value) {
        this.openOptions()
        this.searchText = value
      },
      deleteTextOrItem () {
        if (!this.searchText && this.selectedOption) {
          this.selectItem({})
          this.openOptions()
        }
      },
      openOptions () {
        this.$refs.input.focus()
        this.showMenu = true
        this.mousedownState = false
      },
      blurInput () {
        if (!this.mousedownState) {
          this.searchText = ''
          this.closeOptions()
        }
      },
      closeOptions () {
        this.showMenu = false
      },
      prevItem () {
        // set pointer
        const prevIndex = this.pointer - 1
        const prevIndexScrollTop = this.$el.offsetHeight * prevIndex
        console.log(this.$refs.menu.scrollTop)
        console.log(prevIndexScrollTop)
        if (prevIndex >= 0) {
          this.pointer = prevIndex
        }
        // move scroll
        // this.$refs.menu.scrollTop = prevIndexScrollTop
        const currentMenuHeight = this.$refs.menu.offsetHeight
        const currentPage = Math.ceil((this.$refs.menu.scrollTop + this.$el.offsetHeight) / currentMenuHeight)
        const itemPage = Math.ceil(prevIndexScrollTop / currentMenuHeight)

        if (currentPage !== itemPage) {
          this.$refs.menu.scrollTop = (itemPage - 1) * this.$refs.menu.offsetHeight
        }
      },
      nextItem () {
        // set pointer
        const nextIndex = this.pointer + 1
        const nextIndexScrollTop = this.$el.offsetHeight * nextIndex
        if (nextIndex <= (this.filteredOptions.length - 1)) {
          this.pointer = nextIndex
        }
        // move scroll
        // const totalHeight = self.filteredOptions.length * self.$el.offsetHeight
        // const totalPage = Math.ceil(totalHeight / pageSizeHeight)
        const currentMenuHeight = this.$refs.menu.offsetHeight
        const currentPage = Math.ceil((this.$refs.menu.scrollTop + this.$el.offsetHeight) / currentMenuHeight)
        const itemPage = Math.ceil(nextIndexScrollTop / currentMenuHeight)

        if (currentPage !== itemPage) {
          this.$refs.menu.scrollTop = (itemPage - 1) * this.$refs.menu.offsetHeight
        }
      },
      enterItem () {
        const currentItem = this.filteredOptions[this.pointer]
        console.log(currentItem)
        if (currentItem) {
          this.selectItem(currentItem)
        }
      },
      pointerSet (index) {
        this.pointer = index
      },
      pointerAdjust () {
        if (this.pointer >= this.filteredOptions.length - 1) {
          this.pointer = this.filteredOptions.length ? this.filteredOptions.length - 1 : 0
        }
      },
      mousedownItem () {
        this.mousedownState = true
      },
      selectItem (option) {
        this.$emit('select', option)
        // this.searchText = option.name
        this.closeOptions()
      }
    }
  }
</script>

<style lang="scss">
@import './../../assets/scss/settings';
.search-select {
  .menu {
    background-color: $white;
    border-bottom-left-radius: $global-radius;
    border-bottom-right-radius: $global-radius;
    border: 1px solid $light-grey;
    border-top: 0;
    overflow-y: scroll;
    height: 20rem;
    width: 100%;
    position: absolute;
    z-index: 1000;
    margin-top: $global-font-size-l * 2;
  }

  .menu:hover, .menu.active{
    border: 1px solid $primary-color;
    border-top: 0;
  }

  .menu > .item:hover {
    background: none transparent !important;
  }
  .menu > .item.current {
    background: rgba($black, 0.2) !important;
  }
}
</style>
