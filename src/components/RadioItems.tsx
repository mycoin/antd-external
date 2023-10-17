import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps, RadioChangeEvent } from 'antd/lib/radio'

type RadioItemsProps = RadioGroupProps & React.RefAttributes<HTMLDivElement>

const RadioGroup = Radio.Group

export default (props: RadioItemsProps) => {
  const { onChange, value, ...otherProps } = props
  const onChanged = (event: RadioChangeEvent) => {
    if (typeof onChange === 'function') {
      onChange(event.target.value)
    }
  }
  return (
    <RadioGroup
      {...otherProps}
      value={value}
      onChange={onChanged}
    />
  )
}
export { RadioItemsProps }
