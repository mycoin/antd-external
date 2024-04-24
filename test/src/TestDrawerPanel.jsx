/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button, Input } from 'antd'
import { showDrawerPanel, val } from './Main'

export default () => {
  const showDrawerPanel1 = () => {
    showDrawerPanel({
      value: 1,
      maskClosable: false,
      contentRender: (value, onChange, handler) => {
        const onChangeEvent = (e) => {
          onChange(val(e))
        }
        const submit = () => {
          handler.onOk()
        }
        const cancel = () => {
          handler.onCancel()
        }
        return (
          <div>
            <Input
              value={value}
              onChange={onChangeEvent}
            />
            <Button onClick={submit}>提交</Button>
            <Button onClick={cancel}>取消</Button>
          </div>
        )
      },
      onOk: (data) => {
        return Promise.reject(new Error('data:' + data))
      },
    })
  }
  return (
    <fieldset className="app">
      <legend>showDrawerPanel</legend>
      <Button onClick={showDrawerPanel1}>showDrawerPanel1</Button>
    </fieldset>
  )
}
