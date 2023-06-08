import { HttpService } from './Http';

export class VentaService {
  #endpoint = `http://localhost:3000/ventas`;
  #http = new HttpService();

  async getVentasByMarca(marcaId) {
    try {
      const response = await this.#http.get(
        `${this.#endpoint}?idMarca=${marcaId}`
      );
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
