import React, { useState } from 'react';
import Book from './Book';
import booksData from './data/books';
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

function Home() {
  const [books, setBooks] = useState(booksData)
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

export default Home;
