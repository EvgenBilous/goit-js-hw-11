import { PixabayAPI } from './pixabay-api';
import simpleLightbox from 'simplelightbox';
// Described in documentation
import SimpleLightbox from 'simplelightbox';
// Additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';
const pixabayAPI = new PixabayAPI();
//
// pixabayAPI.getPhotos().then(res => {
//   console.log(res);
// })
const lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

const refs = {
  list: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  form: document.querySelector('.search-form'),
};

refs.form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const searchQueryAPI = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchQueryAPI) {
    return alert('Please, enter search input');
  }

  pixabayAPI.query = searchQueryAPI;

  try {
    const response = await pixabayAPI.getPhotos();
    if (response.hits.length === 0) {
      refs.list.innerHTML = '';
      return alert('No data by your input');
    }

    const markup = createMarkup(response.hits);
    refs.list.innerHTML = markup;
    lightbox.refresh();

    if (response.totalHits < pixabayAPI.perPage) return;

    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(arr) {
  return arr
    .map(item => {
      return `
      <li class="photo-card">
      <a href="${item.largeImageURL}">
   <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${item.downloads}</b>
    </p>
  </div>
</li>`;
    })
    .join('');
}
