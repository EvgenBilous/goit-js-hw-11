import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';
import { showBtnLoadMore, hideBtnLoadMore } from './showHideLoadMoreFunctions';
import { PixabayAPI } from './pixabay-api';
import { createMarkup } from './create-markup';
import { lightbox } from './lightbox';
const pixabayAPI = new PixabayAPI();

refs.form.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', handleClick);

async function handleClick(event) {
  pixabayAPI.page += 1;
  try {
    const response = await pixabayAPI.getPhotos();

    const markup = createMarkup(response.hits);
    refs.list.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    const lastPage = Math.ceil(response.totalHits / pixabayAPI.perPage);
    if (lastPage === pixabayAPI.page) {
      hideBtnLoadMore();

      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const searchQueryAPI = event.currentTarget.elements.searchQuery.value.trim();

  if (!searchQueryAPI) {
    return Notify.failure('Please, enter search input');
  }

  pixabayAPI.query = searchQueryAPI;

  try {
    const response = await pixabayAPI.getPhotos();
    if (response.hits.length === 0) {
      refs.list.innerHTML = '';
      hideBtnLoadMore();

      return Notify.warning('No data by your input');
    }

    const markup = createMarkup(response.hits);
    refs.list.innerHTML = markup;

    lightbox.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (response.totalHits > 1) {
      Notify.success(`Hooray! We found ${response.totalHits} images`);
    }

    if (response.totalHits < pixabayAPI.perPage) return hideBtnLoadMore();
    showBtnLoadMore();
  } catch (error) {
    console.log(error);
  }
}
