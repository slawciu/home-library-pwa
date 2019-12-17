import React from 'react';
import Webcam from "react-webcam";
import { useFirebase } from 'react-redux-firebase'
import CameraIcon from '@material-ui/icons/Camera';
import Fab from '@material-ui/core/Fab';

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
    <div className="scannerArea">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={`100%`}
        videoConstraints={videoConstraints}
      />
      <div className="actionButton">
        <Fab onClick={capture} >
          <CameraIcon color="primary"/>
        </Fab>
      </div>
    </div>
  );
};


export default WebcamCapture;