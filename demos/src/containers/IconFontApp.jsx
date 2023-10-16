/* eslint-disable no-unused-vars */
import React from 'react'
import { QuestionMark, IconFont } from '../Main'

const IconFontApp = () => {
  return (
    <div className="app">
      <IconFont type="WindowsOutlined" />
      <IconFont type="video" />

      <QuestionMark>帮助文案</QuestionMark>
    </div>
  )
}

export default IconFontApp
