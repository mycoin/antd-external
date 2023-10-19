import React, { Fragment, IframeHTMLAttributes, ReactNode } from 'react'
import { utils } from 'rigel-base'
import showModal from './showModal'
import toReactNode from './toReactNode'
import { BaseEmbedWindowParam, WindowHandler } from '../interfaces'
import { createWindowHandler } from '../utils'

type ShowWindowParam = BaseEmbedWindowParam<WindowHandler> & {
  title?: ReactNode
  iframeProps?: Omit<IframeHTMLAttributes<Element>, 'src'>
}

export default (urlSrc: string, params: ShowWindowParam) => {
  const { title, messageId, iframeProps, onRender } = params
  const iframeUrl = utils.toUrl(urlSrc || 'about:blank', {
    messageId,
    targetOrigin: location.origin,
  })

  const handler = createWindowHandler(iframeUrl, params)
  const hook = showModal(null, {
    className: 'ant-external-modal-window',
    closable: true,
    centered: true,
    style: {
      maxHeight: null,
      maxWidth: null,
    },
    contentRender: () => (
      <Fragment>
        {toReactNode(title, {
          className: 'modal-window-title',
        })}
        <iframe
          {...iframeProps}
          ref={(target) => {
            if (target && target.contentWindow) {
              handler.target = target.contentWindow
            }
          }}
          allowFullScreen
          allowTransparency={false}
          src={iframeUrl}
          onLoad={() => {
            if (typeof onRender === 'function') {
              onRender(handler)
            }
          }}
        />
      </Fragment>
    ),
    onOk: () => null,
    // 窗体关闭必须销毁事件绑定关系
    afterClose: () => {
      handler.destroy()
    },
  })
  //实现销毁方法
  handler.hideModal = () => {
    hook.destroy()
  }

  // 返回销毁
  return hook
}
export { ShowWindowParam }
