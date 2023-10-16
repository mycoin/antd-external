/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import ModalApp from './containers/ModalApp'
import * as C from './Main'

// import ButtonApp from './containers/ButtonApp'
// import IconFontApp from './containers/IconFontApp'
// import FormApp from './containers/FormApp'

import './index.scss'

ReactDOM.render(
  <div>
    <ModalApp />
  </div>,
  document.getElementById('content'),
)

console.error(C)
