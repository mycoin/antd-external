import React, { Fragment, IframeHTMLAttributes } from 'react'
import classNames from 'classnames'
import showModal, { ShowModalParams } from './showModal'
import toReactNode from './toReactNode'
import { WindowProxy } from '../components'
import { MessageBody, WindowHandler, WindowMessageBase } from '../interfaces'

type ShowWindowParam<T> = WindowMessageBase<T> &
  ShowModalParams<null> & {
    messageId?: string
    iframeProps?: Omit<IframeHTMLAttributes<Element>, 'src'>
    // 窗口加载完成的回调方法
    onRender?: (handle: WindowHandler<T>) => void
  }

export default <T extends MessageBody>(urlSrc: string, params: ShowWindowParam<T>) => {
  const { className, title, messageId, iframeProps, onMessage, onRender, afterClose, ...otherProps } = params
  const callbackHandler = (handler: WindowHandler<T>) => {
    const { destroy } = handler
    handler.destroy = () => {
      if (typeof destroy === 'function') {
        destroy()
      }
      // 事件销毁同时把窗口也销毁
      hook.destroy()
    }
  }

  const hook = showModal(null, {
    ...otherProps,
    className: classNames('ant-external-modal-window', className),
    closable: true,
    style: {
      minHeight: null,
      minWidth: null,
      maxHeight: null,
      maxWidth: null,
    },
    contentRender: () => (
      <Fragment>
        {toReactNode(title, {
          className: 'modal-window-title',
        })}
        <WindowProxy
          {...iframeProps}
          src={urlSrc}
          messageId={messageId}
          onMessage={onMessage}
          onRender={onRender}
          callbackHandler={callbackHandler}
        />
      </Fragment>
    ),
    // 窗体关闭必须销毁事件绑定关系
    afterClose: () => {
      if (typeof afterClose === 'function') {
        afterClose()
      }
      hook.destroy()
    },
  })
  // 返回销毁
  return hook
}
export { ShowWindowParam }
