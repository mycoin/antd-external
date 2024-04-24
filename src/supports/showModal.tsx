import React from 'react'
import { RenderProxy } from '../components'
import showConfirm from './showConfirm'
import { RenderHookHandler, RenderHookProxyBase, ModalProps, PromiseActions } from '../interfaces'
import { toExecute } from './internal'

type ShowModalParams<T> = Omit<ModalProps, keyof ShowModalOverrrde<T>> & ShowModalOverrrde<T> & PromiseActions<T>
type ShowModalOverrrde<T> = {
  content?: null
  contentRender: RenderHookProxyBase<T>['contentRender']
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
