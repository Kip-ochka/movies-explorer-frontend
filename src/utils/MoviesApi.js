class MoviesApi {
  constructor(url) {
    this.url = url
  }
  _getResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.json())
    }
    return res.json().then((res) => this._makeNormalArrayFromApi(res))
  }
  _makeNormalArrayFromApi(res) {
    return res.map((item) => ({
      country: item.country,
      director: item.director,
      duration: item.duration,
      year: item.year,
      description: item.description,
      image: `${this.url + item.image.url}`,
      trailerLink: item.trailerLink,
      thumbnail: `${this.url + item.image.url}`,
      movieId: item.id,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
    }))
  }
  getMovies() {
    return fetch(`${this.url}/beatfilm-movies`).then((res) =>
      this._getResponse(res)
    )
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co')
export { moviesApi }
