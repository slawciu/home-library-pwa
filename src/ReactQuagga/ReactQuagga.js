import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import quagga from 'quagga'
import './ReactQuagga.css'

import { DEFAULT_CONFIG } from './utils'

const ReactQuagga = ({
  config,
  onDetected: handleDetected,
  onProcessed: handleProcessed
}) => {
  const quaggaRef = useRef(null)

  useEffect(() => {
    const activeConfig = config || DEFAULT_CONFIG
    const { inputStream: initAttrs } = activeConfig
    initAttrs['target'] = quaggaRef.current
    quagga.init(
      { ...activeConfig, inputStream: initAttrs },
      (error) => {
        if(error) {
          console.error(error)
          return
        }
        quagga.onDetected(handleDetected)
        if(handleProcessed) {
          quagga.onProcessed(handleProcessed)
        }
        quagga.start()
      }
    )
    return () => {
      quagga.offDetected(handleDetected)
      if(handleProcessed) {
        quagga.offProcessed(handleProcessed)
      }
      quagga.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={quaggaRef}
      className="viewport overlay__content"
    />
  )
}

ReactQuagga.propTypes = {
  onDetected: PropTypes.func.isRequired,
  onProcessed: PropTypes.func,
  config: PropTypes.object,
};

export default ReactQuagga;
