import React from 'react'
import { Button } from 'antd'
import { showModal, showWindow } from '../Main'
import NamedForm from '../conponents/NamedForm'

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
        return new Promise((resolve, rej) => {
          if (value.string) {
            setTimeout(resolve, 1000)
          } else {
            rej(new Error('请输入名称内容'))
          }
        })
      },
    })
  }

  const messageId = 'A' + Date.now()
  const showWindow1 = () => {
    showWindow(
      'https://air.1688.com/app/pages-group/home/ubanner-design.html?categoryId=10137&imageUrl=https%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01YMi23n1PV3Zt89zqz_%21%212249771845-0-cib.jpg&templateGroupId=1525',
      {
        iframeProps: {
          width: 960,
          height: 600,
        },
        messageId,
        onMessage: (handler, event) => {
          console.error('onMessage', handler, event)
        },
      },
    )
  }

  const showWindow2 = () => {
    showWindow('about:blank', {
      title: (
        <div>
          智能白底图
          <sub>产品属性描述错误或不完整，可能会导致商品审核不通过</sub>
        </div>
      ),
      iframeProps: {
        width: 960,
        height: 600,
      },
      messageId,
      onMessage: (handler, dataMap) => {
        if (dataMap.e === 0) {
          handler.hideModal()
        } else {
          console.error('父亲:onMessage', dataMap)
        }
      },
      afterClose: () => {
        console.error('父亲:afterClose')
      },
      onRender: (handler) => {
        handler.write(`
        Successfully loaded, will close automatically (1s)
          <script>
          addEventListener('message', (e)=>{
            console.error("孩子:onMessage", e.data, e.origin)
          })
          window.se=(e)=>{
            parent.postMessage({messageId:"${messageId}",e}, '*')
          }
          </script>
          <button onClick="se(Date.now())">发送日志</button>
          <button onClick="se(0)">关闭</button>
        `)
      },
    })
  }
  return (
    <div className="app">
      <Button onClick={showModal1}>showModal</Button>
      <Button onClick={showWindow1}>showWindow</Button>
      <Button onClick={showWindow2}>showWindow2</Button>
    </div>
  )
}

export default ModalApp
