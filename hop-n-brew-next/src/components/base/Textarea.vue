<template>
  <div class="field">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <div class="control">
      <textarea
        :id="id"
        :class="['textarea', sizeClass, { 'is-danger': error }]"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        @input="handleInput"
        @blur="handleBlur"
      ></textarea>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
    <p v-else-if="help" class="help">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  help?: string;
  size?: 'small' | 'normal' | 'medium' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false,
  readonly: false,
  rows: 4
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>();

const id = computed(() => `textarea-${uuidv4()}`);

const sizeClass = computed(() => {
  if (props.size === 'small') return 'is-small';
  if (props.size === 'medium') return 'is-medium';
  if (props.size === 'large') return 'is-large';
  return '';
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>