<template>
  <div class="card" :class="{ [sizeClass]: true, 'brew-card': true }">
    <div v-if="header || $slots.header" class="card-header">
      <header class="card-header-title">
        <slot name="header">{{ header }}</slot>
      </header>
      <a v-if="!noControls" href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  header?: string;
  noControls?: boolean;
  size?: 'small' | 'normal' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  noControls: false,
  size: 'normal'
});

const sizeClass = computed(() => {
  if (props.size === 'small') return 'is-small';
  if (props.size === 'medium') return 'is-medium';
  if (props.size === 'large') return 'is-large';
  return '';
});
</script>

<style scoped>
.brew-card {
  border-left: 4px solid var(--brew-primary, #d2691e);
}
</style>