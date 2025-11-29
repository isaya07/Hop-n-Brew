<template>
  <button 
    :class="['button', sizeClass, typeClass, { 'is-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loader"></span>
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
  size?: 'small' | 'normal' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'normal',
  loading: false,
  disabled: false
});

const emit = defineEmits<{
  click: [event: MouseEvent]
}>();

const sizeClass = computed(() => {
  if (props.size === 'small') return 'is-small';
  if (props.size === 'medium') return 'is-medium';
  if (props.size === 'large') return 'is-large';
  return 'is-normal';
});

const typeClass = computed(() => {
  if (props.type) return `is-${props.type}`;
  return '';
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
 display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>