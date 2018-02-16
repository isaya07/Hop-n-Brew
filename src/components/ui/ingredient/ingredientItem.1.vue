<template>
<div class="column is-full">
<div class="columns is-mobile is-gapless">
  <div class="column is-narrow">
    <button class="button is-success" @click="contentVisible = !contentVisible">
      <span class="icon is-small">
        <icon :icon="contentVisible ? ['fas', 'minus'] : ['fas', 'plus']" />
      </span>
    </button>
  </div>
  <div class="column">
    <div class="columns is-multiligne is-mobile is-gapless">
      <div class="column">
        <input class="input" type="text" v-model="ingredient.name" readonly>
      </div>
      <div class="column">
        <input class="input" type="text" v-model.number="ingredient.amount">
      </div>
      <div class="column is-narrow" v-if="type === 'fermentable'">
        <div class="select">
          <select v-model="weightSelected">
            <option v-for="option in unitList.weight" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div class="column is-narrow" v-else-if="type === 'hop'">
        <div class="select">
          <select v-model="hopSelected">
            <option v-for="option in unitList.weight" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div class="column is-narrow" v-else-if="type === 'yeast'">
        <div class="select">
          <select v-model="yeastSelected">
            <option v-for="option in unitList.yeast" :key="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <template v-if="type === 'hop'">
        <div class="column">
          <input class="input" type="text" v-model.number="ingredient.time">
        </div>
        <div class="column is-narrow">
          <div class="select">
            <select v-model="timeSelected">
              <option v-for="option in unitList.time" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-narrow">
          <div class="select">
            <select v-model="ingredient.use">
              <option v-for="option in useSelect" :key="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </template>

    </div>
  </div>
  <div class="column is-narrow">
    <button class="button is-danger" @click="deleteIngredient(type, ingredient)">
      <span class="icon is-small">
        <icon :icon="['fas', 'trash']" />
      </span>
      <span class="is-hidden-touch">Remove</span>
    </button>
  </div>
</div>
<transition name="fade">
  <div v-if="contentVisible" class="card">
    <div class="card-content">
      <ingredient-detail :ingredient="ingredient" :notShow="['name', 'amount', 'time', 'use']" slot="content"></ingredient-detail>
    </div>
  </div>
</transition>
</div>
</template>

<script>
import Hop from 'api/recettes/Hop'
import Item from 'components/ui/Item'
import VInput from 'components/ui/base/Input'
import VTextarea from 'components/ui/base/Textarea'

export default {
  name: 'ingredientItem',

  components: {
    Item,
    IngredientDetail: () => import('components/ui/IngredientDetail'),
  },

  props: {
    ingredient: Object,
    type: String
  },

  data () {
    return {
      unitList: this.$config.getUnitiesList(),
      useSelect: Hop.getUseList(),
      weightSelected: this.$config.weightUnitie,
      hopSelected: this.$config.hopUnitie,
      yeastSelected: this.$config.yeastUnitie,
      timeSelected: this.$config.timeUnitie,
      contentVisible: false
    }
  },

  methods: {
    deleteIngredient (type, ingredient) {
      this.$emit('delete', type, ingredient)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  // width: auto;
  min-width: 0;
  // overflow: hidden;

  select {
  // min-width: 2rem;
    min-width: 0;
    overflow: hidden;
    &:not([mutiple]) {
      padding-right: 2em;
    }
  }
  &:not(.is-multiple)::after {
    right: 1em;
    min-width: 0;
  }
}

.flex-shrink-2 {
  min-width: 0;
  flex: 1 1 auto;
}

.flex-shrink {
  flex: 1 1.5 auto;
}
.flex-expend {
  flex: 2 0.5 auto;
  
}
</style>
