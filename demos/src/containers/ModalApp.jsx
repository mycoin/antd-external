/* eslint-disable no-unused-vars */
import React from 'react'
import { notification, Modal, Button } from '../Main'
import NamedForm from '../conponents/NamedForm'

const content = 'Successfully <a href="NamedForm">NamedForm</a>'

notification.success({
  description: content,
})

const ModalApp = () => {
  const showAlert1 = () => {
    Modal.success(content, (e) => {
      e()
    })
  }
  const showAlert2 = () => {
    Modal.success({
      content,
      onOk: () => {
        console.log('OK')
      },
    })
  }

  const showModal1 = () => {
    Modal.showModal(
      { string: 'OK' },
      {
        contentRender: (commonProps) => <NamedForm {...commonProps} />,
        onCallback: (value, resolve, reject) => {
          if (value.string === 'OK') {
            reject('请修改调整参数')
          } else {
            setTimeout(resolve, 1000)
          }
        },
      },
    )
  }

  const showWindow1 = () => {
    const messageId = Date.now()
    Modal.showWindow({
      url: 'about:blank',
      iframeProps: {
        width: 500,
        height: 300,
      },
      messageId,
      onLoad: (iframe, handler) => {
        handler.write(`
          Successfully loaded, will close automatically (1s)
          <script>
          parent.postMessage({messageId:${messageId},r:2}, '*')
          </script>
        `)
      },
      onMessage: (event, handler) => {
        const { data } = event
        if (data.r) {
          console.log('OK')
          setTimeout(handler.hideModal, 1000)
        }
      },
    })
  }
  return (
    <div className="app">
      <Button onClick={showAlert1}>alert1</Button>
      <Button onClick={showAlert2}>alert2</Button>
      <Button onClick={showModal1}>showModal</Button>
      <Button onClick={showWindow1}>showWindow</Button>
    </div>
  )
}

export default ModalApp
