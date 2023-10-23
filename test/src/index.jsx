import React from 'react'
import ReactDOM from 'react-dom'
import ModalTests from './TestModal'
import WindowTests from './TestWindow'
import ConfirmTests from './TestConfirm'

import './index.scss'

ReactDOM.render(
  <div>
    <ModalTests />
    <WindowTests />
    <ConfirmTests />
  </div>,
  document.getElementById('content'),
)
