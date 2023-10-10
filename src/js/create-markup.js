export function createMarkup(arr) {
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
