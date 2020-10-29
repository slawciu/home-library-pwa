const isCameraAvailable = async () => {

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return false;
  }

  let checking = ["videoinput"];
  let deviceExists = await navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      return devices.some((device) => (device.kind === checking[0]));
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
      return false;
    });

  if (!deviceExists) { return false; }

  let constraints = { audio: true, video: true };
  return navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => { return true })
    .catch((err) => {
      if (err.name === "NotAllowedError") {
        console.log("User has denied accessed");
        return false;
      }
    });

}
export default isCameraAvailable;