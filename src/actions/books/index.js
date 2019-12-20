export const addBookStates = {
  NONE: 'NONE',
  SCAN_ISBN: 'SCAN_ISBN',
  FILL_BOOK_INFO: 'FILL_BOOK_INFO',
  TAKE_PHOTO: 'TAKE_PHOTO'
}

export const changeAddBookState = newState => ({
  type: 'CHANGE_ADD_BOOK_STATE',
  payload: newState
})

export const addBook = book => ({
  type: 'ADD_BOOK',
  payload: book
})

