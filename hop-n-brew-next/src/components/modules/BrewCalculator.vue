<template>
  <div class="container">
    <div class="level">
      <div class="level-left">
        <h1 class="title">Calculateur de brassage</h1>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-third">
        <Card title="Paramètres de brassage">
          <div class="field">
            <label class="label">Taille du lot (L)</label>
            <div class="control">
              <input 
                v-model="batchSize" 
                class="input" 
                type="number" 
                step="0.1" 
                placeholder="Taille du lot en litres"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Rendement (%)</label>
            <div class="control">
              <input 
                v-model="efficiency" 
                class="input" 
                type="number" 
                step="0.1" 
                placeholder="Rendement de l'équipement"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Temps d'ébullition (min)</label>
            <div class="control">
              <input 
                v-model="boilTime" 
                class="input" 
                type="number" 
                placeholder="Durée d'ébullition"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Méthode IBU</label>
            <div class="control">
              <div class="select">
                <select v-model="ibuMethod">
                  <option value="Rager">Rager</option>
                  <option value="Tinseth">Tinseth</option>
                  <option value="Garetz">Garetz</option>
                </select>
              </div>
            </div>
          </div>

          <Button type="primary" @click="calculateRecipe" class="mt-4">
            <i class="fas fa-calculator"></i> &nbsp; Calculer la recette
          </Button>
        </Card>
      </div>

      <div class="column">
        <Card title="Résultats du calcul">
          <div class="content">
            <div class="columns">
              <div class="column">
                <h3 class="title is-4">OG</h3>
                <p class="subtitle is-5">{{ calculatedOg.toFixed(3) }}</p>
              </div>
              <div class="column">
                <h3 class="title is-4">FG</h3>
                <p class="subtitle is-5">{{ calculatedFg.toFixed(3) }}</p>
              </div>
              <div class="column">
                <h3 class="title is-4">ABV</h3>
                <p class="subtitle is-5">{{ calculatedAbv.toFixed(1) }}%</p>
              </div>
            </div>
            
            <div class="columns">
              <div class="column">
                <h3 class="title is-4">IBU</h3>
                <p class="subtitle is-5">{{ calculatedIbu.toFixed(1) }}</p>
              </div>
              <div class="column">
                <h3 class="title is-4">Couleur</h3>
                <p class="subtitle is-5">{{ calculatedColor.toFixed(1) }} SRM</p>
              </div>
              <div class="column">
                <h3 class="title is-4">Calories</h3>
                <p class="subtitle is-5">{{ calculatedCalories.toFixed(0) }}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Ingrédients de la recette" class="mt-4">
          <div class="field">
            <label class="label">Fermentescibles</label>
            <div class="control">
              <div class="tags has-addons" v-for="(fermentable, index) in fermentables" :key="index">
                <span class="tag is-dark">{{ fermentable.name }}</span>
                <span class="tag is-info">{{ fermentable.amount }}g</span>
                <a class="tag is-delete" @click="removeFermentable(index)"></a>
              </div>
            </div>
            <div class="field has-addons mt-2">
              <div class="control is-expanded">
                <input 
                  v-model="newFermentable.name" 
                  class="input" 
                  type="text" 
                  placeholder="Nom du fermentescible"
                />
              </div>
              <div class="control">
                <input 
                  v-model="newFermentable.amount" 
                  class="input" 
                  type="number" 
                  placeholder="Quantité (g)"
                />
              </div>
              <div class="control">
                <Button type="primary" @click="addFermentable">
                  <i class="fas fa-plus"></i>
                </Button>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Houblons</label>
            <div class="control">
              <div class="tags has-addons" v-for="(hop, index) in hops" :key="index">
                <span class="tag is-dark">{{ hop.name }}</span>
                <span class="tag is-info">{{ hop.amount }}g</span>
                <span class="tag is-link">{{ hop.time }}min</span>
                <a class="tag is-delete" @click="removeHop(index)"></a>
              </div>
            </div>
            <div class="field has-addons mt-2">
              <div class="control is-expanded">
                <input 
                  v-model="newHop.name" 
                  class="input" 
                  type="text" 
                  placeholder="Nom du houblon"
                />
              </div>
              <div class="control">
                <input 
                  v-model="newHop.amount" 
                  class="input" 
                  type="number" 
                  placeholder="Quantité (g)"
                />
              </div>
              <div class="control">
                <input 
                  v-model="newHop.time" 
                  class="input" 
                  type="number" 
                  placeholder="Temps (min)"
                />
              </div>
              <div class="control">
                <Button type="primary" @click="addHop">
                  <i class="fas fa-plus"></i>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { BrewCalculator } from '@/lib/brew-calculator';
import Card from '@/components/base/Card.vue';
import Button from '@/components/base/Button.vue';

// Paramètres de brassage
const batchSize = ref(20);
const efficiency = ref(70);
const boilTime = ref(60);
const ibuMethod = ref('Tinseth');

// Résultats du calcul
const calculatedOg = ref(0);
const calculatedFg = ref(0);
const calculatedAbv = ref(0);
const calculatedIbu = ref(0);
const calculatedColor = ref(0);
const calculatedCalories = ref(0);

// Types pour les ingrédients
interface IFermentable {
  name: string;
  amount: number;
  color: number;
}

interface IHop {
  name: string;
  amount: number;
  time: number;
  alpha: number;
}

// Ingrédients
const fermentables = ref<IFermentable[]>([]);
const hops = ref<IHop[]>([]);

// Nouveaux ingrédients
const newFermentable = reactive({ name: '', amount: 0, color: 0 });
const newHop = reactive({ name: '', amount: 0, time: 0, alpha: 5 });

const calculateRecipe = () => {
  // Calcul des valeurs en utilisant la librairie BrewCalculator
  const calculator = new BrewCalculator();
  
  // Calcul de l'OG basé sur les fermentescibles
  let totalSugars = 0;
  fermentables.value.forEach((fermentable: IFermentable) => {
    // Calcul simplifié : poids * rendement / volume
    totalSugars += (fermentable.amount * 0.75) / 1000; // 75% de rendement moyen
  });
  
  // Calcul de l'OG (simplifié)
  calculatedOg.value = 1 + (totalSugars * efficiency.value / 10) / batchSize.value * 0.004;
  
  // Calcul de la FG basé sur l'atténuation moyenne
  const avgAttenuation = 75; // Atténuation moyenne en %
  calculatedFg.value = calculatedOg.value - ((calculatedOg.value - 1) * avgAttenuation / 100);
  
  // Calcul de l'ABV
  calculatedAbv.value = (calculatedOg.value - calculatedFg.value) * 131.25;
  
  // Calcul des IBU (simplifié avec méthode Tinseth)
  let totalIbu = 0;
   hops.value.forEach((hop: IHop) => {
     // Calcul simplifié de l'efficacité de l'isomérisation
     const timeFactor = 2.39 * (1 - Math.exp(-0.04 * hop.time)) / 4.15;
     const bitterness = (hop.amount * hop.alpha * timeFactor * 74.89) / (batchSize.value * calculatedOg.value);
     totalIbu += bitterness;
   });
 calculatedIbu.value = totalIbu;
  
  // Calcul de la couleur (simplifié)
  let mcu = 0;
  fermentables.value.forEach(fermentable => {
    mcu += (fermentable.color * fermentable.amount) / batchSize.value;
  });
  calculatedColor.value = 1.4922 * Math.pow(mcu, 0.6859); // Formule de Morey
  
  // Calcul des calories (simplifié)
  const realExtract = (0.8114 * calculatedFg.value) + 0.1886;
  calculatedCalories.value = (6.9 * calculatedAbv.value) + (4 * (realExtract - 0.1)) * batchSize.value * 3.55;
};

const addFermentable = () => {
  if (newFermentable.name && newFermentable.amount > 0) {
    fermentables.value.push({
      name: newFermentable.name,
      amount: newFermentable.amount,
      color: newFermentable.color || 0
    });
    newFermentable.name = '';
    newFermentable.amount = 0;
    newFermentable.color = 0;
  }
};

const removeFermentable = (index: number) => {
  fermentables.value.splice(index, 1);
};

const addHop = () => {
 if (newHop.name && newHop.amount > 0 && newHop.time >= 0) {
    hops.value.push({
      name: newHop.name,
      amount: newHop.amount,
      time: newHop.time,
      alpha: newHop.alpha
    });
    newHop.name = '';
    newHop.amount = 0;
    newHop.time = 0;
  }
};

const removeHop = (index: number) => {
  hops.value.splice(index, 1);
};
</script>