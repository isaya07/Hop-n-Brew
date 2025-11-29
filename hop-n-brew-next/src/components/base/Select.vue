<template>
  <div class="field">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <div class="control">
      <div class="select" :class="{ 'is-fullwidth': fullwidth, [sizeClass]: true }">
        <select
          :id="id"
          :value="modelValue"
          :disabled="disabled"
          :multiple="multiple"
          @change="handleChange"
        >
          <option v-if="placeholder" value="">{{ placeholder }}</option>
          <option
            v-for="option in options"
            :key="getOptionKey(option)"
            :value="getOptionValue(option)"
            :selected="isSelected(option)"
          >
            {{ getOptionLabel(option) }}
          </option>
        </select>
      </div>
    </div>
    <p v-if="error" class="help is-danger">{{ error }}</p>
    <p v-else-if="help" class="help">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue: string | number | string[] | number[] | null;
  options: Array<Option | string>;
  label?: string;
  placeholder?: string;
  error?: string;
  help?: string;
  size?: 'small' | 'normal' | 'medium' | 'large';
  disabled?: boolean;
  multiple?: boolean;
  fullwidth?: boolean;
  valueKey?: string;
  labelKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  disabled: false,
  multiple: false,
  fullwidth: false,
  valueKey: 'value',
  labelKey: 'label'
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | string[] | number[]]
}>();

const id = computed(() => `select-${uuidv4()}`);

const sizeClass = computed(() => {
  if (props.size === 'small') return 'is-small';
  if (props.size === 'medium') return 'is-medium';
  if (props.size === 'large') return 'is-large';
  return '';
});

const getOptionValue = (option: Option | string): string | number => {
 if (typeof option === 'string') return option;
  return option[props.valueKey as keyof Option] as string | number;
};

const getOptionLabel = (option: Option | string): string => {
  if (typeof option === 'string') return option;
 return option[props.labelKey as keyof Option] as string;
};

const getOptionKey = (option: Option | string): string => {
  if (typeof option === 'string') return option;
 return `${option[props.valueKey as keyof Option]}`;
};

const isSelected = (option: Option | string): boolean => {
  const value = getOptionValue(option);
  if (props.multiple && Array.isArray(props.modelValue)) {
    return (props.modelValue as (string | number)[]).includes(value);
  }
  return props.modelValue === value;
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  
  if (props.multiple) {
    const selectedValues = Array.from(target.selectedOptions).map(option => option.value);
    emit('update:modelValue', selectedValues as string[] | number[]);
  } else {
    emit('update:modelValue', target.value);
  }
};
</script>