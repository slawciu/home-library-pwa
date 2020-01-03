import React, { useState } from 'react';
import { withFirestore, withFirebase } from 'react-redux-firebase'
import { 
  lendBookStates,
  changeLendBookState,
  setScannedIsbn,
  searchInFirestore
 } from '../actions/books'; 
import {connect} from 'react-redux';
import Scanner from '../add-book/Scanner';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';

function BorrowerForm(props) {
  const [bookHolder, setBookHolder] = useState('')
  return (
    <div>
      <TextField variant="standard" label="Wypożyczający" value={bookHolder} onChange={event => setBookHolder(event.target.value)} />
      <div className="actionButton">
        <Fab onClick={() => props.onActionClicked({bookHolder})}>
          <SaveIcon color="primary" />
        </Fab>
      </div>
    </div>
  )
}

function LendBook(props) {
  const [book, setBook] = useState(null)
  const {step} = props;

  const lendBook = async (bookHolder) => {
    const currentUser = props.firebase.auth().currentUser
    const loanRef = await props.firestore.add('loans', {
      ...bookHolder,
      borrowedBy: currentUser.displayName,
      timestamp: new Date().toISOString(),
      returned: null,
      bookId: book.id,
      isbn: book.isbn
    })

    const bookRef = await props.firestore.collection('books').doc(book.id);
    bookRef.update({
      loanId: loanRef.id
    })
  }

  const onIsbnDetected = async isbn => { 
    navigator.vibrate([200])
    const existingBook = await props.searchBookDetails(isbn, props.firestore);
    setBook({id: existingBook.id, isbn: existingBook.isbn})
    props.changeLendBookState(lendBookStates.FILL_BORROWER_INFO);
  }

  const renderStep = step => {
    switch(step) {
      case lendBookStates.SCAN_ISBN:
        return (
          <Scanner
            onDetected={onIsbnDetected}
          />
        );
      case lendBookStates.FILL_BORROWER_INFO:
        return (
          <BorrowerForm
            onActionClicked={bookHolder => { 
              lendBook(bookHolder);
              props.changeLendBookState(lendBookStates.NONE);
              props.setScannedIsbn(''); 
              setBook(null)
            }} />
        );
      case lendBookStates.NONE:
        props.changeLendBookState(lendBookStates.SCAN_ISBN)
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
    step: state.app.books.lendBookState
  }), dispatch => ({
    setScannedIsbn: isbn => dispatch(setScannedIsbn(isbn)),
    searchBookDetails: (isbn, firestore) => searchInFirestore(isbn, firestore),
    changeLendBookState: state => dispatch(changeLendBookState(state))
  })
)(LendBook)));
