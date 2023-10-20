import React from 'react'
import ReactDOM from 'react-dom'
import ModalTests from './containers/ModalTests'
import WindowTests from './containers/WindowTests'
import ConfirmTests from './containers/ConfirmTests'

import './index.scss'

ReactDOM.render(
  <div>
    <ModalTests />
    <WindowTests />
    <ConfirmTests />
  </div>,
  document.getElementById('content'),
)
