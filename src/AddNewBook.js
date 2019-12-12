import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
// import Scanner from './Scanner';
// import ReactQuagga, {useQuagga} from './ReactQuagga';
import './App.css';
import {addBook} from './actions/books';

function AddNewBook(props) {
  // const [scannerIsActive, setScannerIsActive] = useState(false)
  // const [results, setResults] = useState([])
  // const scannerSupported = useQuagga()
  const [state, setState] = useState({
    title: '',
    author: '',
    isbn: '',
    location: 'Imielin'
  })

  const {title, author, isbn, location} = state;

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <form className="addNewBookForm" noValidate autoComplete="off">
        <TextField variant="standard" label="Tytuł" value={title} onChange={handleChange('title')} />
        <TextField variant="standard" label="Autor" value={author} onChange={handleChange('author')} />
        <TextField variant="standard" label="ISBN" value={isbn} onChange={handleChange('isbn')} />
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Lokalizacja</InputLabel>
          <NativeSelect
            value={location}
            onChange={handleChange('location')}
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
      <Fab onClick={() => { props.addBook(state); props.history.push('/')}} >
        <SaveIcon color="primary"/>
      </Fab>
      </div>
     
      {/* <div>
        Status: {results.length > 0 && results[results.length - 1].codeResult.code}
      </div>
      <div className="scannerArea">
        <ReactQuagga
                onDetected={(data) => setResults(results => ([...results, data]))}
              />
      </div> */}
    </div>
  )
}

export default connect(state => ({}), dispatch => ({
  addBook: book => dispatch(addBook(book))
}))(AddNewBook);
