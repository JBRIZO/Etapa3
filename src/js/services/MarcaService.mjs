import { HttpService } from './Http';

export class MarcaService {
  #endpoint = `http://localhost:3000`;
  #http = new HttpService();

  async getMarcasByProducto(productoId) {
    try {
      const response = await this.#http.get(
        `${this.#endpoint}/marcas?idProducto=${productoId}`
      );
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
