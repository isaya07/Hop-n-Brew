<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Recettes</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="createRecipe">
          <i class="fas fa-plus"></i> &nbsp; Nouvelle recette
        </Button>
      </div>
    </div>

    <!-- Barre de recherche -->
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          v-model="searchQuery"
          class="input"
          type="text"
          placeholder="Rechercher une recette..."
        />
      </div>
      <div class="control">
        <Button type="light" @click="clearSearch">
          <i class="fas fa-times"></i>
        </Button>
      </div>
    </div>

    <!-- Filtres -->
    <div class="field is-grouped is-grouped-multiline">
      <div class="control">
        <div class="select">
          <select v-model="filterStyle">
            <option value="">Tous les styles</option>
            <option v-for="style in styles" :key="style.id" :value="style.id">
              {{ style.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="sortBy">
            <option value="name">Nom</option>
            <option value="og">OG</option>
            <option value="fg">FG</option>
            <option value="ibu">IBU</option>
            <option value="abv">ABV</option>
            <option value="dateCreated">Date de création</option>
          </select>
        </div>
      </div>
      <div class="control">
        <label class="checkbox">
          <input v-model="showArchived" type="checkbox" />
          Afficher les recettes archivées
        </label>
      </div>
    </div>

    <!-- Tableau des recettes -->
    <div class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Style</th>
            <th>OG</th>
            <th>FG</th>
            <th>ABV %</th>
            <th>IBU</th>
            <th>Couleur (SRM)</th>
            <th>Date de création</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in filteredRecipes" :key="recipe.id">
            <td>
              <strong>{{ recipe.name }}</strong>
              <br />
              <small class="has-text-grey">{{ recipe.description || '-' }}</small>
            </td>
            <td>{{ recipe.style?.name || '-' }}</td>
            <td>{{ recipe.og?.toFixed(3) || '-' }}</td>
            <td>{{ recipe.fg?.toFixed(3) || '-' }}</td>
            <td>{{ recipe.abv?.toFixed(1) || '-' }}%</td>
            <td>{{ recipe.ibu?.toFixed(1) || '-' }}</td>
            <td>{{ recipe.colorSrm?.toFixed(1) || '-' }}</td>
            <td>{{ formatDate(recipe.dateCreated) }}</td>
            <td>
              <Button size="small" type="light" @click="viewRecipe(recipe.id!)">
                <i class="fas fa-eye"></i>
              </Button>
              <Button size="small" type="primary" @click="editRecipe(recipe.id!)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteRecipe(recipe.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <a class="pagination-previous" @click="previousPage" :disabled="currentPage === 1">Précédent</a>
      <a class="pagination-next" @click="nextPage" :disabled="currentPage >= totalPages">Suivant</a>
      
      <ul class="pagination-list">
        <li v-for="page in pages" :key="page">
          <a 
            class="pagination-link" 
            :class="{ 'is-current': page === currentPage }"
            @click="goToPage(page)"
            v-if="page !== -1"
          >
            {{ page }}
          </a>
          <span class="pagination-ellipsis" v-else>&hellip;</span>
        </li>
      </ul>
    </nav>

    <!-- Message si aucune recette -->
    <div v-if="filteredRecipes.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucune recette trouvée</p>
      <p class="is-size-6 has-text-grey">Commencez par créer votre première recette</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useRecipesStore } from '@/stores/recipes';
import apiManager from '@/lib/api/index';
import { IApiRecipe, IApiStyle } from '@/lib/api/types';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const styles = ref<IApiStyle[]>([]);
const searchQuery = ref('');
const filterStyle = ref<number | null>(null);
const sortBy = ref('dateCreated');
const showArchived = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredRecipes = computed(() => {
  let result = [...recipesStore.allRecipes];
  
  // Filtre par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(recipe => 
      recipe.name?.toLowerCase().includes(query) ||
      recipe.description?.toLowerCase().includes(query) ||
      recipe.style?.name?.toLowerCase().includes(query)
    );
  }
  
  // Filtre par style
  if (filterStyle.value) {
    result = result.filter(recipe => recipe.style?.id === filterStyle.value);
  }
  
  // Filtre par archivé
  if (!showArchived.value) {
    result = result.filter(recipe => !recipe.archived);
  }
  
  // Tri
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'og':
        return (b.og || 0) - (a.og || 0);
      case 'fg':
        return (b.fg || 0) - (a.fg || 0);
      case 'ibu':
        return (b.ibu || 0) - (a.ibu || 0);
      case 'abv':
        return (b.abv || 0) - (a.abv || 0);
      case 'dateCreated':
        return new Date(b.dateCreated || '').getTime() - new Date(a.dateCreated || '').getTime();
      default:
        return 0;
    }
  });
  
  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / itemsPerPage.value);
});

const pages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
    
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push(-1); // Ellipsis
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages.value) {
      if (endPage < totalPages.value - 1) pages.push(-1); // Ellipsis
      pages.push(totalPages.value);
    }
  }
  
  return pages;
});

const paginatedRecipes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRecipes.value.slice(start, end);
});

onMounted(async () => {
  await recipesStore.fetchRecipes();
  await loadStyles();
});

// Fonction supprimée car les données sont gérées par le store

const loadStyles = async () => {
  const result = await apiManager.styles.getAll();
  if (result.success) {
    styles.value = result.data;
  } else {
    console.error('Erreur lors du chargement des styles:', result.error);
  }
};

const createRecipe = () => {
  router.push('/recipes/new');
};

const viewRecipe = (id: number) => {
  router.push(`/recipes/${id}`);
};

const editRecipe = (id: number) => {
  router.push(`/recipes/${id}/edit`);
};

const deleteRecipe = async (id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
    const result = await recipesStore.deleteRecipe(id);
    if (!result.success) {
      console.error('Erreur lors de la suppression de la recette:', result.error);
    }
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

// Réinitialiser la pagination quand les filtres changent
watch([searchQuery, filterStyle, sortBy, showArchived], () => {
  currentPage.value = 1;
});
</script>