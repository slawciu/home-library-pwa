import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactQuagga, {useQuagga} from './ReactQuagga';
import { withFirestore, withFirebase } from 'react-redux-firebase'
import './App.css';
import WebcamCapture from "./WebcamCapture";

const SCAN_ISBN = 'SCAN_ISBN';
const FILL_BOOK_INFO = 'FILL_BOOK_INFO';
const TAKE_PHOTO = 'TAKE_PHOTO';

function AddNewBook(props) {
  const [results, setResults] = useState([]);
  const scannerSupported = useQuagga();
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Gliwice');
  const [fileName, setFileName] = useState('');
  const [step, changeStep] = useState(SCAN_ISBN)

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
    if (bookInfo.items.length > 0) {
      let title = bookInfo.items[0].volumeInfo.title;
      let author = bookInfo.items[0].volumeInfo.authors[0];

      setTitle(title);
      setAuthor(author);
    }
  }

  const renderStep = step => {
    switch(step) {
      case SCAN_ISBN:
        return (
          <div className="scannerArea">
            <ReactQuagga
              onDetected={(data) => {setResults(results => ([...results, data])); searchBookDetails(data.codeResult.code); setIsbn(data.codeResult.code)}}
            />
            <div className="actionButton">
              <Fab onClick={() => changeStep(TAKE_PHOTO)} >
                <CloseIcon color="primary"/>
              </Fab>
            </div>
          </div>
        );
      case FILL_BOOK_INFO:
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
                </NativeSelect>
              </FormControl>
            </form>
            <div className="actionButton">
              <Fab onClick={() => { addNewBook({author, title, location, isbn}); props.history.push('/')}} >
                <SaveIcon color="primary"/>
              </Fab>
            </div>
          </div>
        );
      case TAKE_PHOTO:
        return (
          <div>
            <WebcamCapture onScanComplete={file => { 
              setFileName(file);
              changeStep(FILL_BOOK_INFO);
              }} 
            />
          </div>);
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

export default withFirebase(withFirestore(AddNewBook));
