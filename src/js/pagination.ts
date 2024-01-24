export const pagination = function () {
  const articleContent = document.getElementById('article_wrap');
  const pagination = document.getElementById('pagination');

  if (!pagination) {
    return;
  }

  const itemsPerPage: number = 9; // Количество элементов на одной странице
  const articles: NodeListOf<Element> = document.querySelectorAll('.article');

  let currentPage: number = 1;

  function displayArticles(page: number, perPage: number): void {
    if (!articleContent) return;

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
    if (!wrapper) return;

    wrapper.innerHTML = '';

    const pageCount: number = Math.ceil(items.length / perPage);

    // Определяем, сколько страниц отображать одновременно
    const maxVisibleButtons: number = 3; // Измените это значение по вашему желанию

    let startPage: number;
    let endPage: number;

    // Рассчитываем диапазон страниц
    const maxVisibleBeforeAfter: number = Math.floor(
      (maxVisibleButtons - 1) / 2,
    );
    if (currentPage <= maxVisibleBeforeAfter) {
      // Близкая к началу диапазона
      startPage = 1;
      endPage = Math.min(pageCount, maxVisibleButtons);
    } else if (currentPage + maxVisibleBeforeAfter >= pageCount) {
      // Близкая к концу диапазона
      startPage = Math.max(1, pageCount - maxVisibleButtons + 1);
      endPage = pageCount;
    } else {
      // Где-то в середине
      startPage = currentPage - maxVisibleBeforeAfter;
      endPage = currentPage + maxVisibleBeforeAfter;
    }

    const prevButtonContainer: HTMLDivElement = document.createElement('div');
    // Создаем изображение
    const prevImage: HTMLImageElement = document.createElement('img');
    prevImage.src = './image/reviews/arrow-left.svg'; // Замените на путь к изображению стрелки "Вперед"
    prevImage.alt = 'Previous';
    // Создаем текстовый элемент "Next"
    const prevText: HTMLSpanElement = document.createElement('span');
    prevText.textContent = 'Previous';
    // Добавляем созданные элементы в контейнер
    prevButtonContainer.appendChild(prevText);
    prevButtonContainer.appendChild(prevImage);
    // Добавляем класс к контейнеру
    prevButtonContainer.classList.add('arrow_left');
    // Добавляем обработчик события click
    prevButtonContainer.addEventListener('click', () => {
      const pageCount: number = Math.ceil(items.length / perPage);
      if (pageCount > 1) {
        currentPage--;
        setupPagination(items, wrapper, perPage);
        displayArticles(currentPage, perPage);
      }
    });
    // Добавляем контейнер в родительский элемент (wrapper)
    wrapper.appendChild(prevButtonContainer);

    for (let i: number = startPage; i <= endPage; i++) {
      const btn: HTMLButtonElement = document.createElement('button');
      btn.innerText = i.toString();

      btn.addEventListener('click', () => {
        currentPage = i;
        displayArticles(currentPage, perPage);
        setupPagination(items, wrapper, perPage);
      });

      // Добавляем класс "active" только для текущей кнопки
      btn.classList.toggle('active', i === currentPage);

      wrapper.appendChild(btn);
    }

    if (endPage < pageCount) {
      const ellipsisEnd: HTMLSpanElement = document.createElement('span');
      ellipsisEnd.innerText = '...';
      wrapper.appendChild(ellipsisEnd);

      const lastPageButton: HTMLButtonElement =
        document.createElement('button');
      lastPageButton.innerText = pageCount.toString();
      lastPageButton.addEventListener('click', () => {
        currentPage = pageCount;
        displayArticles(currentPage, perPage);
        setupPagination(items, wrapper, perPage);
      });
      wrapper.appendChild(lastPageButton);
    }

    const nextButtonContainer: HTMLDivElement = document.createElement('div');
    // Создаем текстовый элемент "Next"
    const nextText: HTMLSpanElement = document.createElement('span');
    nextText.textContent = 'Next';
    // Создаем изображение
    const nextImage: HTMLImageElement = document.createElement('img');
    nextImage.src = './image/reviews/arrow-right.svg'; // Замените на путь к изображению стрелки "Вперед"
    nextImage.alt = 'Next';
    // Добавляем созданные элементы в контейнер
    nextButtonContainer.appendChild(nextText);
    nextButtonContainer.appendChild(nextImage);
    // Добавляем класс к контейнеру
    nextButtonContainer.classList.add('arrow_right');
    // Добавляем обработчик события click
    nextButtonContainer.addEventListener('click', () => {
      const pageCount: number = Math.ceil(items.length / perPage);
      if (currentPage < pageCount) {
        currentPage++;
        setupPagination(items, wrapper, perPage);
        displayArticles(currentPage, perPage);
      }
    });
    // Добавляем контейнер в родительский элемент (wrapper)
    wrapper.appendChild(nextButtonContainer);
  }

  displayArticles(currentPage, itemsPerPage);
  setupPagination(articles, pagination, itemsPerPage);

  displayArticles(currentPage, itemsPerPage);
  setupPagination(articles, pagination, itemsPerPage);

  displayArticles(currentPage, itemsPerPage);
  setupPagination(articles, pagination, itemsPerPage);
};
