<template>
  <div class="recipe-chart">
    <h3 class="title is-5">Analyse de la recette</h3>
    <div class="columns">
      <div class="column is-half">
        <ChartComponent
          type="doughnut"
          :data="fermentablesChartData"
          :options="chartOptions"
          height="300"
        />
      </div>
      <div class="column is-half">
        <ChartComponent
          type="bar"
          :data="statsChartData"
          :options="chartOptions"
          height="300"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChartData, ChartOptions } from 'chart.js';
import ChartComponent from './ChartComponent.vue';

interface Fermentable {
  name: string;
  weight: number; // kg
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
  og: number;
  fg: number;
  ibu: number;
  abv: number;
  color: number; // SRM
}

interface Props {
  recipe: Recipe;
}

const props = defineProps<Props>();

const fermentablesChartData = computed<ChartData<'doughnut'>>(() => {
  return {
    labels: props.recipe.fermentables.map(f => f.name),
    datasets: [{
      data: props.recipe.fermentables.map(f => f.weight),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  };
});

const statsChartData = computed<ChartData<'bar'>>(() => {
 return {
    labels: ['OG', 'FG', 'IBU', 'ABV%', 'Couleur (SRM)'],
    datasets: [{
      label: 'Valeurs de brassage',
      data: [
        props.recipe.og,
        props.recipe.fg,
        props.recipe.ibu,
        props.recipe.abv,
        props.recipe.color
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
});

const chartOptions = computed<ChartOptions<any>>(() => {
 return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Données de brassage'
      }
    }
  };
});
</script>

<style scoped>
.recipe-chart {
  margin: 1rem 0;
}
</style>