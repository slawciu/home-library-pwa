import React, { useState } from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home(props) {
  useFirestoreConnect([
    { collection: 'books' }
  ])
  const books = useSelector(state => state.firestore.ordered.books)
  console.log(books)
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
    console.log(state.firestore)
    return {firestore: state.firestore}
  }, dispatch => ({})
)(Home);
