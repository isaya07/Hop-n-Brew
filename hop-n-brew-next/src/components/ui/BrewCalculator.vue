<template>
  <Card header="Calculateur de brassage" size="large">
    <div class="columns">
      <div class="column is-half">
        <h3 class="title is-4">Ingrédients</h3>
        
        <!-- Fermentables -->
        <div class="brew-section">
          <h4 class="title is-5">Fermentables</h4>
          <div 
            v-for="(fermentable, index) in recipe.fermentables" 
            :key="index"
            class="box"
          >
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <strong>{{ fermentable.name }}</strong>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="tag is-info">{{ fermentable.weight }} kg</span>
                  <span class="tag is-success ml-2">{{ fermentable.yield }}%</span>
                  <span class="tag is-warning ml-2">{{ fermentable.color }} SRM</span>
                </div>
              </div>
            </div>
          
          <Button type="primary" size="small" @click="addFermentable">
            <i class="fas fa-plus"></i> Ajouter fermentable
          </Button>
        </div>
        
        <!-- Houblons -->
        <div class="brew-section">
          <h4 class="title is-5">Houblons</h4>
          <div 
            v-for="(hop, index) in recipe.hops" 
            :key="index"
            class="box"
          >
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <strong>{{ hop.name }}</strong>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="tag is-info">{{ hop.weight }} g</span>
                  <span class="tag is-success ml-2">{{ hop.alphaAcid }}%</span>
                  <span class="tag is-warning ml-2">{{ hop.boilTime }} min</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button type="primary" size="small" @click="addHop">
            <i class="fas fa-plus"></i> Ajouter houblon
          </Button>
        </div>
        
        <!-- Volume -->
        <div class="brew-section">
          <h4 class="title is-5">Paramètres</h4>
          <Input
            v-model="recipe.volume"
            label="Volume final (L)"
            type="number"
            :step="0.1"
          />
          <Input
            v-model="recipe.attenuation"
            label="Atténuation (%)"
            type="number"
            :step="0.1"
          />
          <Input
            v-model="recipe.efficiency"
            label="Efficacité (%)"
            type="number"
            :step="0.1"
          />
        </div>
      </div>
      
      <div class="column is-half">
        <h3 class="title is-4">Résultats</h3>
        
        <div class="brew-results">
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedOG.toFixed(3) }}</p>
            <p class="subtitle is-6 has-text-centered">Densité initiale (OG)</p>
          </div>
          
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedFG.toFixed(3) }}</p>
            <p class="subtitle is-6 has-text-centered">Densité finale (FG)</p>
          </div>
          
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedABV.toFixed(1) }}%</p>
            <p class="subtitle is-6 has-text-centered">Alcool par volume (ABV)</p>
          </div>
          
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedIBU.toFixed(0) }}</p>
            <p class="subtitle is-6 has-text-centered">Amertume (IBU)</p>
          </div>
          
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedColor.toFixed(0) }} SRM</p>
            <p class="subtitle is-6 has-text-centered">Couleur</p>
          </div>
          
          <div class="box">
            <p class="title is-4 has-text-centered">{{ calculatedCalories.toFixed(0) }}</p>
            <p class="subtitle is-6 has-text-centered">Calories (par 12oz)</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import Card from '@/components/base/Card.vue';
import Input from '@/components/base/Input.vue';
import Button from '@/components/base/Button.vue';
import { BrewCalculator } from '@/lib/brew-calculator';

interface Fermentable {
  name: string;
  weight: number; // kg
 yield: number; // %
  color: number; // SRM
}

interface Hop {
  name: string;
 weight: number; // g
  alphaAcid: number; // %
  boilTime: number; // minutes
}

interface Recipe {
  fermentables: Fermentable[];
  hops: Hop[];
  volume: number; // L
 attenuation: number; // %
  efficiency: number; // %
}

const recipe = reactive<Recipe>({
  fermentables: [
    { name: 'Malt Pilsen', weight: 4.5, yield: 80, color: 2 },
    { name: 'Malt Munich', weight: 0.5, yield: 78, color: 8 }
  ],
  hops: [
    { name: 'Cascade', weight: 25, alphaAcid: 6.5, boilTime: 60 },
    { name: 'Cascade', weight: 25, alphaAcid: 6.5, boilTime: 10 }
  ],
  volume: 20,
  attenuation: 75,
  efficiency: 75
});

const calculatedOG = computed(() => {
  const fermentables = recipe.fermentables.map((f: Fermentable) => ({
    weight: f.weight,
    yield: f.yield
  }));
  return BrewCalculator.calculateOriginalGravity(fermentables, recipe.volume, recipe.efficiency);
});

const calculatedFG = computed(() => {
  return BrewCalculator.calculateFinalGravity(calculatedOG.value, recipe.attenuation);
});

const calculatedABV = computed(() => {
  return BrewCalculator.calculateABV(calculatedOG.value, calculatedFG.value);
});

const calculatedIBU = computed(() => {
  const hops = recipe.hops.map((h: Hop) => ({
    alphaAcid: h.alphaAcid,
    weight: h.weight / 1000, // Convertir g en kg
    boilTime: h.boilTime
 }));
  return BrewCalculator.calculateIBU(hops, calculatedOG.value, recipe.volume);
});

const calculatedColor = computed(() => {
  const fermentables = recipe.fermentables.map((f: Fermentable) => ({
    weight: f.weight,
    color: f.color
  }));
  return BrewCalculator.calculateColor(fermentables, recipe.volume);
});

const calculatedCalories = computed(() => {
  return BrewCalculator.calculateCalories(calculatedOG.value, calculatedFG.value);
});

const addFermentable = () => {
  recipe.fermentables.push({
    name: '',
    weight: 0,
    yield: 0,
    color: 0
  });
};

const addHop = () => {
  recipe.hops.push({
    name: '',
    weight: 0,
    alphaAcid: 0,
    boilTime: 0
  });
};
</script>

<style scoped>
.brew-section {
  margin-bottom: 1.5rem;
}

.brew-results > .box {
  margin-bottom: 1rem;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>