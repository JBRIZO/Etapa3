import { crearGraficoBarras } from './funcionGrafico.js';
import { CategoriaService } from './services/CategoriaService.mjs';
import { MarcaService } from './services/MarcaService.mjs';
import { ProductoService } from './services/ProductoService.mjs';
import { VentaService } from './services/VentaService.mjs';

const categoriaSelect = document.getElementById('categoria');
const productoSelect = document.getElementById('producto');
const marcaSelect = document.getElementById('marca');
const form = document.getElementById('form');

const categoriaService = new CategoriaService();
const productoService = new ProductoService();
const marcasService = new MarcaService();
const ventasService = new VentaService();

crearGraficoBarras([]);

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
  if(+categoriaSelect.value === 0 || +productoSelect.value === 0 || +marcaSelect.value === 0) crearGraficoBarras([]);
  if (event.target.id === categoriaSelect.id) {
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

  if (event.target.id === productoSelect.id) {
    marcaSelect.options.length = 1;
    marcasService.getMarcasByProducto(productoSelect.value).then(response => {
      response.forEach(element => {
        const option = buildOption(element.id, element.nombreMarca);
        marcaSelect.append(option);
      });
    });
  }

  if (+productoSelect.value !== 0 && +marcaSelect.value !== 0) {
    const chartItems = [];
    ventasService.getVentasByMarca(marcaSelect.value).then(response => {
      response.forEach(venta => {
        chartItems.push({ mes: venta.mes, count: venta.count });
      });
      crearGraficoBarras(chartItems);
    });
  }
});

const buildOption = (value, textContent) => {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = textContent;
  return option;
};
