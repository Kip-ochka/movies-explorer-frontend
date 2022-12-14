class MainApi {
  constructor({ url, headers, credentials }) {
    this._url = url
    this._headers = headers
    this._isCredantials = credentials
  }
  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`)
    }
    return res.json()
  }
  signIn({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  signUp({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  updateUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  getMyMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  addNewMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._isCredantials,
    }).then(this._getResponse)
  }
}

const mainApi = new MainApi({
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})

export { mainApi }
