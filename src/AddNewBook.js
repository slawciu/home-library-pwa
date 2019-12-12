import React, { useState } from 'react';
// import Scanner from './Scanner';
import ReactQuagga, {useQuagga} from './ReactQuagga';

function AddNewBook() {
  // const [scannerIsActive, setScannerIsActive] = useState(false)
  // const [results, setResults] = useState([])
  // const scannerSupported = useQuagga()

  // console.log(results)
  return (
    <div>
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

export default AddNewBook;
