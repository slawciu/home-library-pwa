import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactQuagga from './ReactQuagga';
import { withFirestore, withFirebase } from 'react-redux-firebase'
import './App.css';
import WebcamCapture from "./WebcamCapture";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { addBookStates, changeAddBookState } from './actions/books' 
import {connect} from 'react-redux';

function AddNewBook(props) {
  const [results, setResults] = useState({});
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Gliwice');
  const [fileName, setFileName] = useState('');
  const {changeStep, step} = props;

  const addNewBook = book => {
    const currentUser = props.firebase.auth().currentUser
    const metadata = {
      name: currentUser.displayName,
      time: new Date().toISOString(),
      uid: currentUser.uid,
      fileName: fileName
    }

    props.firestore.add('books', {...book, metadata})
  }

  const searchBookDetails = async isbn => {
    const uri = `https://www.googleapis.com/books/v1/volumes?q=isbn%3d${isbn}&key=AIzaSyDbWJY0AUKjfJKBAv7ORWzRL3imE2TU1kk`;
    const response = await fetch(uri)
    const bookInfo = await response.json();
    if (bookInfo.items && bookInfo.items.length > 0) {
      let title = bookInfo.items[0].volumeInfo.title;
      let author = bookInfo.items[0].volumeInfo.authors[0];

      setTitle(title);
      setAuthor(author);
    }
  }

  const selectScannedIsbn = isbn => {
    searchBookDetails(isbn); 
    setIsbn(isbn); 
    changeStep(addBookStates.TAKE_PHOTO);
  }

  const renderStep = step => {
    switch(step) {
      case addBookStates.SCAN_ISBN:
        return (
          <div className="scannerArea">
            <ReactQuagga
              onDetected={(data) => { 
                setResults({...results, [data.codeResult.code]: data});
                navigator.vibrate([200])
                selectScannedIsbn(data.codeResult.code)
              }}
            />
            {/* <List component="nav" aria-label="secondary mailbox folders">
              {Object.keys(results).map(code => {
                return (
                  <ListItem button key={code} onClick={() => selectScannedIsbn(code)}>
                    <ListItemText primary={code} />
                  </ListItem>
                )
              })}
            </List> */}
            <div className="actionButton">
              <Fab onClick={() => changeStep(addBookStates.TAKE_PHOTO)} >
                <CloseIcon color="primary"/>
              </Fab>
            </div>
          </div>
        );
      case addBookStates.FILL_BOOK_INFO:
        return (
          <div>
            <form className="addNewBookForm" noValidate autoComplete="off">
              <TextField variant="standard" label="ISBN" value={isbn} onChange={async event => {
                setIsbn(event.target.value);
                if (event.target.value.length === 13) {
                  await searchBookDetails(event.target.value)
                }
              }} />
              <TextField variant="standard" label="Tytuł" value={title} onChange={event => setTitle(event.target.value)} />
              <TextField variant="standard" label="Autor" value={author} onChange={event => setAuthor(event.target.value)} />
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Lokalizacja</InputLabel>
                <NativeSelect
                  value={location}
                  onChange={event => setLocation(event.target.value)}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option value={'Gliwice'}>Gliwice</option>
                  <option value={'Imielin'}>Imielin</option>
                  <option value={'Kraków'}>Kraków</option>
                </NativeSelect>
              </FormControl>
            </form>
            <div className="actionButton">
              <Fab onClick={() => { 
                addNewBook({author, title, location, isbn});
                changeStep(addBookStates.NONE)
                props.history.push('/')}
                } >
                <SaveIcon color="primary"/>
              </Fab>
            </div>
          </div>
        );
      case addBookStates.TAKE_PHOTO:
        return (
          <div>
            <WebcamCapture onScanComplete={file => { 
              setFileName(file);
              changeStep(addBookStates.FILL_BOOK_INFO);
              }} 
            />
          </div>);
      case addBookStates.NONE:
        changeStep(addBookStates.SCAN_ISBN)
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
    changeStep: step => dispatch(changeAddBookState(step))
  })
)(AddNewBook)));
