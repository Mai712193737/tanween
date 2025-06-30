function truncateDescription(element) {
    const fullText = element.textContent;
    const charLimit = 120;

    if (fullText.length > charLimit) {
        const truncatedText = fullText.slice(0, charLimit) + '...';
        element.textContent = truncatedText;

        const btn = document.createElement('button');
        btn.className = 'show-more-btn';
        btn.textContent = 'أظهر المزيد';

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            element.textContent = fullText;
            btn.remove();
        });

        element.parentNode.appendChild(btn);
    }
}


function createResultCard(book) {
    const card = document.createElement('div');
    card.className = 'search-result-card';

    card.innerHTML = `
      <img src="/assets/covers/${book.cover}" alt="${book.title}" class="search-result-cover">
      <div class="search-result-info">
        <h3 class="search-result-title">${book.title}</h3>
        <p class="search-result-author">${book.author}</p>
        <p class="search-result-description">${book.description || 'No description available'}</p>
      </div>
    `;

    card.addEventListener('click', () => {
        window.location.href = `/pages/book-page.html?id=${book.id}`;
    });

    const descEl = card.querySelector('.search-result-description');
    truncateDescription(descEl);


    return card;
}


function displaySearchResults(books, container) {
    container.innerHTML = '';

    if (books.length === 0) {
        container.innerHTML = '<div class="no-results">لا يوجد كتب تناسب هذا البحث</div>';
        container.style.display = 'block';
        return;
    }

    books.forEach(book => {
        const resultCard = createResultCard(book);
        container.appendChild(resultCard);
    });

    container.style.display = 'block';
}


function searchAndDisplay(array, term, container) {

        if (term.length === 0) {
            container.style.display = 'none';
            return;
        }

        const filteredBooks = array.filter(book =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term) ||
            book.description.toLowerCase().includes(term) ||
            book.genre.toLowerCase().includes(term)
        );

        displaySearchResults(filteredBooks, container);
}


document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    let allBooks = [];

    fetch('/data/books.json')
        .then(response => response.json())
        .then(books => {
            ['click', 'input'].forEach(event => {
                searchBar.addEventListener(event, function () {
                    const searchTerm = this.value.toLowerCase().trim();
            
                    searchAndDisplay(books, searchTerm, searchResults)
                });
                
            });
        })
        .catch(error => console.error('Error loading books:', error));

    document.addEventListener('click', function (e) {
        if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
});
