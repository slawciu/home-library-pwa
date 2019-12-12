import React, { useState } from 'react';
import Home from './Home';
import AddNewBook from './AddNewBook';

import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
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
      <Header />
        <div className="content">
          <Switch>
            <Route path="/add" component={AddNewBook} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
      
  );
}

export default App;
