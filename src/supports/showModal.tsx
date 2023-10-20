import React from 'react'
import { RenderProxy } from '../components'
import showConfirm from './showConfirm'
import toPromise from './toPromise'
import showMessage from './showMessage'
import { RenderHookHandler, RenderHookProxyBase, ModalProps } from '../interfaces'

type ShowModalParams<T> = Omit<ModalProps, keyof ShowModalOverrrde<T>> & ShowModalOverrrde<T>
type ShowModalOverrrde<T> = {
  content?: null
  // 渲染主体（Hook）
  contentRender: RenderHookProxyBase<T>['contentRender']
  // 点击提交按钮
  onOk: (value: T) => Promise<void> | void
  // 点击取消按钮
  onCancel?: () => Promise<void> | void
}

// 执行回调函数
const toExecute = (method: any, args?: any, doCatch?: boolean): Promise<any> => {
  if (typeof method === 'function') {
    const returnValue = toPromise(method(args) || true)
    if (doCatch === true) {
      returnValue.catch((error) => {
        showMessage(error)
      })
    }
    return returnValue
  } else {
    return toPromise(true)
  }
}

export default <T extends {}>(current: T, props: ShowModalParams<T>) => {
  let isClose = false

  const { contentRender, onOk, onCancel, afterClose, ...restProps } = props
  const executeOk = () => toExecute(onOk, handler.current, true)
  const executeCancel = () => toExecute(onCancel)

  const handler: RenderHookHandler<T> = {
    current,
    destroy: () => hook.destroy(),
    onOk: () => {
      executeOk().then(handler.destroy)
    },
    onCancel: () => {
      executeCancel().then(handler.destroy)
    },
  }
  const hook = showConfirm({
    ...restProps,
    icon: null,
    content: (
      <RenderProxy
        contentRender={contentRender}
        value={current}
        handler={handler}
      />
    ),
    onOk: executeOk,
    onCancel: (handleNext) => {
      if (isClose === true) {
        // 如果通过点击关闭按钮则无需二次确认
        handleNext()
      } else {
        executeCancel().then(handleNext)
      }
    },
    afterClose: () => {
      isClose = true
      if (typeof afterClose === 'function') {
        afterClose()
      }
    },
  })
  return hook
}

export { ShowModalParams }
