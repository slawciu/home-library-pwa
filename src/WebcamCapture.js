import React, { useState } from 'react';
import Webcam from "react-webcam";
import { useFirebase } from 'react-redux-firebase'

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "environment"
};
 
const WebcamCapture = (props) => {
  const firebase = useFirebase();

  const webcamRef = React.useRef(null);
 
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const storageRef = firebase.storage().ref('bookCovers');
      const fileName = `cover-${new Date().toISOString()}.jpg`;
      const fileRef = storageRef.child(fileName);
      fileRef.putString(imageSrc, 'data_url')
        .then(x => console.log('uploaded', x))
        .catch(e => console.log(e));

      props.onScanComplete(fileName)
    },
    [webcamRef]
  );
 
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};


export default WebcamCapture;