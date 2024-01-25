
export const pagination = function () {
  const articleContent = document.getElementById('article_wrap');
  const pagination = document.getElementById('pagination');

  if (!pagination || !articleContent) {
    return;
  }

  const itemsPerPage: number = 9;
  const articles: NodeListOf<Element> = document.querySelectorAll('.article');
  let currentPage: number = 1;

  function displayArticles(page: number, perPage: number): void {
    if (!articleContent) return; // Добавляем проверку на null

    articleContent.innerHTML = '';
    page--;

    const start: number = page * perPage;
    const end: number = start + perPage;
    const paginatedArticles: Element[] = Array.from(articles).slice(start, end);

    paginatedArticles.forEach((article: Element) => {
      articleContent.appendChild(article.cloneNode(true));
    });
  }

  function setupPagination(
    items: NodeListOf<Element>,
    wrapper: HTMLElement,
    perPage: number,
  ): void {
    wrapper.innerHTML = '';
    const pageCount: number = Math.ceil(items.length / perPage);
    const maxVisibleButtons: number = 3;
    const maxVisibleBeforeAfter: number = Math.floor((maxVisibleButtons - 1) / 2);

    let startPage: number;
    let endPage: number;

    if (currentPage <= maxVisibleBeforeAfter) {
      startPage = 1;
      endPage = Math.min(pageCount, maxVisibleButtons);
    } else if (currentPage + maxVisibleBeforeAfter >= pageCount) {
      startPage = Math.max(1, pageCount - maxVisibleButtons + 1);
      endPage = pageCount;
    } else {
      startPage = currentPage - maxVisibleBeforeAfter;
      endPage = currentPage + maxVisibleBeforeAfter;
    }

    const prevButtonContainer: HTMLDivElement = document.createElement('div');
    const prevImage: HTMLImageElement = document.createElement('img');
    prevImage.src = './image/reviews/arrow-left.svg';
    prevImage.alt = 'Previous';
    const prevText: HTMLSpanElement = document.createElement('span');
    prevText.textContent = 'Previous';
    prevButtonContainer.appendChild(prevText);
    prevButtonContainer.appendChild(prevImage);
    prevButtonContainer.classList.add('arrow_left');
    prevButtonContainer.addEventListener('click', () => {
      currentPage = Math.max(currentPage - 1, 1);
      displayArticles(currentPage, perPage);
      setupPagination(items, wrapper, perPage);
    });
    wrapper.appendChild(prevButtonContainer);

    for (let i: number = startPage; i <= endPage; i++) {
      const btn: HTMLButtonElement = document.createElement('button');
      btn.innerText = i.toString();
      btn.addEventListener('click', () => {
        currentPage = i;
        displayArticles(currentPage, perPage);
        setupPagination(items, wrapper, perPage);
      });
      btn.classList.toggle('active', i === currentPage);
      wrapper.appendChild(btn);
    }

    if (endPage < pageCount) {
      const ellipsisEnd: HTMLSpanElement = document.createElement('span');
      ellipsisEnd.innerText = '...';
      wrapper.appendChild(ellipsisEnd);

      const lastPageButton: HTMLButtonElement = document.createElement('button');
      lastPageButton.innerText = pageCount.toString();
      lastPageButton.addEventListener('click', () => {
        currentPage = pageCount;
        displayArticles(currentPage, perPage);
        setupPagination(items, wrapper, perPage);
      });
      wrapper.appendChild(lastPageButton);
    }

    const nextButtonContainer: HTMLDivElement = document.createElement('div');
    const nextText: HTMLSpanElement = document.createElement('span');
    nextText.textContent = 'Next';
    const nextImage: HTMLImageElement = document.createElement('img');
    nextImage.src = './image/reviews/arrow-right.svg';
    nextImage.alt = 'Next';
    nextButtonContainer.appendChild(nextText);
    nextButtonContainer.appendChild(nextImage);
    nextButtonContainer.classList.add('arrow_right');
    nextButtonContainer.addEventListener('click', () => {
      currentPage = Math.min(currentPage + 1, pageCount);
      displayArticles(currentPage, perPage);
      setupPagination(items, wrapper, perPage);
    });
    wrapper.appendChild(nextButtonContainer);
  }

  displayArticles(currentPage, itemsPerPage);
  setupPagination(articles, pagination, itemsPerPage);
};