import {addBookStates} from '../../actions/books'

const books = (state = {list: [], addBookState: addBookStates.NONE}, action) => {
  switch (action.type) {
    case 'CHANGE_ADD_BOOK_STATE':
      return {
        ...state,
        addBookState: action.payload
      }
    default:
      return state
  }
}

export default books