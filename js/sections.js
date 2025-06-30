function organizeBooksByGenre(books) {
    const booksByGenre = {};
    books.forEach(book => {
        if (!booksByGenre[book.genre]) {
            booksByGenre[book.genre] = [];
        }
        booksByGenre[book.genre].push(book);
    });
    
    return booksByGenre;
}


function addBooksToGenresSections(genres) {
    const container = document.getElementById('sections-container');

    for (const genre in genres) {
        const section = document.createElement('div');
        section.className = 'genre-section';

        const title = document.createElement('h2');
        title.className = 'genre-title';
        title.textContent = genre;
        section.appendChild(title);

        const booksContainer = document.createElement('div');
        booksContainer.className = 'books-container';

        genres[genre].forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.style.background = `
            linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%),
            url(/assets/covers/${book.cover})
            `;
            bookCard.style.backgroundSize = 'cover';
            bookCard.style.backgroundPosition = 'center'

            const titleElement = document.createElement('div');
            titleElement.className = 'book-title';
            titleElement.textContent = book.title;

            const authorElement = document.createElement('div');
            authorElement.className = 'book-author';
            authorElement.textContent = book.author;

            bookCard.appendChild(titleElement);
            bookCard.appendChild(authorElement);

            bookCard.addEventListener('click', () => {
                window.location.href = `/pages/book-page.html?id=${book.id}`;
            });

            booksContainer.appendChild(bookCard);
        });

        section.appendChild(booksContainer);

        const viewAll = document.createElement('div');
        viewAll.className = 'view-all';
        viewAll.innerHTML = `<a href="/pages/genre.html?genre=${genre}">عرض الكل →</a>`;
        section.appendChild(viewAll);

        container.appendChild(section);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    fetch('/data/books.json')
        .then(response => response.json())
        .then(data => {
            const genres = organizeBooksByGenre(data);
            addBooksToGenresSections(genres)
        })
        .catch(error => {
            console.error('Error loading books:', error);
            document.getElementById('books-container').innerHTML =
                '<p class="error">حدث خطأ في تحميل الكتب. يرجى المحاولة لاحقاً.</p>';
        });
});