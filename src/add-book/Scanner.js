import React, { useState } from 'react';
import ReactQuagga from '../camera/ReactQuagga';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';

function Scanner(props) {
  const [isbn, setIsbn] = useState('');
  const [mode, setMode] = useState('camera')

  return (
    <>
      {mode === 'camera' ? (
        <div className="scannerArea">
          <ReactQuagga
            onDetected={data => props.onDetected(data.codeResult.code)}
          />
          <div className="actionButton">
            <Fab onClick={() => setMode('manual')} >
              <EditIcon color="primary"/>
            </Fab>
          </div>
        </div>
      ) : (
        <div className="manualIsbnInput">
          <TextField 
            autoFocus
            variant="standard"
            label="ISBN" 
            value={isbn} 
            onChange={async event => {
              setIsbn(event.target.value);
              if (event.target.value.length === 13) {
                props.onDetected(event.target.value)
              }
            }} />
          <div className="actionButton">
            <Fab onClick={() => setMode('camera')} >
              <CenterFocusWeakIcon color="primary"/>
            </Fab>
          </div>
        </div>
      )}
      </>
  );
}

export default Scanner;