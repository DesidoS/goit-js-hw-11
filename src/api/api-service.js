import axios from 'axios';

const BSAE_URL = 'https://pixabay.com/api/';
const API_KEY = "29456311-382a1305bbd043c4ca5789a17"

export async function fetchPixabay(q, page) {
  try {
    return await axios
      .get(BSAE_URL, {
        params: {
          key: API_KEY,
          q,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
          page,
      }
      })
  }
  catch (e) {
    Notiflix.Notify.failure(`Oops, error ${e.message}, there is no country with that name`)
  }
}