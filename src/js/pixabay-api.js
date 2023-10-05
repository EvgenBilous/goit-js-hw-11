import axios from 'axios';
export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '22356210-f5a6fb995cd777b2b01184cc9';
  constructor() {
    this.page = 1;
    this.query = null;
    this.perPage = 40;
  }
  async getPhotos() {
    const response = await axios.get(`${this.#BASE_URL}/?`, {
      params: {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    });
    return response.data;
  }
}
