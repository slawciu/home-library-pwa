import React, {useState, useEffect} from 'react';
import Home from './Home';
import Fallback from './Fallback';
import AddNewBook from './AddNewBook';
import { withFirebase } from 'react-redux-firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Header';
import './App.css';

function App(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  useEffect(() => {
    return props.firebase.auth().onAuthStateChanged(
      user => {
        setIsSignedIn(!!user)})
  })
  
  return (
    <Router>
      <div className="App">
        <Header isSignedIn={isSignedIn} />
        <div className="content">
        {isSignedIn !== undefined && !isSignedIn && <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={props.firebase.auth()}/>
          </div>}
          {isSignedIn && <Switch>
            <Route path="/add" component={AddNewBook} />
            <Route path="/fallback" component={Fallback} />
            <Route path="/" component={Home} />
          </Switch>}
        </div>
      </div>
    </Router>
      
  );
}

export default withFirebase(App);
