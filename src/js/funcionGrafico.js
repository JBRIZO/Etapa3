import { Chart } from 'chart.js/auto';

export const crearGraficoBarras = data => {
  const existingChart = Chart.getChart('ventasMensuales');
  if (existingChart) {
    existingChart.destroy();
  }
  new Chart(document.getElementById('ventasMensuales'), {
    type: 'bar',
    data: {
      labels: data.map(row => row.mes),
      datasets: [
        {
          label: 'Ventas por mes',
          data: data.map(row => row.count),
        },
      ],
    },
  });
};
