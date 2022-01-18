import axios from 'axios';

class Api {
  static get(route, params, headers) {
    return this.xhr(route, params, headers, 'get');
  }

  static put(route, params, headers) {
    return this.xhr(route, params, headers, 'put');
  }

  static post(route, params, headers) {
    return this.xhr(route, params, headers, 'post');
  }

  static delete(route, params, headers) {
    return this.xhr(route, params, headers, 'delete');
  }

  static xhr(route, params, headers, verb) {
    let options = Object.assign({
      method: verb,
      url: route,
      headers: headers || null,
      params: verb === 'get' ? params : null,
      data: verb !== 'get' ? params : null,
      res: verb !== 'get' ? params : null,
    });

    return axios(options)
      .then(
        response => {
          return response.data;
        },
        error => {
          return error;
        },
      )
      .catch(error => {
        return error;
      });
  }
}

export default Api;
