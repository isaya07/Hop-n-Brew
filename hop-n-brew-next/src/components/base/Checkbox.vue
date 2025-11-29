<template>
  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input
          v-model="modelValueRef"
          type="checkbox"
          :disabled="disabled"
          :readonly="readonly"
        />
        <span class="checkbox-label">
          <slot></slot>
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
 modelValue: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>();

const modelValueRef = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<style scoped>
.checkbox-label {
  margin-left: 0.5rem;
}
</style>