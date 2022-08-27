import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPixabay } from './api/api-service';
import { createMarkup } from './templates/templates';

const galleryContainer = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more__btn')
let simpleLightBox;
let content = ""
let page = 0;
let totalPage = 0;

document.getElementById('search-form').addEventListener('submit', onSubmit);
moreBtn.addEventListener('click', onLoadMore);


function onSubmit(e) {
  window.scrollTo({ top: 0 });
  e.preventDefault();
  page = 1
  if (content && content === e.currentTarget.elements[0].value.trim()) {
    Notiflix.Notify.info("Sorry, enter another query.");
    return
  }
  content = e.currentTarget.elements[0].value.trim()
  if (!content) {
    Notiflix.Notify.warning('Please, enter field');
    return;
  }
  fetchPixabay(content, page)
    .then(res => {
    
    if (res.data.totalHits === 0) {
      Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
      return
    }
    if (res.data.totalHits > 0) {
    totalPage = res.data.totalHits / 40;
    galleryContainer.innerHTML = '';
      if (res.data.totalHits > 40) {
        moreBtn.classList.remove("is-hidden");
      }
      if (res.data.totalHits < 40) {
        moreBtn.classList.add("is-hidden");
      }
      galleryContainer.insertAdjacentHTML('beforeend', createMarkup(res.data.hits));
      Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
      handleClick();
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
  if (page >= totalPage) {
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