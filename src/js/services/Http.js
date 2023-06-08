export class HttpService {
  get(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
}
