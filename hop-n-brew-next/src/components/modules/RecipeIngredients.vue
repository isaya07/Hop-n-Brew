<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Ingrédients de recette</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="addIngredient">
          <i class="fas fa-plus"></i> &nbsp; Ajouter ingrédient
        </Button>
      </div>
    </div>

    <div class="tabs">
      <ul>
        <li :class="{ 'is-active': activeTab === 'fermentables' }" @click="activeTab = 'fermentables'">
          <a>Fermentescibles</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'hops' }" @click="activeTab = 'hops'">
          <a>Houblons</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'yeasts' }" @click="activeTab = 'yeasts'">
          <a>Levures</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'miscs' }" @click="activeTab = 'miscs'">
          <a>Divers</a>
        </li>
      </ul>
    </div>

    <!-- Tableau des fermentescibles -->
    <div v-if="activeTab === 'fermentables'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Type</th>
            <th>Couleur (SRM)</th>
            <th>Rendement</th>
            <th>Utilisation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fermentable in recipe?.fermentables || []" :key="fermentable.name">
            <td>{{ fermentable.name }}</td>
            <td>{{ fermentable.amount }} {{ fermentable.displayAmount ? `(${fermentable.displayAmount})` : '' }}</td>
            <td>{{ fermentable.type }}</td>
            <td>{{ fermentable.color?.toFixed(1) || '-' }}</td>
            <td>{{ fermentable.yield?.toFixed(1) || '-' }}%</td>
            <td>{{ fermentable.addAfterBoil ? 'Post-ébullition' : 'Ébullition' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('fermentable', fermentable)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('fermentable', fermentable.name!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des houblons -->
    <div v-if="activeTab === 'hops'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Alpha</th>
            <th>Utilisation</th>
            <th>Temps</th>
            <th>Forme</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hop in recipe?.hops || []" :key="hop.name">
            <td>{{ hop.name }}</td>
            <td>{{ hop.amount }} {{ hop.displayAmount ? `(${hop.displayAmount})` : '' }}</td>
            <td>{{ hop.alpha?.toFixed(1) || '-' }}%</td>
            <td>{{ hop.use || '-' }}</td>
            <td>{{ hop.time || '-' }} min</td>
            <td>{{ hop.form || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('hop', hop)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('hop', hop.name!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des levures -->
    <div v-if="activeTab === 'yeasts'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Type</th>
            <th>Forme</th>
            <th>Atténuation</th>
            <th>Température</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="yeast in recipe?.yeasts || []" :key="yeast.name">
            <td>{{ yeast.name }}</td>
            <td>{{ yeast.amount }} {{ yeast.displayAmount ? `(${yeast.displayAmount})` : '' }}</td>
            <td>{{ yeast.type || '-' }}</td>
            <td>{{ yeast.form || '-' }}</td>
            <td>{{ yeast.attenuation?.toFixed(1) || '-' }}%</td>
            <td>{{ yeast.fermentationTemp || '-' }}°C</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('yeast', yeast)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('yeast', yeast.name!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des ingrédients divers -->
    <div v-if="activeTab === 'miscs'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Type</th>
            <th>Utilisation</th>
            <th>Temps</th>
            <th>Utilisation pour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="misc in recipe?.miscs || []" :key="misc.name">
            <td>{{ misc.name }}</td>
            <td>{{ misc.amount }} {{ misc.displayAmount ? `(${misc.displayAmount})` : '' }}</td>
            <td>{{ misc.type || '-' }}</td>
            <td>{{ misc.use || '-' }}</td>
            <td>{{ misc.time || '-' }} min</td>
            <td>{{ misc.useFor || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('misc', misc)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('misc', misc.name!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune donnée -->
    <div v-if="currentIngredients.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun {{ activeTab }} dans cette recette</p>
      <p class="is-size-6 has-text-grey">Commencez par ajouter des ingrédients</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';
import { IApiRecipe } from '@/lib/api/types';
import { IFermentable, IHop, IYeast, IMisc } from '@/lib/recipes/types';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const activeTab = ref('fermentables');
const recipeId = ref<number | null>(null);

const currentIngredients = computed(() => {
  const currentRecipe = recipesStore.recipeById(recipeId.value!);
  switch(activeTab.value) {
    case 'fermentables': return currentRecipe?.fermentables || [];
    case 'hops': return currentRecipe?.hops || [];
    case 'yeasts': return currentRecipe?.yeasts || [];
    case 'miscs': return currentRecipe?.miscs || [];
    default: return [];
  }
});

const recipe = computed(() => {
  if (recipeId.value) {
    return recipesStore.recipeById(recipeId.value);
  }
  return null;
});

const loadRecipe = async () => {
  recipeId.value = parseInt(route.params.id as string);
  if (recipeId.value) {
    // Charger la recette via le store
    await recipesStore.fetchRecipeById(recipeId.value);
  }
};

const addIngredient = () => {
  router.push(`/recipes/${recipeId.value}/ingredients/new`);
};

const editIngredient = (type: string, ingredient: any) => {
  router.push(`/recipes/${recipeId.value}/ingredients/${type}/${ingredient.name}`);
};

const deleteIngredient = async (type: string, name: string) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer cet ingrédient ${type}?`)) {
    // Dans une implémentation complète, on gérerait la suppression d'ingrédients
    // Pour l'instant, on recharge la recette
    if (recipeId.value) {
      await loadRecipe();
    }
  }
};

// Charger la recette au montage
onMounted(() => {
  loadRecipe();
});
</script>