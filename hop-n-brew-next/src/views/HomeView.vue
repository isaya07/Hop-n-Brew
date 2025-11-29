<template>
  <div class="container">
    <section class="section">
      <div class="content">
        <h1 class="title is-1 has-text-centered">Bienvenue sur Hop-n-Brew</h1>
        <p class="subtitle is-4 has-text-centered">Votre application de brassage de bière</p>
        
        <div class="columns is-centered">
          <div class="column is-half has-text-centered">
            <p class="mb-4">
              Gérez vos recettes, ingrédients et profils de brassage.
              L'application fonctionne entièrement hors ligne et synchronise vos données
              automatiquement quand vous êtes en ligne.
            </p>
            
            <div class="content" v-if="authStore.user">
              <p class="has-text-weight-semibold">Bonjour {{ authStore.user.name || authStore.user.email }} !</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <!-- Raccourcis vers les fonctionnalités principales -->
      <div class="container">
        <h2 class="title is-3 has-text-centered mb-6">Accès rapide</h2>
        <div class="columns is-multiline is-mobile is-centered">
          <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile" v-for="shortcut in shortcuts" :key="shortcut.title">
            <router-link :to="shortcut.route" class="box has-text-centered hover-effect">
              <div class="icon is-large mb-3">
                <i :class="shortcut.icon" class="fas fa-2x"></i>
              </div>
              <p class="title is-5">{{ shortcut.title }}</p>
              <p class="subtitle is-6">{{ shortcut.description }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <section class="section">
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <Card header="Recettes récentes">
              <ul class="is-size-6">
                <li v-for="recipe in recentRecipes" :key="recipe.id" class="mb-2">
                  <router-link :to="`/recipes/${recipe.id}`" class="has-text-info">
                    {{ recipe.name }}
                  </router-link>
                </li>
                <li v-if="recentRecipes.length === 0">
                  <em>Aucune recette récente</em>
                </li>
              </ul>
              <template #footer>
                <div class="card-footer-item">
                  <router-link to="/recipes" class="button is-primary is-fullwidth">
                    Voir toutes les recettes
                  </router-link>
                </div>
              </template>
            </Card>
          </div>

          <div class="column is-one-third">
            <Card header="Ingrédients récents">
              <ul class="is-size-6">
                <li v-for="ingredient in recentIngredients" :key="ingredient.id" class="mb-2">
                  <span class="has-text-weight-semibold">{{ ingredient.name }}</span>
                  <span class="tag is-small is-light ml-2">{{ ingredient.type }}</span>
                </li>
                <li v-if="recentIngredients.length === 0">
                  <em>Aucun ingrédient récent</em>
                </li>
              </ul>
              <template #footer>
                <div class="card-footer-item">
                  <router-link to="/ingredients" class="button is-primary is-fullwidth">
                    Voir tous les ingrédients
                  </router-link>
                </div>
              </template>
            </Card>
          </div>

          <div class="column is-one-third">
            <Card header="Statistiques">
              <div class="content">
                <p>
                  <span class="has-text-weight-semibold">Recettes:</span> 
                  <span class="is-pulled-right">{{ recipesCount }}</span>
                </p>
                <p>
                  <span class="has-text-weight-semibold">Ingrédients:</span> 
                  <span class="is-pulled-right">{{ ingredientsCount }}</span>
                </p>
                <p>
                  <span class="has-text-weight-semibold">États de synchronisation:</span> 
                  <span class="is-pulled-right">
                    <span :class="syncStatusClass">{{ syncStatusText }}</span>
                  </span>
                </p>
              </div>
              <template #footer>
                <div class="card-footer-item">
                  <button class="button is-info is-fullwidth" @click="syncData">
                    <span v-if="!syncing">
                      <i class="fas fa-sync-alt"></i> Synchroniser
                    </span>
                    <span v-else>
                      <i class="fas fa-spinner fa-spin"></i> Synchronisation...
                    </span>
                  </button>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRecipesStore } from '@/stores/recipes';
import { useIngredientsStore } from '@/stores/ingredients';
import { useAuthStore } from '@/stores/auth';
import Card from '@/components/base/Card.vue';

const recipesStore = useRecipesStore();
const ingredientsStore = useIngredientsStore();
const authStore = useAuthStore();

const syncStatus = ref<'idle' | 'syncing' | 'success' | 'error'>('idle');
const syncing = ref(false);

// Définition des raccourcis vers les fonctionnalités principales
const shortcuts = ref([
  {
    title: 'Recettes',
    description: 'Créer et gérer vos recettes',
    route: '/recipes',
    icon: 'fa-beer'
  },
  {
    title: 'Ingrédients',
    description: 'Gérer vos ingrédients',
    route: '/ingredients',
    icon: 'fa-cubes'
  },
  {
    title: 'Profils',
    description: 'Gérer vos profils',
    route: '/profiles',
    icon: 'fa-sliders-h'
  },
  {
    title: 'Brassage',
    description: 'Gérer vos brassages',
    route: '/mashs',
    icon: 'fa-thermometer-half'
  },
  {
    title: 'Nouvelle recette',
    description: 'Créer une nouvelle recette',
    route: '/recipes/new',
    icon: 'fa-plus-circle'
  }
]);

onMounted(async () => {
 // Charger les données via les stores
  await Promise.all([
    recipesStore.fetchRecipes(),
    ingredientsStore.fetchFermentables(),
    ingredientsStore.fetchHops(),
    ingredientsStore.fetchYeasts(),
    ingredientsStore.fetchMiscs(),
    ingredientsStore.fetchWaters()
  ]);
});

const recentRecipes = computed(() => {
  return [...recipesStore.allRecipes]
    .sort((a, b) => new Date(b.dateCreated || '').getTime() - new Date(a.dateCreated || '').getTime())
    .slice(0, 5);
});

const recentIngredients = computed(() => {
  // Combiner tous les types d'ingrédients et trier par date de création
  // Les ingrédients n'ont pas de propriété de date de création standard, donc on trie par ordre d'ajout (derniers en premier)
  const allIngredients = [
    ...ingredientsStore.allFermentables.map(ing => ({...ing, dateAdded: ing.name ? new Date().toISOString() : new Date().toISOString()})),
    ...ingredientsStore.allHops.map(ing => ({...ing, dateAdded: ing.name ? new Date().toISOString() : new Date().toISOString()})),
    ...ingredientsStore.allYeasts.map(ing => ({...ing, dateAdded: ing.name ? new Date().toISOString() : new Date().toISOString()})),
    ...ingredientsStore.allMiscs.map(ing => ({...ing, dateAdded: ing.name ? new Date().toISOString() : new Date().toISOString()})),
    ...ingredientsStore.allWaters.map(ing => ({...ing, dateAdded: ing.name ? new Date().toISOString() : new Date().toISOString()}))
  ];
  
  // Comme les ingrédients n'ont pas de propriété de date de création standard, on renvoie simplement les 5 derniers ajoutés
  return allIngredients.slice(0, 5);
});

const recipesCount = computed(() => recipesStore.allRecipes.length);

const ingredientsCount = computed(() => {
  return ingredientsStore.allFermentables.length +
         ingredientsStore.allHops.length +
         ingredientsStore.allYeasts.length +
         ingredientsStore.allMiscs.length +
         ingredientsStore.allWaters.length;
});

const syncData = async () => {
  syncing.value = true;
  syncStatus.value = 'syncing';
  
  try {
    // Utiliser la méthode de synchronisation du store de recettes
    await recipesStore.syncRecipes();
    syncStatus.value = 'success';
  } catch (error) {
    console.error('Erreur lors de la synchronisation:', error);
    syncStatus.value = 'error';
  } finally {
    syncing.value = false;
    setTimeout(() => {
      syncStatus.value = 'idle';
    }, 3000);
  }
};

const syncStatusClass = computed(() => {
  switch (syncStatus.value) {
    case 'success': return 'has-text-success';
    case 'error': return 'has-text-danger';
    case 'syncing': return 'has-text-info';
    default: return '';
  }
});

const syncStatusText = computed(() => {
  switch (syncStatus.value) {
    case 'success': return 'Synchronisé';
    case 'error': return 'Erreur';
    case 'syncing': return 'En cours...';
    default: return navigator.onLine ? 'Connecté' : 'Hors ligne';
  }
});
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.hover-effect {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.hover-effect:active {
  transform: translateY(0);
}
</style>