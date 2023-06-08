import { HttpService } from './Http';

export class MarcaService {
  #endpoint = `http://localhost:3000/marcas`;
  #http = new HttpService();

  async getMarcasByProducto(productoId) {
    try {
      const response = await this.#http.get(
        `${this.#endpoint}?idProducto=${productoId}`
      );
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
