import React from 'react'
import ReactDOM from 'react-dom'

import ModalTests from './TestModal'
import WindowTests from './TestWindow'
import ConfirmTests from './TestConfirm'
import TestLoading from './TestLoading'

import './index.scss'

ReactDOM.render(
  <div>
    <ModalTests />
    <WindowTests />
    <TestLoading />
    <ConfirmTests />
  </div>,
  document.getElementById('content'),
)
