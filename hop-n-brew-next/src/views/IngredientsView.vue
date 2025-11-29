<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Ingrédients</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="showAddIngredientForm = true">
          <i class="fas fa-plus"></i> &nbsp; Nouvel ingrédient
        </Button>
      </div>
    </div>

    <!-- Formulaire d'ajout/édition d'ingrédient -->
    <div v-if="showAddIngredientForm" class="modal is-active">
      <div class="modal-background" @click="showAddIngredientForm = false"></div>
      <div class="modal-content">
        <Card header="Formulaire d'ingrédient">
          <form @submit.prevent="handleIngredientSubmit">
            <Input
              v-model="form.name"
              label="Nom de l'ingrédient"
              placeholder="Ex: Malt Pilsen"
              icon="fas fa-wheat-alt"
              :error="errors.name"
            />
            
            <Select
              v-model="form.type"
              label="Type d'ingrédient"
              :options="ingredientTypes"
              placeholder="Sélectionnez un type"
              :error="errors.type"
            />
            
            <Textarea
              v-model="form.attributes.description"
              label="Description"
              placeholder="Décrivez l'ingrédient..."
              :error="errors.description"
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
      </div>
      <button 
        class="modal-close is-large" 
        aria-label="close"
        @click="showAddIngredientForm = false"
      ></button>
    </div>

    <!-- Liste des ingrédients -->
    <div class="columns is-multiline">
      <div 
        v-for="ingredient in ingredients" 
        :key="ingredient.id"
        class="column is-one-third"
      >
        <Card>
          <template #header>
            <div class="level">
              <div class="level-left">
                <span>{{ ingredient.name }}</span>
              </div>
              <div class="level-right">
                <Button size="small" type="light" @click="editIngredient(ingredient)">
                  <i class="fas fa-edit"></i>
                </Button>
                <Button size="small" type="danger" @click="deleteIngredient(ingredient.id!)">
                  <i class="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </template>
          
          <p><strong>Type:</strong> {{ ingredient.type }}</p>
          <p v-if="ingredient.attributes.description">{{ ingredient.attributes.description }}</p>
          <p v-else><em>Aucune description</em></p>
          
          <div class="tags">
            <span class="tag is-info">{{ ingredient.type }}</span>
            <span class="tag is-light">{{ formatDate(ingredient.createdAt) }}</span>
          </div>
        </Card>
      </div>
    </div>

    <!-- Message si aucun ingrédient -->
    <div v-if="ingredients.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun ingrédient trouvé</p>
      <p class="is-size-6 has-text-grey">Commencez par ajouter vos premiers ingrédients</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useIngredientsStore } from '@/stores/ingredients';
import { IIngredient } from '@/lib/database';
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Select from '@/components/base/Select.vue';
import Textarea from '@/components/base/Textarea.vue';
import Button from '@/components/base/Button.vue';

const ingredientsStore = useIngredientsStore();

const showAddIngredientForm = ref(false);
const currentIngredient = ref<IIngredient | null>(null);
const loading = ref(false);
const errors = ref<Record<string, string>>({});

const form = ref({
  name: '',
  type: '' as 'fermentable' | 'hop' | 'yeast' | 'misc' | 'water',
  attributes: {
    description: ''
  }
});

const ingredientTypes = [
  { value: 'fermentable', label: 'Fermentable' },
  { value: 'hop', label: 'Houblon' },
  { value: 'yeast', label: 'Levure' },
  { value: 'misc', label: 'Divers' },
  { value: 'water', label: 'Eau' }
];

onMounted(async () => {
  await ingredientsStore.fetchFermentables();
  await ingredientsStore.fetchHops();
  await ingredientsStore.fetchYeasts();
  await ingredientsStore.fetchMiscs();
  await ingredientsStore.fetchWaters();
});

const ingredients = computed(() => {
  // Combiner tous les types d'ingrédients
  return [
    ...ingredientsStore.allFermentables,
    ...ingredientsStore.allHops,
    ...ingredientsStore.allYeasts,
    ...ingredientsStore.allMiscs,
    ...ingredientsStore.allWaters
  ];
});

const editIngredient = (ingredient: IIngredient) => {
  currentIngredient.value = ingredient;
  form.value = {
    name: ingredient.name,
    type: ingredient.type,
    attributes: ingredient.attributes || { description: '' }
  };
  showAddIngredientForm.value = true;
};

const deleteIngredient = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) {
    // On ne sait pas de quel type est l'ingrédient, donc on essaie de le supprimer de tous les stores
    // Cette fonctionnalité devra être adaptée en fonction de la structure réelle des données
    // Pour l'instant, on suppose qu'on peut détecter le type à partir de l'objet ingredient
    let result;
    switch(form.value.type) {
      case 'fermentable':
        result = await ingredientsStore.deleteFermentable(id);
        break;
      case 'hop':
        result = await ingredientsStore.deleteHop(id);
        break;
      case 'yeast':
        result = await ingredientsStore.deleteYeast(id);
        break;
      case 'misc':
        result = await ingredientsStore.deleteMisc(id);
        break;
      case 'water':
        result = await ingredientsStore.deleteWater(id);
        break;
      default:
        console.error('Type d\'ingrédient inconnu');
        return;
    }
    
    if (!result.success) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', result.error);
    }
  }
};

const validate = (): boolean => {
  let isValid = true;
  errors.value = {};
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Le nom est requis';
    isValid = false;
  }
  
  if (!form.value.type) {
    errors.value.type = 'Le type est requis';
    isValid = false;
  }
  
  return isValid;
};

const handleIngredientSubmit = async () => {
  if (!validate()) return;
  
  loading.value = true;
  try {
    let result;
    
    if (currentIngredient.value && currentIngredient.value.id) {
      // Mise à jour
      switch(form.value.type) {
        case 'fermentable':
          result = await ingredientsStore.updateFermentable(currentIngredient.value.id, {
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'hop':
          result = await ingredientsStore.updateHop(currentIngredient.value.id, {
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'yeast':
          result = await ingredientsStore.updateYeast(currentIngredient.value.id, {
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'misc':
          result = await ingredientsStore.updateMisc(currentIngredient.value.id, {
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'water':
          result = await ingredientsStore.updateWater(currentIngredient.value.id, {
            ...form.value,
            ...form.value.attributes
          });
          break;
        default:
          console.error('Type d\'ingrédient inconnu');
          return;
      }
    } else {
      // Création
      switch(form.value.type) {
        case 'fermentable':
          result = await ingredientsStore.addFermentable({
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'hop':
          result = await ingredientsStore.addHop({
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'yeast':
          result = await ingredientsStore.addYeast({
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'misc':
          result = await ingredientsStore.addMisc({
            ...form.value,
            ...form.value.attributes
          });
          break;
        case 'water':
          result = await ingredientsStore.addWater({
            ...form.value,
            ...form.value.attributes
          });
          break;
        default:
          console.error('Type d\'ingrédient inconnu');
          return;
      }
    }
    
    if (result.success) {
      showAddIngredientForm.value = false;
      currentIngredient.value = null;
      form.value = {
        name: '',
        type: '' as 'fermentable' | 'hop' | 'yeast' | 'misc' | 'water',
        attributes: { description: '' }
      };
    } else {
      console.error('Erreur lors de l\'enregistrement de l\'ingrédient:', result.error);
    }
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  showAddIngredientForm.value = false;
  currentIngredient.value = null;
  form.value = {
    name: '',
    type: '' as 'fermentable' | 'hop' | 'yeast' | 'misc' | 'water',
    attributes: { description: '' }
  };
};

const formatDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};
</script>