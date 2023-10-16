/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import ModalApp from './containers/ModalApp'
import ButtonApp from './containers/ButtonApp'
import IconFontApp from './containers/IconFontApp'
import FormApp from './containers/FormApp'

import './index.scss'

ReactDOM.render(
  <div>
    <ButtonApp />
    <IconFontApp />
    <FormApp />
    <ModalApp />
  </div>,
  document.getElementById('content'),
)
