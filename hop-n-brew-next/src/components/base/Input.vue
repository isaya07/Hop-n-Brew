<template>
  <div class="field">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <div class="control has-icons-left">
      <input
        :id="id"
        :class="['input', sizeClass, { 'is-danger': error }]"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        @input="handleInput"
        @blur="handleBlur"
      />
      <span class="icon is-small is-left">
        <i :class="iconClass"></i>
      </span>
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
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date';
  label?: string;
  placeholder?: string;
  error?: string;
  help?: string;
  size?: 'small' | 'normal' | 'medium' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'normal',
  disabled: false,
  readonly: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
}>();

const id = computed(() => `input-${uuidv4()}`);

const sizeClass = computed(() => {
  if (props.size === 'small') return 'is-small';
  if (props.size === 'medium') return 'is-medium';
  if (props.size === 'large') return 'is-large';
  return '';
});

const iconClass = computed(() => {
  if (props.icon) return props.icon;
  if (props.type === 'email') return 'fas fa-envelope';
  if (props.type === 'password') return 'fas fa-lock';
  if (props.type === 'tel') return 'fas fa-phone';
  if (props.type === 'url') return 'fas fa-globe';
  if (props.type === 'search') return 'fas fa-search';
  return 'fas fa-font';
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>