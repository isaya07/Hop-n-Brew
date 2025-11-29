<template>
  <Card :header="title" size="large">
    <form @submit.prevent="handleSubmit">
      <Input
        v-model="form.name"
        label="Nom de la recette"
        placeholder="Ex: IPA américaine"
        icon="fas fa-beer"
        :error="errors.name"
      />
      
      <Textarea
        v-model="form.description"
        label="Description"
        placeholder="Décrivez votre recette..."
        :error="errors.description"
      />
      
      <Select
        v-model="form.style"
        label="Style de bière"
        :options="beerStyles"
        placeholder="Sélectionnez un style"
        :error="errors.style"
      />
      
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <Button 
            type="primary" 
            :loading="loading"
            :disabled="loading"
          >
            <i class="fas fa-save"></i> &nbsp; Enregistrer
          </Button>
        </div>
        <div class="control">
          <Button 
            type="light" 
            @click="handleCancel"
          >
            Annuler
          </Button>
        </div>
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Textarea from '@/components/base/Textarea.vue';
import Select from '@/components/base/Select.vue';
import Button from '@/components/base/Button.vue';

interface Recipe {
  id?: number;
  name: string;
  description?: string;
  style?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  recipe?: Recipe;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Formulaire de recette'
});

const emit = defineEmits<{
  submit: [recipe: Recipe]
  cancel: []
}>();

const loading = ref(false);
const errors = reactive<Record<string, string>>({});

const form = reactive<Recipe>({
  name: '',
  description: undefined,
  style: undefined,
  createdAt: new Date(),
  updatedAt: new Date()
});

onMounted(() => {
  if (props.recipe) {
    Object.assign(form, props.recipe);
  }
});

const beerStyles = [
  { value: 'pale-ale', label: 'Pale Ale' },
  { value: 'ipa', label: 'IPA' },
  { value: 'stout', label: 'Stout' },
  { value: 'porter', label: 'Porter' },
  { value: 'lager', label: 'Lager' },
  { value: 'pilsner', label: 'Pilsner' },
 { value: 'wheat', label: 'Blanche' },
  { value: 'sour', label: 'Sour' }
];

const validate = (): boolean => {
  let isValid = true;
  errors.name = '';
  errors.description = '';
  errors.style = '';
  
  if (!form.name.trim()) {
    errors.name = 'Le nom est requis';
    isValid = false;
  }
  
  if (form.description && form.description.length > 500) {
    errors.description = 'La description est trop longue (max 500 caractères)';
    isValid = false;
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validate()) return;
  
  loading.value = true;
 try {
    emit('submit', { ...form });
  } finally {
    loading.value = false;
 }
};

const handleCancel = () => {
  emit('cancel');
};
</script>