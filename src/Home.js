import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './App.css';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

function Home() {
  useFirestoreConnect([
    { collection: 'books' }
  ])
  const books = useSelector(state => state.firestore.ordered.books)
  return (
      <div>
        <div className="actionButton">
          <Fab href="/add">
            <AddIcon color="primary"/>
          </Fab>
        </div>
        <div>
            Książki
            {books && books.map(item => (
            <Book key={item.id} book={item} />
            ))}
      </div>
    </div>
  );
}

export default connect(
  state => {
    return {firestore: state.firestore}
  }, dispatch => ({})
)(Home);
