/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button } from 'antd'
import { utils } from 'rigel-base'
import { WindowProxy, showWindow } from '../Main'

const ModalApp = () => {
  const showWindow2 = () => {
    const messageId = utils.getGuid(7)
    showWindow(null, {
      messageId,
      onMessage: (handler, dataMap) => {
        if (dataMap.v === 0) {
          handler.destroy()
        } else {
          handler.postMessage({
            v: -dataMap.v,
          })
        }
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
          window.se=(v)=>{
            parent.postMessage({
              messageId: "${messageId}",
              v,
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
  const showWindow1 = () => {
    showWindow('https://dev.1688.com/pages/94.html', {
      title: (
        <div>
          智能白底图
          <sub>产品属性描述错误或不完整，可能会导致商品审核不通过</sub>
        </div>
      ),
      iframeProps: {
        width: 480,
        height: 200,
      },
      messageId: utils.getGuid(),
      onRender: (handler) => {
        handler.postMessage({
          v: 'loaded...',
        })
      },
      onMessage: (handler, data) => {
        if (data.e === 'close') {
          handler.destroy()
        } else {
          handler.postMessage({
            v: data.v + '!',
          })
        }
      },
    })
  }

  return (
    <div className="app">
      <div>
        <Button onClick={showWindow1}>showWindow</Button>
        <Button onClick={showWindow2}>showWindowBL</Button>
      </div>
      <WindowProxy
        src="https://dev.1688.com/pages/94.html"
        messageId="callback"
        width="330"
        height="80"
        onRender={(handler) => {
          handler.postMessage({
            v: 'loaded...',
          })
        }}
        onMessage={(handler, data) => {
          if (data.e === 'close') {
            handler.destroy()
          } else {
            handler.postMessage({
              v: data.v + '...',
            })
          }
        }}
      />
    </div>
  )
}

export default ModalApp
