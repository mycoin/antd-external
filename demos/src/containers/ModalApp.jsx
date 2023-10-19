/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button } from 'antd'
import { utils } from 'rigel-base'
import { Scrollbar, showModal, showWindow } from '../Main'
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

  const messageId = utils.getGuid(11)
  const showWindow1 = () => {
    const url = utils.toUrl('https://air.1688.com/app/pages-group/home/ubanner-design.html', {
      categoryId: 10137,
      templateGroupId: 1525,
      imageUrl: 'https://cbu01.alicdn.com/img/ibank/O1CN01YMi23n1PV3Zt89zqz_!!2249771845-0-cib.jpg',
    })
    showWindow(url, {
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
      onMessage: (handler, data) => {
        console.error('onMessage', handler, data)
      },
    })
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
        width: 460,
        height: 200,
      },
      // messageId,
      onMessage: (handler, dataMap) => {
        console.error('父：', dataMap)
        if (dataMap.e === 0) {
          handler.hideModal()
        } else {
          handler.postMessage({
            v: -dataMap.e,
          })
        }
      },
      afterClose: () => {
        console.error('父亲:afterClose')
      },
      onRender: (handler) => {
        handler.write(`
          <script>
          addEventListener('message', (e)=>{
            console.error("孩子:onMessage", e.data, e.origin)
            if (e.data.messageId !== "${messageId}") {
              return;
            }
            RES.innerHTML = RES.innerHTML + "<br>" + JSON.stringify(e.data);
          })
          window.V = 1;
          window.se=(e)=>{
            parent.postMessage({
              messageId: "${messageId}",
              e,
            }, '${location.origin}')
          };
          </script>
          <button onClick="se(V++)">发送日志</button>
          <button onClick="se(0)">关闭</button>
          <small id="RES"></small>
        `)
        handler.postMessage({
          v: '初始化',
        })
      },
    })
  }
  return (
    <div className="app">
      <Button onClick={showModal1}>showModal</Button>
      <Button onClick={showWindow1}>showWindow</Button>
      <Button onClick={showWindow2}>showWindow2</Button>
      <Scrollbar style={{ height: 300, border: '1px solid' }}>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
        <p>Li</p>
      </Scrollbar>
    </div>
  )
}

export default ModalApp
