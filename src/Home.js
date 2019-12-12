import React, { useState } from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

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
  const [books, setBooks] = useState(props.booksData)
  return (
      <div>
        <div className="actionButton">
          <Fab href="/add">
            <AddIcon color="primary"/>
          </Fab>
        </div>
        <div>
            Książki
            {books.map(item => (
            <Book key={item.id} book={item} />
            ))}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    booksData: state.books
  }), dispatch => ({})
)(Home);
