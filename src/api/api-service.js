import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const USER_KEY = "29456311-382a1305bbd043c4ca5789a17"

export async function fetchPixabay(content, page) {
  try {
    return await axios
    .get(`${ENDPOINT}?key=${USER_KEY}&q=${content}
    &image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
  }
  catch (e) {
    Notiflix.Notify.failure(`Oops, error ${e.message}, there is no country with that name`)
  }
}