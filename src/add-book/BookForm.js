import React, { useState } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import SaveIcon from '@material-ui/icons/Save';
import { withFirestore, withFirebase } from 'react-redux-firebase'

function BookForm(props) {
  const [isbn, setIsbn] = useState(props.isbn);
  const [title, setTitle] = useState(props.title);
  const [author, setAuthor] = useState(props.author);
  const [location, setLocation] = useState('Gliwice');
  const [condition, setCondition] = useState('OK');

  return (
    <div>
      <form className="addNewBookForm" noValidate autoComplete="off">
        <TextField
          variant="standard"
          label="ISBN"
          value={isbn}
          type="number"
          onChange={event => setIsbn(event.target.value)}
        />
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
        <FormControl>
          <InputLabel htmlFor="condition-native-simple">Stan</InputLabel>
          <NativeSelect
            value={condition}
            onChange={event => setCondition(event.target.value)}
            inputProps={{
              name: 'condition',
              id: 'condition-native-simple',
            }}
          >
            <option value={'OK'}>OK</option>
            <option value={'Nówka'}>Nówka</option>
            <option value={'RozpadaSię'}>Rozpada się</option>
          </NativeSelect>
        </FormControl>
      </form>
      <div className="actionButton">
        <Fab onClick={() => props.onActionClicked({ author, title, location, condition, isbn: props.isbn })}>
          <SaveIcon color="primary" />
        </Fab>
      </div>
    </div>
  );
}
const Connected = connect(state => ({
  isbn: state.app.books.scannedIsbn,
  author: state.app.books.author,
  title: state.app.books.title,
}), dispatch => ({
}))(BookForm)
export default withFirebase(withFirestore(Connected));