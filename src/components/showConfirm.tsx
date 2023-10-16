import { Modal } from 'antd'
import { SimpleModalProps, normalize } from './internals'

export default (params: SimpleModalProps) => {
  return Modal.confirm(normalize(params))
}
