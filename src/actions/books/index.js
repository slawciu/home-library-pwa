export const addBookStates = {
  NONE: 'NONE',
  SCAN_ISBN: 'SCAN_ISBN',
  FILL_BOOK_INFO: 'FILL_BOOK_INFO',
  TAKE_PHOTO: 'TAKE_PHOTO'
}

export const lendBookStates = {
  FILL_BORROWER_INFO: 'FILL_BORROWER_INFO',
  NONE: 'NONE',
  SCAN_ISBN: 'SCAN_ISBN'
}

export const changeLendBookState = newState => ({
  type: 'CHANGE_LEND_BOOK_STATE',
  payload: newState
});

export const changeAddBookState = newState => ({
  type: 'CHANGE_ADD_BOOK_STATE',
  payload: newState
});

export const addBook = book => ({
  type: 'ADD_BOOK',
  payload: book
});

export const setTitle = title => ({
  type: 'SET_TITLE',
  payload: title
})

export const setAuthor = author => ({
  type: 'SET_AUTHOR',
  payload: author
})

export const setIsbn = isbn => ({
  type: 'SET_ISBN',
  payload: isbn
})

export const setScannedIsbn = isbn => ({
  type: 'SET_SCANNED_ISBN',
  payload: isbn
});

export const setFoundAuthor = author => ({
  type: 'SET_FOUND_AUTHOR',
  payload: author
});

export const setFoundTitle = title => ({
  type: 'SET_FOUND_TITLE',
  payload: title
});

export const setLocation = location => ({
  type: 'SET_LOCATION',
  payload: location
})

export const searchInFirestore = async (isbn, firestore) => {
  const booksRef = firestore.collection('books');
  const existingBook = await booksRef.where('isbn', '==', isbn)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return null;
        } 
        const doc = snapshot
        .docs[0];
        return {
          ...doc.data(),
          id: doc.id
        }});
  return existingBook;
}

export const searchBookDetails = isbn => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const existingBook = await searchInFirestore(isbn, firebase.firestore())
  
    let title = '';
    let author = '';
  
    if (existingBook) {
      title = existingBook.title;
      author = existingBook.author;  
    } else {
      const uri = `https://www.googleapis.com/books/v1/volumes?q=isbn%3d${isbn}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await fetch(uri);
      const bookInfo = await response.json();
      if (bookInfo.items && bookInfo.items.length > 0) {
        title = bookInfo.items[0].volumeInfo.title;
        author = bookInfo.items[0].volumeInfo.authors[0];
      }
    }
    dispatch(setScannedIsbn(isbn));
    dispatch(setFoundAuthor(author));
    dispatch(setFoundTitle(title));
  }
}