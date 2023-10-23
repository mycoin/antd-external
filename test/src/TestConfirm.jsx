/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button, Modal } from 'antd'
import { showMessage, showModal } from './Main'
import NamedForm from './NamedForm'

const ModalApp = () => {
  const valueModel = {
    string: '',
  }
  const showModal1 = () => {
    showModal(valueModel, {
      contentRender: (value, onChange, handler) => (
        <NamedForm
          handler={handler}
          value={value}
          onChange={onChange}
        />
      ),
      onOk: (value) => {
        console.error('value>>>', value)
        return new Promise((resolve, rej) => {
          if (value.string) {
            setTimeout(resolve, 1000)
          } else {
            rej(new Error('请输入名称内容'))
          }
        })
      },
      onCancel: () => {
        console.error('onCancel>>>')
        return new Promise((resolve) => {
          Modal.confirm({
            title: '温馨提示',
            content: '确认关闭对话吗？',
            onOk: () => {
              resolve()
            },
          })
        })
      },
      afterClose: () => {
        console.error('afterClose>>>')
      },
    })
  }

  const showMessage1 = () => {
    try {
      window.all()
    } catch (e) {
      showMessage(e)
    }
  }
  const showMessage2 = () => {
    showMessage('默认没有参数')
  }
  const showMessage3 = () => {
    showMessage({
      type: 'loading',
      content: '正在加载中',
      duration: 10,
    })
  }
  return (
    <fieldset className="app">
      <legend>showMessage</legend>
      <Button onClick={showMessage1}>showMessage1</Button>
      <Button onClick={showMessage2}>showMessage2</Button>
      <Button onClick={showMessage3}>showMessage3</Button>
      <Button onClick={showModal1}>showModal</Button>
    </fieldset>
  )
}

export default ModalApp
