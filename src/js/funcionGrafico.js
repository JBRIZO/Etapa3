import { Chart } from 'chart.js/auto';

const chartId = 'ventasMensuales';

export const crearGraficoBarras = (data, type) => {
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  data.sort((a, b) => {
    const monthA = getNumeroMes(a.mes);
    const monthB = getNumeroMes(b.mes);
    return monthA - monthB;
  });
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

const getNumeroMes = mes => {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return meses.indexOf(mes);
};
