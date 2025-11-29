<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">{{ recipe?.name || 'Détails de la recette' }}</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="editRecipe" v-if="recipe?.id">
          <i class="fas fa-edit"></i> &nbsp; Modifier
        </Button>
      </div>
    </div>

    <div class="columns">
      <!-- Colonne gauche - Informations générales -->
      <div class="column is-one-third">
        <Card title="Informations générales">
          <div class="content">
            <p><strong>Description:</strong> {{ recipe?.notes || '-' }}</p>
            <p><strong>Brasseur:</strong> {{ recipe?.brewer || '-' }}</p>
            <p><strong>Assistant brasseur:</strong> {{ recipe?.asstBrewer || '-' }}</p>
            <p><strong>Type:</strong> {{ recipe?.type || '-' }}</p>
            <p><strong>Style:</strong> {{ recipe?.style?.name || '-' }}</p>
            <p><strong>Date:</strong> {{ formatDate(recipe?.date) || '-' }}</p>
          </div>
        </Card>

        <Card title="Caractéristiques">
          <div class="content">
            <p><strong>OG:</strong> {{ recipe?.og?.toFixed(3) || '-' }}</p>
            <p><strong>FG:</strong> {{ recipe?.fg?.toFixed(3) || '-' }}</p>
            <p><strong>ABV:</strong> {{ recipe?.abv?.toFixed(1) || '-' }}%</p>
            <p><strong>IBU:</strong> {{ recipe?.ibu?.toFixed(1) || '-' }}</p>
            <p><strong>Couleur:</strong> {{ recipe?.estColor?.toFixed(1) || '-' }} SRM</p>
            <p><strong>Calories:</strong> {{ recipe?.calories?.toFixed(0) || '-' }}</p>
          </div>
        </Card>

        <Card title="Équipement">
          <div class="content">
            <p><strong>Nom:</strong> {{ recipe?.equipment?.name || '-' }}</p>
            <p><strong>Taille du lot:</strong> {{ recipe?.equipment?.batchSize || '-' }} L</p>
            <p><strong>Taille d'ébullition:</strong> {{ recipe?.equipment?.boilSize || '-' }} L</p>
            <p><strong>Temps d'ébullition:</strong> {{ recipe?.equipment?.boilTime || '-' }} min</p>
          </div>
        </Card>
      </div>

      <!-- Colonne droite - Ingrédients -->
      <div class="column">
        <!-- Fermentescibles -->
        <Card title="Fermentescibles">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Type</th>
                <th>Couleur (SRM)</th>
                <th>Rendement</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fermentable in recipe?.fermentables || []" :key="fermentable.name">
                <td>{{ fermentable.name }}</td>
                <td>{{ fermentable.amount }} {{ fermentable.displayAmount ? `(${fermentable.displayAmount})` : '' }}</td>
                <td>{{ fermentable.type }}</td>
                <td>{{ fermentable.color?.toFixed(1) || '-' }}</td>
                <td>{{ fermentable.yield?.toFixed(1) || '-' }}%</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <!-- Houblons -->
        <Card title="Houblons" class="mt-4">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Alpha</th>
                <th>Utilisation</th>
                <th>Temps</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hop in recipe?.hops || []" :key="hop.name">
                <td>{{ hop.name }}</td>
                <td>{{ hop.amount }} {{ hop.displayAmount ? `(${hop.displayAmount})` : '' }}</td>
                <td>{{ hop.alpha?.toFixed(1) || '-' }}%</td>
                <td>{{ hop.use || '-' }}</td>
                <td>{{ hop.time || '-' }} min</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <!-- Levures -->
        <Card title="Levures" class="mt-4">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Type</th>
                <th>Forme</th>
                <th>Atténuation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="yeast in recipe?.yeasts || []" :key="yeast.name">
                <td>{{ yeast.name }}</td>
                <td>{{ yeast.amount }} {{ yeast.displayAmount ? `(${yeast.displayAmount})` : '' }}</td>
                <td>{{ yeast.type || '-' }}</td>
                <td>{{ yeast.form || '-' }}</td>
                <td>{{ yeast.attenuation?.toFixed(1) || '-' }}%</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <!-- Ingrédients divers -->
        <Card title="Ingrédients divers" class="mt-4">
          <table class="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Quantité</th>
                <th>Type</th>
                <th>Utilisation</th>
                <th>Temps</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="misc in recipe?.miscs || []" :key="misc.name">
                <td>{{ misc.name }}</td>
                <td>{{ misc.amount }} {{ misc.displayAmount ? `(${misc.displayAmount})` : '' }}</td>
                <td>{{ misc.type || '-' }}</td>
                <td>{{ misc.use || '-' }}</td>
                <td>{{ misc.time || '-' }} min</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';
import { IApiRecipe } from '@/lib/api/types';
import Card from '@/components/base/Card.vue';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const recipeId = computed(() => parseInt(route.params.id as string));

onMounted(async () => {
  if (recipeId.value) {
    // Charger la recette via le store
    await recipesStore.fetchRecipeById(recipeId.value);
  }
});

const recipe = computed(() => {
  if (recipeId.value) {
    return recipesStore.recipeById(recipeId.value);
  }
  return null;
});

const editRecipe = () => {
  if (recipe.value?.id) {
    router.push(`/recipes/${recipe.value.id}/edit`);
  }
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};
</script>