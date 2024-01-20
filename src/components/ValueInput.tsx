import React, { Component, SyntheticEvent } from 'react'
import { Input, InputProps } from 'antd'
import getEventValue from '../supports/getEventValue'

type ValueInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: string
  valueParser?: (value: string) => string
  onChange: (value: string) => void
}
type ValueInputState = {
  current: string
}

class ValueInput extends Component<ValueInputProps, ValueInputState> {
  componentWillMount() {
    const { value } = this.props
    const current = this.getFormat(value)

    this.state = {
      current: current || '',
    }
  }

  componentWillReceiveProps(nextProps: ValueInputProps) {
    if ('value' in nextProps) {
      const { value } = nextProps
      const current = this.getFormat(value)
      this.setState({
        current: current || '',
      })
    }
  }

  getFormat(valueStr: string): string {
    const { valueParser } = this.props
    if (typeof valueParser === 'function') {
      return valueParser(valueStr)
    }
    return valueStr
  }

  render() {
    const { onChange, valueParser, ...otherProps } = this.props
    const { current } = this.state
    const onChangeEvent = (event: SyntheticEvent) => {
      const valueStr = this.getFormat(getEventValue(event))
      if (valueStr === null) {
        return
      }
      this.setState({
        current: valueStr,
      })
    }
    // 只有失去焦点才更新到外部
    const onBlurEvent = () => {
      if (typeof onChange === 'function') {
        onChange(current)
      }
    }
    return (
      <Input
        {...otherProps}
        value={current}
        onChange={onChangeEvent}
        onBlur={onBlurEvent}
      />
    )
  }
}

export default ValueInput
export { ValueInputProps }
