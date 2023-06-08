import { cambiarTipoGrafico, crearGraficoBarras } from './funcionGrafico.js';
import { CategoriaService } from './services/CategoriaService.mjs';
import { MarcaService } from './services/MarcaService.mjs';
import { ProductoService } from './services/ProductoService.mjs';
import { VentaService } from './services/VentaService.mjs';

const categoriaSelect = document.getElementById('categoria');
const productoSelect = document.getElementById('producto');
const marcaSelect = document.getElementById('marca');
const form = document.getElementById('form');
const radioContainer = document.getElementById('radioContainer');

const categoriaService = new CategoriaService();
const productoService = new ProductoService();
const marcasService = new MarcaService();
const ventasService = new VentaService();

let currentGraphType = 'bar';

crearGraficoBarras([], currentGraphType);

categoriaService
  .getCategorias()
  .then(response => {
    response.forEach(element => {
      const option = buildOption(element.id, element.nombreCategoria);
      categoriaSelect.appendChild(option);
    });
  })
  .catch(error => alert(error));

form.addEventListener('change', event => {
  const target = event.target;
  if (target.id === categoriaSelect.id) {
    productoSelect.options.length = 1;
    marcaSelect.options.length = 1;
    productoService
      .getProductosByCategoria(categoriaSelect.value)
      .then(response => {
        response.forEach(element => {
          const option = buildOption(element.id, element.nombreProducto);
          productoSelect.appendChild(option);
        });
      });
  }

  if (target.id === productoSelect.id) {
    marcaSelect.options.length = 1;
    marcasService.getMarcasByProducto(productoSelect.value).then(response => {
      response.forEach(element => {
        const option = buildOption(element.id, element.nombreMarca);
        marcaSelect.append(option);
      });
    });
  }

  if (
    +categoriaSelect.value === 0 ||
    +productoSelect.value === 0 ||
    +marcaSelect.value === 0
  )
    crearGraficoBarras([], currentGraphType);

  if (+productoSelect.value !== 0 && +marcaSelect.value !== 0) {
    const chartItems = [];
    ventasService.getVentasByMarca(marcaSelect.value).then(response => {
      response.forEach(venta => {
        chartItems.push({ mes: venta.mes, count: venta.count });
      });
      crearGraficoBarras(chartItems, currentGraphType);
    });
  }
});

radioContainer.addEventListener('change', event => {
  const target = event.target;

  if (target.matches('#radioBarras')) {
    currentGraphType = 'bar';
    cambiarTipoGrafico(currentGraphType);
  } else if (target.matches('#radioLineas')) {
    currentGraphType = 'line';
    cambiarTipoGrafico(currentGraphType);
  }
});

const buildOption = (value, textContent) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = textContent;
  return option;
};
