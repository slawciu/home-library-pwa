import { useEffect, useState } from 'react'

const mediaDeviceSupported = () => {
  const { mediaDevices } = navigator
  if(mediaDevices && (typeof mediaDevices.getUserMedia === 'function')) {
    return true
  }
  else {
    return false
  }
}

const getVideoDevices = async () => {
  if(!mediaDeviceSupported()) return []
  const videoDevices = []
  const devices = await navigator.mediaDevices.enumerateDevices()
  devices.forEach(device => {
    if(device.kind === 'videoinput') {
      videoDevices.push(device)
    }
  })
  return videoDevices
}

export const useQuagga = () => {
  const [scannerSupported, setScannerSupported] = useState(false)

  useEffect(() => {
    getVideoDevices()
      .then(devices => setScannerSupported(devices.length > 0))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return scannerSupported
}

export const DEFAULT_CONFIG = {
  inputStream : {
    name : "Live",
    type : "LiveStream",
    constraints: {
    width: 1920,
    height: 1080,
    facingMode: "environment",
  },
  area: { // defines rectangle of the detection/localization area
    top: "0%",    // top offset
    right: "0%",  // right offset
    left: "0%",   // left offset
    bottom: "0%"  // bottom offset
  },
  singleChannel: false
  },
  decoder : {
    readers : [
      "ean_reader",
    ],
    debug: {
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false
    },
    multiple: false
  },
  numOfWorkers: navigator.hardwareConcurrency || 4,
  frequency: 5,
  locate: false,
  locator: {
    patchSize: "medium",
    halfSample: true
  }
}
