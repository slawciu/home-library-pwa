import React from 'react';
import Home from './Home';
import Fallback from './Fallback';
import AddNewBook from './AddNewBook';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/add" component={AddNewBook} />
            <Route path="/fallback" component={Fallback} />
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
