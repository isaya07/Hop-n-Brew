<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Recettes</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="showAddRecipeForm = true">
          <i class="fas fa-plus"></i> &nbsp; Nouvelle recette
        </Button>
      </div>
    </div>

    <!-- Formulaire d'ajout/édition de recette -->
    <div v-if="showAddRecipeForm" class="modal is-active">
      <div class="modal-background" @click="showAddRecipeForm = false"></div>
      <div class="modal-content">
        <RecipeForm 
          :recipe="currentRecipe"
          @submit="handleRecipeSubmit"
          @cancel="handleCancel"
        />
      </div>
      <button 
        class="modal-close is-large" 
        aria-label="close"
        @click="showAddRecipeForm = false"
      ></button>
    </div>

    <!-- Liste des recettes -->
    <div class="columns is-multiline">
      <div 
        v-for="recipe in recipes" 
        :key="recipe.id"
        class="column is-one-third"
      >
        <Card>
          <template #header>
            <div class="level">
              <div class="level-left">
                <span>{{ recipe.name }}</span>
              </div>
              <div class="level-right">
                <Button size="small" type="light" @click="editRecipe(recipe)">
                  <i class="fas fa-edit"></i>
                </Button>
                <Button size="small" type="danger" @click="deleteRecipe(recipe.id!)">
                  <i class="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </template>
          
          <p v-if="recipe.description">{{ recipe.description }}</p>
          <p v-else><em>Aucune description</em></p>
          
          <div class="tags">
            <span v-if="recipe.style" class="tag is-info">{{ recipe.style }}</span>
            <span class="tag is-light">{{ formatDate(recipe.createdAt) }}</span>
          </div>
        </Card>
      </div>
    </div>

    <!-- Message si aucune recette -->
    <div v-if="recipes.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucune recette trouvée</p>
      <p class="is-size-6 has-text-grey">Commencez par créer votre première recette</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';
import { IApiRecipe } from '@/lib/api/types';
import Card from '@/components/base/Card.vue';
import Button from '@/components/base/Button.vue';
import RecipeForm from '@/components/ui/RecipeForm.vue';

const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const showAddRecipeForm = ref(false);
const currentRecipe = ref<IApiRecipe | null>(null);

onMounted(async () => {
  await recipesStore.fetchRecipes();
});

const recipes = computed(() => recipesStore.allRecipes);

const editRecipe = (recipe: IApiRecipe) => {
  currentRecipe.value = recipe;
  showAddRecipeForm.value = true;
};

const deleteRecipe = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    const result = await recipesStore.deleteRecipe(id);
    if (!result.success) {
      console.error('Erreur lors de la suppression de la recette:', result.error);
    }
  }
};

const handleRecipeSubmit = async (recipe: IApiRecipe) => {
  let result;
  
  if (recipe.id) {
    // Mise à jour
    result = await recipesStore.updateRecipe(recipe.id, recipe);
  } else {
    // Création
    result = await recipesStore.createRecipe(recipe);
  }
  
  if (result.success) {
    showAddRecipeForm.value = false;
    currentRecipe.value = null;
  } else {
    console.error('Erreur lors de l\'enregistrement de la recette:', result.error);
  }
};

const handleCancel = () => {
  showAddRecipeForm.value = false;
  currentRecipe.value = null;
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