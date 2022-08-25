export function createMarkup(content) {
    return content.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<a class="gallery__link" href="${largeImageURL}">
                <div class="gallery__item">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                <p class="info-item">
                <b>Likes: ${likes}</b></p>
                <p class="info-item">
                <b>Views: ${views}</b></p>
                <p class="info-item">
                <b>Comments: ${comments}</b></p>
                <p class="info-item">
                <b>Downloads: ${downloads}</b>
                </p></div></div></a>`).join('')
}