<template>
  <div class="chart-container">
    <canvas :ref="chartRef" :id="chartId"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import {
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  registerables
} from 'chart.js';

// Enregistrer tous les éléments requis pour Chart.js
ChartJS.register(...registerables);

interface Props {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'line',
  height: 400,
  width: undefined
});

const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;
const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: ChartJS | null = null;

const initChart = () => {
  if (chartRef.value) {
    // Détruire l'instance précédente si elle existe
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    chartInstance = new ChartJS(chartRef.value, {
      type: props.type,
      data: props.data,
      options: props.options
    });
  }
};

onMounted(() => {
  initChart();
});

// Mettre à jour le graphique quand les données changent
watch(() => props.data, () => {
  if (chartInstance) {
    chartInstance.data = props.data;
    chartInstance.update();
  } else {
    initChart();
  }
}, { deep: true });

// Mettre à jour le graphique quand les options changent
watch(() => props.options, () => {
  if (chartInstance) {
    chartInstance.options = props.options || {};
    chartInstance.update();
 }
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  height: v-bind("props.height + 'px'");
  width: v-bind("props.width ? props.width + 'px' : '100%'");
}
</style>