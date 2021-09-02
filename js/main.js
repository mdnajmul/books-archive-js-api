const searchField = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
const bookDetailsContainer = document.getElementById('book-details');
const totalResultField = document.getElementById('total-result');
const errorField = document.getElementById('error');


searchButton.addEventListener('click', function(){

    // clear book details container
    bookDetailsContainer.innerHTML = '';
    //clear total result field
    totalResultField.innerHTML = '';
    //clear error field
    errorField.innerHTML = '';

    const searchInputValue = searchField.value;

    if(searchInputValue === ''){
        errorField.innerHTML = `<h1 class="text-center mt-3 text-danger">Please write any book name!</h1>`;
        return;
    }
    
    const url = `https://openlibrary.org/search.json?q=${searchInputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showBookDetails(data))
    .finally(() => searchField.value = '');
});


const showBookDetails = books => {
    totalResultField.innerHTML = `<h1 class="text-center mt-3 mb-5 text-success"><strong>Total Search Result: </strong>${books.numFound ? books.numFound : 0}</h1>`;
    let booksArray = books.docs;
    if(booksArray.length > 21){
        booksArray = booksArray.slice(0,21);
    }

    if(booksArray.length === 0){
        errorField.innerHTML = `<h1 class="text-center mt-3 text-danger">No Result Found!</h1>`;
        return;
    }
    booksArray.forEach(book => {
        let imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        if(!book.cover_i){
            imgUrl = "images/default-cover.jpg";
        }

        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML = `
            <!-- Image -->
            <div class="rounded overflow-hidden border p-2 text-center">
                <img src="${imgUrl}" class="w-50" alt=""/>
            </div>
            <!-- Body -->
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
                <p><strong>Book:</strong> ${book.title}</p>
                <p><strong>Author:</strong> ${book.author_name ? book.author_name['0'] : 'Not Found'}</p>
                <p><strong>First Published Year:</strong> ${book.first_publish_year ? book.first_publish_year : 'Not Found'}</p>
            </div>
        `;
        bookDetailsContainer.appendChild(div);
    });
};