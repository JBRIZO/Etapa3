import { HttpService } from './Http';

export class ProductoService {
  #endpoint = `http://localhost:3000/productos`;
  #http = new HttpService();

  async getProductosByCategoria(categoriaId) {
    try {
      const response = await this.#http.get(
        `${this.#endpoint}?idCategoria=${+categoriaId}`
      );
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
