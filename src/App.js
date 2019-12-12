import React, { useState } from 'react';
import Home from './Home';
import AddNewBook from './AddNewBook';
import booksData from './data/books';

import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

function App() {
  return (
    <Router>
    <div className="App">

      <header className="App-header">
        <p>
          Biblioteka Morisków
        </p>
      </header>
      <Switch>
          <Route path="/add">
            <AddNewBook />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
    </Router>
      
  );
}

export default App;
