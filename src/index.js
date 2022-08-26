import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPixabay } from './api/api-service';
import { createMarkup } from './templates/templates';

const pixaSearch = document.querySelector('input');
const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more__btn')
let simpleLightBox;
let content = ""
let page = 0;
let qPages = 0;


form.addEventListener('submit', onSubmit);
moreBtn.addEventListener('click', onLoadMore);


function onSubmit(e) {
  window.scrollTo({ top: 0 });
  e.preventDefault();
  page = 1
  content = pixaSearch.value.trim();
  if (!content) {
    Notiflix.Notify.warning('Please, enter field');
    return;
  }
  fetchPixabay(content, page)
    .then(res => {
    
    if (res.data.total === 0) {
      Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
      if (res.data.total > 0) {
      qPages = res.data.totalHits / 40;
      galleryContainer.innerHTML = '';
        if (res.data.total > 40) {
          moreBtn.classList.remove("is-hidden");
        }
      galleryContainer.insertAdjacentHTML('beforeend', createMarkup(res.data.hits))
      Notiflix.Notify.success(`Hooray! We found ${res.data.total} images.`);
      handleClick()
    }
    })
  e.currentTarget.reset();
}

function onLoadMore(e) {
  simpleLightBox.destroy()
  e.preventDefault();
  page += 1;
  fetchPixabay(content, page)
    .then(res => {
      galleryContainer.insertAdjacentHTML('beforeend', createMarkup(res.data.hits))
      handleClick()
    })
  if (page >= qPages) {
      moreBtn.classList.add("is-hidden");
  }
}

function handleClick() {
  simpleLightBox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  }).refresh();
}

console.log([]+[] === "")