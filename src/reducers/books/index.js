import {
  addBookStates,
  lendBookStates
} from '../../actions/books'

const books = (state = {
  list: [], 
  addBookState: addBookStates.NONE,
  lendBookState: lendBookStates.NONE,
  scannedIsbn: ''
}, action) => {
  switch (action.type) {
    case 'CHANGE_ADD_BOOK_STATE':
      return {
        ...state,
        addBookState: action.payload
      }
    case 'CHANGE_LEND_BOOK_STATE':
      return {
        ...state,
        lendBookState: action.payload
      }
    case 'SET_ISBN':
    case 'SET_SCANNED_ISBN':
      return {
        ...state,
        scannedIsbn: action.payload
      }
    case 'SET_AUTHOR':
    case 'SET_FOUND_AUTHOR':
      return {
        ...state,
        author: action.payload
      }
    case 'SET_TITLE':
    case 'SET_FOUND_TITLE':
      return {
        ...state,
        title: action.payload
      }
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

export default books