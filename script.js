let library = [];
const booksSection = document.querySelector('#books');

class Book {
	constructor(title = 'Unknown', author = 'Unknown', pages = 'Unknown', isRead = false) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}

function addBookToLibrary(bookInformation) {
	const { title, author, pages, isRead } = bookInformation;
	const newBook = new Book(title, author, pages, isRead);
	library.push(newBook);
	updateLocalStorage(newBook);
	displayBook(newBook);
}

function displayBook(newBook) {
	const bookCard = createBookCard(newBook);
	booksSection.appendChild(bookCard);
}

function createBookCard(newBook) {
	const bookCard = document.createElement('div');
	const title = document.createElement('p');
	const author = document.createElement('p');
	const pages = document.createElement('p');
	const buttonsDiv = document.createElement('div');
	const readButton = document.createElement('button');
	const removeButton = document.createElement('button');

	title.textContent = `"${newBook.title}"`;
	author.textContent = newBook.author;
	pages.textContent = `${newBook.pages} pages`;
	title.textContent = `"${newBook.title}"`;
	readButton.textContent = newBook.isRead ? 'Read' : 'Not Read';
	removeButton.textContent = 'Remove Book';

	bookCard.classList.add('book-card');
	title.classList.add('book-title');
	author.classList.add('book-author');
	pages.classList.add('book-pages');
	buttonsDiv.classList.add('book-buttons');
	newBook.isRead
		? readButton.classList.add('book-read-button', 'read')
		: readButton.classList.add('book-read-button');
	removeButton.classList.add('book-remove-button');

	readButton.onclick = toggleRead;
	removeButton.onclick = removeBook;

	bookCard.appendChild(title);
	bookCard.appendChild(author);
	bookCard.appendChild(pages);
	bookCard.appendChild(buttonsDiv);
	buttonsDiv.appendChild(readButton);
	buttonsDiv.appendChild(removeButton);

	return bookCard;
}

function removeBook(e) {
	const btn = e.target;
	const bookCard = btn.closest('.book-card');
	const bookTitle = bookCard.children[0].textContent;
	library = library.filter(book => '"' + book.title + '"' !== bookTitle);
	localStorage.setItem('library', JSON.stringify(library));
	bookCard.remove();
}

function toggleRead(e) {
	const btn = e.target;
	const bookCard = btn.closest('.book-card');
	btn.classList.toggle('read');
	const bookTitle = bookCard.children[0].textContent;
	let newLibrary = [];
	library.forEach(book => {
		if ('"' + book.title + '"' == bookTitle) {
			book.isRead = !book.isRead;
			btn.textContent = book.isRead ? 'Read' : 'Not Read';
			newLibrary.push(book);
		} else {
			newLibrary.push(book);
		}
	});
	localStorage.setItem('library', JSON.stringify(newLibrary));
}

function updateLocalStorage(newBook) {
	if (localStorage.key('library')) {
		let oldLibrary = JSON.parse(localStorage.getItem('library'));
		oldLibrary.push(newBook);
		localStorage.setItem('library', JSON.stringify(oldLibrary));
	}
	localStorage.setItem('library', JSON.stringify(library));
}

function loadLocalStorage() {
	if (!localStorage.key('library')) return;
	let localLibrary = JSON.parse(localStorage.getItem('library'));
	localLibrary.forEach(book => addBookToLibrary(book));
}

window.addEventListener('load', () => {
	loadLocalStorage();
});

// Helper Function To Fill The Page
function addBooks(num = 6) {
	for (let i = 0; i < num; i++) {
		const pages = Math.round(Math.random() * 300);
		const read = Math.random() > 0.5 ? true : false;
		addBookToLibrary({ title: `Book About A Topic ${i + 1}`, author: `Burak Onat`, pages, isRead: read });
	}
}

// Submit New Book
const bookForm = document.querySelector('.book-form');

bookForm.addEventListener('submit', e => {
	e.preventDefault();
	if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
		showError();
		return;
	}
	const bookInformation = getFormData(e);
	addBookToLibrary(bookInformation);
	closeModal(modal);
	bookForm.reset();
});

function getFormData(e) {
	const form = e.target;
	const title = form[0].value;
	const author = form[1].value;
	const pages = form[2].value;
	const isRead = form[3].checked;
	const bookInformation = { title, author, pages, isRead };
	return bookInformation;
}

// Modal Functionality
const openModalButton = document.querySelector('[data-open-modal]');
const closeModalButton = document.querySelector('[data-close-modal]');
const modal = document.querySelector('.modal');
const overlay = document.getElementById('overlay');

openModalButton.addEventListener('click', () => {
	openModal(modal);
});

closeModalButton.addEventListener('click', () => {
	closeModal(modal);
});

function openModal(modal) {
	if (modal == null) return;
	modal.classList.add('active');
	overlay.classList.add('active');
}

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove('active');
	overlay.classList.remove('active');
}

overlay.addEventListener('click', () => {
	closeModal(modal);
});

// Form Validation
const title = document.getElementById('title');
const titleError = document.querySelector('#title + .error');

const author = document.getElementById('author');
const authorError = document.querySelector('#author + .error');

const pages = document.getElementById('pages');
const pagesError = document.querySelector('#pages + .error');

title.addEventListener('input', event => {
	if (title.validity.valid) {
		titleError.textContent = '';
		titleError.className = 'error';
	} else {
		showError();
	}
});

author.addEventListener('input', event => {
	if (title.validity.valid) {
		authorError.textContent = '';
		authorError.className = 'error';
	} else {
		showError();
	}
});

pages.addEventListener('input', event => {
	if (title.validity.valid) {
		pagesError.textContent = '';
		pagesError.className = 'error';
	} else {
		showError();
	}
});

function showError() {
	if (title.validity.valueMissing) {
		titleError.textContent = 'You need to enter a title.';
		titleError.className = 'error active';
	}
	if (author.validity.valueMissing) {
		authorError.textContent = 'You need to enter an author.';
		authorError.className = 'error active';
	}
	if (pages.validity.valueMissing) {
		pagesError.textContent = 'You need to enter the pages.';
		pagesError.className = 'error active';
	}
}
