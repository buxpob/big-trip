const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #autorization = null;

  constructor(endPoint, autorization) {
    this.#endPoint = endPoint;
    this.#autorization = autorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async(point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  addPoint = async(point) => {
    const response = await this.#load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  deletePoint = async(point) => {
    const response = await this.#load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#autorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static parseResponse = (response) => response.json();

  static catchError = (err) => {
    throw err;
  }

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': point.price,
      'date_from': point.dateStart.toISOString(),
      'date_to': point.dateEnd.toISOString(),
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.price;
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
