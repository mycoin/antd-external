import { RenderHookHandler } from '../interfaces'
import showMessage from './showMessage'
import toPromise from './toPromise'

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

const createHandlerHook = <T>(props: any) => {
  const { value, onOk, onCancel, destroy } = props
  const handler: RenderHookHandler<T> = {
    current: value as T,
    destroy,
    onOk: () => {
      toExecute(onOk, handler.current, true).then(destroy)
    },
    onCancel: () => {
      toExecute(onCancel).then(destroy)
    },
  }
  return handler
}

export {
  /**/
  toExecute,
  createHandlerHook,
}
