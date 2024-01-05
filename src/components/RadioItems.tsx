import React from 'react'
import { Radio } from 'antd'
import { RadioGroupProps, RadioChangeEvent } from 'antd/lib/radio'

type RadioItemsProps<T> = React.RefAttributes<HTMLDivElement> &
  Omit<RadioGroupProps, 'onChange' | 'value'> & {
    onChange: (valueModel: T) => void
    value?: T
  }

const RadioGroup = Radio.Group

export default function <T>(props: RadioItemsProps<T>) {
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
