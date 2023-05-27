class Auth {
  constructor(option) {
    this._url = option.BASE_URL;
    this._headers = option.headers;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._getResponse);
  }

  authorize({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._getResponse);
  }
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }
}

const auth = new Auth({
  BASE_URL: 'https://api.mesto.mesto.nomoredomains.rocks',
  // BASE_URL: 'http://localhost:3005',
  // BASE_URL: "https://auth.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});

export default auth;
