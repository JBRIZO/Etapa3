import { HttpService } from './Http';

export class CategoriaService {
  #endpoint = `http://localhost:3000/categorias`;
  #http = new HttpService();

  async getCategorias() {
    try {
      const response = await this.#http.get(this.#endpoint);
      return response;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }
}
