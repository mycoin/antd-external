import { Modal } from 'antd'
import { normalize } from './internals'
import { SimpleModalProps } from '../interfaces'

export default (params: SimpleModalProps) => {
  return Modal.confirm(normalize(params))
}
