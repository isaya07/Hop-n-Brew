<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">{{ recipeId ? 'Modifier la recette' : 'Nouvelle recette' }}</h1>
      </div>
      <div class="level-right">
        <Button type="primary" @click="saveRecipe">
          <i class="fas fa-save"></i> &nbsp; Enregistrer
        </Button>
        <Button type="light" @click="cancel">
          <i class="fas fa-times"></i> &nbsp; Annuler
        </Button>
      </div>
    </div>

    <div class="box">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="field">
            <label class="label">Nom de la recette</label>
            <div class="control">
              <Input v-model="recipe.name" placeholder="Nom de la recette" />
            </div>
          </div>

          <div class="field">
            <label class="label">Brasseur</label>
            <div class="control">
              <Input v-model="recipe.brewer" placeholder="Votre nom" />
            </div>
          </div>

          <div class="field">
            <label class="label">Assistant brasseur</label>
            <div class="control">
              <Input v-model="recipe.asstBrewer" placeholder="Assistant" />
            </div>
          </div>

          <div class="field">
            <label class="label">Type de recette</label>
            <div class="control">
              <Select 
                v-model="recipe.type" 
                :options="recipeTypes"
                placeholder="Sélectionnez le type de recette"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <Textarea 
                v-model="recipe.notes" 
                placeholder="Notes sur la recette"
                rows="4"
              />
            </div>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="field">
            <label class="label">Taille du lot (L)</label>
            <div class="control">
              <Input 
                v-model.number="recipe.batchSize" 
                type="number"
                placeholder="Taille du lot"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Taille de l'ébullition (L)</label>
            <div class="control">
              <Input 
                v-model.number="recipe.boilSize" 
                type="number"
                placeholder="Taille de l'ébullition"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Temps d'ébullition (min)</label>
            <div class="control">
              <Input 
                v-model.number="recipe.boilTime" 
                type="number"
                placeholder="Durée ébullition"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Efficacité (%)</label>
            <div class="control">
              <Input 
                v-model.number="recipe.efficiency" 
                type="number"
                placeholder="Efficacité"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section des ingrédients -->
      <div class="columns">
        <div class="column is-half">
          <h3 class="title is-4">Fermentescibles</h3>
          <div class="table-container">
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Type</th>
                  <th>Quantité (kg)</th>
                  <th>Couleur (EBC)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fermentable, index) in recipe.fermentables" :key="index">
                  <td>{{ fermentable.name }}</td>
                  <td>{{ fermentable.type }}</td>
                  <td>{{ fermentable.amount }}</td>
                  <td>{{ fermentable.color }}</td>
                  <td>
                    <Button size="small" type="danger" @click="removeFermentable(index)">
                      <i class="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button type="primary" @click="showAddFermentable = true">
            <i class="fas fa-plus"></i> &nbsp; Ajouter fermentescible
          </Button>
        </div>

        <div class="column is-half">
          <h3 class="title is-4">Houblons</h3>
          <div class="table-container">
            <table class="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Alpha (%)</th>
                  <th>Temps (min)</th>
                  <th>Quantité (g)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(hop, index) in recipe.hops" :key="index">
                  <td>{{ hop.name }}</td>
                  <td>{{ hop.alpha }}</td>
                  <td>{{ hop.time }}</td>
                  <td>{{ hop.amount }}</td>
                  <td>
                    <Button size="small" type="danger" @click="removeHop(index)">
                      <i class="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button type="primary" @click="showAddHop = true">
            <i class="fas fa-plus"></i> &nbsp; Ajouter houblon
          </Button>
        </div>
      </div>
    </div>

    <!-- Modals pour ajouter des ingrédients -->
    <div v-if="showAddFermentable" class="modal is-active">
      <div class="modal-background" @click="showAddFermentable = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter un fermentescible</p>
          <button class="delete" @click="showAddFermentable = false" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <Input v-model="newFermentable.name" placeholder="Nom du fermentescible" />
            </div>
          </div>
          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <Select 
                v-model="newFermentable.type" 
                :options="fermentableTypes"
                placeholder="Sélectionnez le type"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Quantité (kg)</label>
            <div class="control">
              <Input 
                v-model.number="newFermentable.amount" 
                type="number"
                placeholder="Quantité"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Couleur (EBC)</label>
            <div class="control">
              <Input 
                v-model.number="newFermentable.color" 
                type="number"
                placeholder="Couleur"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <Button type="success" @click="addFermentable">Ajouter</Button>
          <Button type="light" @click="showAddFermentable = false">Annuler</Button>
        </footer>
      </div>
    </div>

    <div v-if="showAddHop" class="modal is-active">
      <div class="modal-background" @click="showAddHop = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter un houblon</p>
          <button class="delete" @click="showAddHop = false" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <Input v-model="newHop.name" placeholder="Nom du houblon" />
            </div>
          </div>
          <div class="field">
            <label class="label">Alpha (%)</label>
            <div class="control">
              <Input 
                v-model.number="newHop.alpha" 
                type="number"
                placeholder="Taux d'alpha"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Temps (min)</label>
            <div class="control">
              <Input 
                v-model.number="newHop.time" 
                type="number"
                placeholder="Temps d'ajout"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Quantité (g)</label>
            <div class="control">
              <Input 
                v-model.number="newHop.amount" 
                type="number"
                placeholder="Quantité"
              />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <Button type="success" @click="addHop">Ajouter</Button>
          <Button type="light" @click="showAddHop = false">Annuler</Button>
        </footer>
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
import { IFermentable, IHop } from '@/lib/recipes/types';
import Card from '@/components/base/Card.vue';
import Button from '@/components/base/Button.vue';
import Input from '@/components/base/Input.vue';
import Select from '@/components/base/Select.vue';
import Textarea from '@/components/base/Textarea.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const recipesStore = useRecipesStore();

const recipeId = computed(() => route.params.id as string);
const showAddFermentable = ref(false);
const showAddHop = ref(false);

const recipe = ref<IApiRecipe>({
  id: undefined,
  name: '',
  notes: '',
  brewer: '',
  asstBrewer: '',
  type: 'All Grain',
  equipment: { name: 'Generic Equipment' },
  style: { name: 'Generic Style' },
  batchSize: 20,
  boilSize: 23,
  boilTime: 60,
  efficiency: 75,
  fermentables: [],
  yeasts: [],
 hops: [],
  miscs: [],
 waters: [],
  mash: { name: 'Single Infusion' },
  fermentation: { name: 'Generic Fermentation' },
 carbonation: { name: 'Natural', type: 'Natural' },
  og: 1.00,
  fg: 1.000,
  tasteNote: '',
  tasteRating: '',
  date: new Date().toISOString(),
  estOg: null,
  estFg: null,
  estColor: null,
  ibu: null,
  ibuMethod: 'Tinseth',
  estAbv: null,
  abv: null,
  actualEfficiency: null,
  calories: null,
  displayBatchSize: null,
 displayBoilSize: null,
  displayOg: null,
  displayFg: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  archived: false,
  description: undefined,
  dateCreated: new Date().toISOString(),
  dateUpdated: new Date().toISOString()
});

const newFermentable = ref<IFermentable>({
  name: '',
  type: 'Grain',
  amount: 0,
  yield: null,
  color: 0,
  addAfterBoil: null,
  origin: null,
  supplier: null,
  notes: null,
  coarseFineDiff: null,
  moisture: null,
  diastaticPower: null,
  protein: null,
  maxInBatch: null,
  recommendMash: null,
  ibuGalPerLb: null,
  potential: null,
  inventory: null,
  price: null,
  displayColor: null,
 displayAmount: null,
  parent: undefined
} as IFermentable);

const newHop = ref<IHop>({
  name: '',
  alpha: 0,
  use: null,
  time: 0,
  form: null,
  beta: null,
  hsi: null,
  origin: null,
  substitutes: null,
 notes: null,
 percentLost: null,
  displayAmount: null,
  inventory: null,
  type: null,
  phenolicCompounds: null,
  amount: 0,
  parent: undefined
} as IHop);

const recipeTypes = [
  { value: 'Extract', label: 'Extract' },
  { value: 'Partial Mash', label: 'Partial Mash' },
  { value: 'All Grain', label: 'All Grain' }
];

const fermentableTypes = [
  { value: 'Grain', label: 'Grain' },
  { value: 'Sugar', label: 'Sugar' },
  { value: 'Extract', label: 'Extract' },
  { value: 'Dry Extract', label: 'Dry Extract' },
  { value: 'Adjunct', label: 'Adjunct' }
];

onMounted(async () => {
  if (recipeId.value && recipeId.value !== 'new') {
    // Charger la recette via le store
    await recipesStore.fetchRecipeById(Number(recipeId.value));
    const recipeFromStore = recipesStore.recipeById(Number(recipeId.value));
    if (recipeFromStore) {
      recipe.value = recipeFromStore;
    }
  }
});

const addFermentable = () => {
  recipe.value.fermentables.push({ ...newFermentable.value });
  newFermentable.value = {
    name: '',
    type: 'Grain',
    amount: 0,
    yield: null,
    color: 0,
    addAfterBoil: null,
    origin: null,
    supplier: null,
    notes: null,
    coarseFineDiff: null,
    moisture: null,
    diastaticPower: null,
    protein: null,
    maxInBatch: null,
    recommendMash: null,
    ibuGalPerLb: null,
    potential: null,
    inventory: null,
    price: null,
    displayColor: null,
    displayAmount: null,
    parent: undefined
  } as IFermentable;
  showAddFermentable.value = false;
};

const removeFermentable = (index: number) => {
  recipe.value.fermentables.splice(index, 1);
};

const addHop = () => {
  recipe.value.hops.push({ ...newHop.value });
  newHop.value = {
    name: '',
    alpha: 0,
    use: null,
    time: 0,
    form: null,
    beta: null,
    hsi: null,
    origin: null,
    substitutes: null,
    notes: null,
    percentLost: null,
    displayAmount: null,
    inventory: null,
    type: null,
    phenolicCompounds: null,
    amount: 0,
    parent: undefined
  } as IHop;
  showAddHop.value = false;
};

const removeHop = (index: number) => {
  recipe.value.hops.splice(index, 1);
};

const saveRecipe = async () => {
  let result;
  if (recipe.value.id) {
    result = await recipesStore.updateRecipe(recipe.value.id, recipe.value);
  } else {
    result = await recipesStore.createRecipe(recipe.value);
  }
  
  if (result.success) {
    router.push('/recipes');
  } else {
    console.error('Erreur lors de l\'enregistrement de la recette:', result.error);
  }
};

const cancel = () => {
 router.push('/recipes');
};
</script>