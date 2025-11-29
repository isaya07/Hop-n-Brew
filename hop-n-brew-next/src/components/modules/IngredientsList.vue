<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Ingrédients</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="createIngredient">
          <i class="fas fa-plus"></i> &nbsp; Nouvel ingrédient
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
          <a>Ingrédients divers</a>
        </li>
        <li :class="{ 'is-active': activeTab === 'waters' }" @click="activeTab = 'waters'">
          <a>Eaux</a>
        </li>
      </ul>
    </div>

    <!-- Tableau des fermentescibles -->
    <div v-if="activeTab === 'fermentables'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Rendement (%)</th>
            <th>Couleur (EBC)</th>
            <th>Quantité (kg)</th>
            <th>Origine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fermentable in ingredientsStore.allFermentables" :key="fermentable.id">
            <td>{{ fermentable.name }}</td>
            <td>{{ fermentable.type }}</td>
            <td>{{ fermentable.yield || '-' }}</td>
            <td>{{ fermentable.color }}</td>
            <td>{{ fermentable.amount }}</td>
            <td>{{ fermentable.origin || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('fermentable', fermentable)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('fermentable', fermentable.id!)">
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
            <th>Alpha (%)</th>
            <th>Beta (%)</th>
            <th>Utilisation</th>
            <th>Temps (min)</th>
            <th>Origine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hop in ingredientsStore.allHops" :key="hop.id">
            <td>{{ hop.name }}</td>
            <td>{{ hop.alpha }}</td>
            <td>{{ hop.beta || '-' }}</td>
            <td>{{ hop.use || '-' }}</td>
            <td>{{ hop.time }}</td>
            <td>{{ hop.origin || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('hop', hop)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('hop', hop.id!)">
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
            <th>Type</th>
            <th>Forme</th>
            <th>Atténuation (%)</th>
            <th>Laboratoire</th>
            <th>Produit ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="yeast in ingredientsStore.allYeasts" :key="yeast.id">
            <td>{{ yeast.name }}</td>
            <td>{{ yeast.type || '-' }}</td>
            <td>{{ yeast.form || '-' }}</td>
            <td>{{ yeast.attenuation || '-' }}</td>
            <td>{{ yeast.laboratory || '-' }}</td>
            <td>{{ yeast.productId || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('yeast', yeast)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('yeast', yeast.id!)">
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
            <th>Type</th>
            <th>Utilisation</th>
            <th>Temps (min)</th>
            <th>Quantité</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="misc in ingredientsStore.allMiscs" :key="misc.id">
            <td>{{ misc.name }}</td>
            <td>{{ misc.type || '-' }}</td>
            <td>{{ misc.use || '-' }}</td>
            <td>{{ misc.time || '-' }}</td>
            <td>{{ misc.amount || '-' }}</td>
            <td>{{ misc.notes || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('misc', misc)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('misc', misc.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tableau des eaux -->
    <div v-if="activeTab === 'waters'" class="table-container">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Calcium (ppm)</th>
            <th>Bicarbonate (ppm)</th>
            <th>Sulfate (ppm)</th>
            <th>Chlorure (ppm)</th>
            <th>PH</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="water in ingredientsStore.allWaters" :key="water.id">
            <td>{{ water.name }}</td>
            <td>{{ water.calcium || '-' }}</td>
            <td>{{ water.bicarbonate || '-' }}</td>
            <td>{{ water.sulfate || '-' }}</td>
            <td>{{ water.chloride || '-' }}</td>
            <td>{{ water.ph || '-' }}</td>
            <td>
              <Button size="small" type="light" @click="editIngredient('water', water)">
                <i class="fas fa-edit"></i>
              </Button>
              <Button size="small" type="danger" @click="deleteIngredient('water', water.id!)">
                <i class="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucune donnée -->
    <div v-if="currentTabItems.length === 0" class="has-text-centered">
      <p class="is-size-5">Aucun {{ activeTab }} trouvé</p>
      <p class="is-size-6 has-text-grey">Commencez par créer votre premier ingrédient</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useIngredientsStore } from '@/stores/ingredients';
import apiManager from '@/lib/api/index';
import { IIngredient } from '@/lib/database';
import { IFermentable } from '@/lib/recipes/types';
import Button from '@/components/base/Button.vue';

const router = useRouter();
const authStore = useAuthStore();
const ingredientsStore = useIngredientsStore();

const activeTab = ref('fermentables');

const currentTabItems = computed(() => {
  switch(activeTab.value) {
    case 'fermentables': return ingredientsStore.allFermentables;
    case 'hops': return ingredientsStore.allHops;
    case 'yeasts': return ingredientsStore.allYeasts;
    case 'miscs': return ingredientsStore.allMiscs;
    case 'waters': return ingredientsStore.allWaters;
    default: return [];
  }
});

onMounted(async () => {
  // Charger les ingrédients via le store
  await Promise.all([
    ingredientsStore.fetchFermentables(),
    ingredientsStore.fetchHops(),
    ingredientsStore.fetchYeasts(),
    ingredientsStore.fetchMiscs(),
    ingredientsStore.fetchWaters()
  ]);
});

const createIngredient = () => {
  router.push(`/ingredients/new`);
};

const editIngredient = (type: string, ingredient: any) => {
  router.push(`/ingredients/${type}/${ingredient.id}`);
};

const deleteIngredient = async (type: string, id: number) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) {
    let result: any;
    
    switch(type) {
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
    }
    
    if (result && !result.success) {
      console.error('Erreur lors de la suppression de l\'ingrédient:', result.error);
    }
  }
};
</script>