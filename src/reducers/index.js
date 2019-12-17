import { combineReducers } from 'redux'
import books from './books';
import display from './display';


export default combineReducers({
  books,
  display
})