/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button } from 'antd'
import { showLoading } from './Main'

const TestLoading = () => {
  let hideLoading = null
  const showLoading1 = () => {
    hideLoading = showLoading()
  }
  return (
    <fieldset className="app">
      <legend>showLoading</legend>
      <Button onClick={showLoading1}>showLoading</Button>
      <Button onClick={() => hideLoading && hideLoading(true)}>hideLoading1</Button>
      <Button onClick={() => hideLoading && hideLoading(false)}>hideLoading2</Button>
    </fieldset>
  )
}

export default TestLoading
