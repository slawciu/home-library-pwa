import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { createStore, combineReducers } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';
import appReducers from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
const fbConfig = {
    apiKey: "AIzaSyC1SYzLVPqPgyIdILz8-gF7TMVGFNLd1e8",
    authDomain: "home-library-pwa.firebaseapp.com",
    databaseURL: "https://home-library-pwa.firebaseio.com",
    projectId: "home-library-pwa",
    storageBucket: "home-library-pwa.appspot.com",
    messagingSenderId: "670201732515",
    appId: "1:670201732515:web:1aa86f884f84a90e7a0e16",
    measurementId: "G-VCPJFT8GSV"
}

// react-redux-firebase config
const rrfConfig = {
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
try {
  firebase.initializeApp(fbConfig)
} catch(e) { console.log(e) }
firebase.firestore().enablePersistence();
// Add firebase to reducers
const rootReducer = combineReducers({
  app: appReducers,
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
