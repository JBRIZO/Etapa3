import { Chart } from 'chart.js/auto';

export const crearGraficoBarras = (data, type) => {
  const existingChart = Chart.getChart('ventasMensuales');
  if (existingChart) {
    existingChart.destroy();
  }
  new Chart(document.getElementById('ventasMensuales'), {
    type: type,
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

export const cambiarTipoGrafico = (chartType) => {
  const chart = Chart.getChart('ventasMensuales');
  if (chart) {
    chart.config.type = chartType;
    chart.update();
  }
};