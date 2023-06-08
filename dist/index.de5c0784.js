const categoriaSelect = document.getElementById('categoria');
const categoriasProducto = document.getElementById('producto');
const categoriasMarca = document.getElementById('marca');
fetch(`http://localhost:3000/categorias`)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
      const option = document.createElement('option');
      option.value = element.id;
      option.textContent = element.nombreCategoria;
      categoriaSelect.appendChild(option);
    });
  })
  .catch(error => alert(error));
categoriaSelect.addEventListener('change', () => {});

//# sourceMappingURL=index.de5c0784.js.map
