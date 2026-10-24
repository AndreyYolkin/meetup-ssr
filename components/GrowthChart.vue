<template>
  <div class="w-full h-60 p-4 bg-white/5 rounded-xl border border-white/10">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { Line } from 'vue-chartjs'
import chartData from './growth-data.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  Filler
)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
             label += new Intl.NumberFormat('en-US').format(context.parsed.y);
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: { 
        color: 'rgba(255, 255, 255, 0.7)',
        callback: (value) => {
            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M'
            if (value >= 1000) return (value / 1000).toFixed(0) + 'k'
            return value
        }
      },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
      border: { display: false }
    },
    x: {
      ticks: { 
        color: 'rgba(255, 255, 255, 0.7)',
        maxTicksLimit: 5
      },
      type: 'time',
      time: {
        tooltipFormat: 'yyyy'
      },
      grid: { display: false },
      border: { display: false }
    }
  },
  elements: {
      point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4
      }
  }
}
</script>
