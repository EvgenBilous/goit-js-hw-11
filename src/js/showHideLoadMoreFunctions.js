import refs from './refs';

export function hideBtnLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
export function showBtnLoadMore() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
