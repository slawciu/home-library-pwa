import React, { useState } from 'react';
import { withFirestore, withFirebase } from 'react-redux-firebase'
import WebcamCapture from "../camera/WebcamCapture";
import {
  addBookStates,
  changeAddBookState,
  setScannedIsbn,
  searchBookDetails
} from '../actions/books';
import { connect } from 'react-redux';
import Scanner from './Scanner';
import BookForm from './BookForm';

function AddNewBook(props) {
  const [fileName, setFileName] = useState('');
  const { step } = props;

  const addNewBook = book => {
    const currentUser = props.firebase.auth().currentUser
    const metadata = {
      name: currentUser.displayName,
      time: new Date().toISOString(),
      uid: currentUser.uid,
      fileName: fileName
    }

    props.firestore.add('books', { ...book, metadata })
  }

  const onIsbnDetected = isbn => {
    navigator.vibrate([200])
    props.searchBookDetails(isbn);
    props.setScannedIsbn(isbn);
    props.changeAddBookState(addBookStates.TAKE_PHOTO);
  }
  const renderStep = step => {
    switch (step) {
      case addBookStates.SCAN_ISBN:
        return (
          <Scanner
            onDetected={onIsbnDetected}
          />
        );
      case addBookStates.FILL_BOOK_INFO:
        return (
          <BookForm
            onActionClicked={bookInfo => {
              addNewBook(bookInfo);
              props.changeAddBookState(addBookStates.NONE)
              props.history.push('/')
            }} />
        );
      case addBookStates.TAKE_PHOTO:
        return (
          <div>
            <WebcamCapture onScanComplete={file => {
              setFileName(file);
              props.changeAddBookState(addBookStates.FILL_BOOK_INFO);
            }}
            />
          </div>);
      case addBookStates.NONE:
        props.changeAddBookState(addBookStates.SCAN_ISBN)
        break;
      default:
        return <span />
    }
  }

  return (
    <div>
      {renderStep(step)}
    </div>
  )
}

export default withFirebase(withFirestore(connect(
  state => ({
    step: state.app.books.addBookState
  }), dispatch => ({
    changeStep: step => dispatch(changeAddBookState(step)),
    setScannedIsbn: isbn => dispatch(setScannedIsbn(isbn)),
    searchBookDetails: isbn => dispatch(searchBookDetails(isbn)),
    changeAddBookState: state => dispatch(changeAddBookState(state))
  })
)(AddNewBook)));
