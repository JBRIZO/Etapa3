import { Chart } from 'chart.js/auto';

const chartId = 'ventasMensuales';

export const crearGraficoBarras = (data, type) => {
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  new Chart(document.getElementById(chartId), {
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

export const cambiarTipoGrafico = chartType => {
  const chart = Chart.getChart(chartId);
  if (chart) {
    chart.config.type = chartType;
    chart.update();
  }
};
