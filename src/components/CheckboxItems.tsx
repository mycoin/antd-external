import React from 'react'
import { Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'

type CheckboxValueType = string | number | boolean
type CheckboxItemsProps = CheckboxGroupProps & React.RefAttributes<HTMLDivElement>

const CheckboxGroup = Checkbox.Group

export default (props: CheckboxItemsProps) => {
  const { onChange, value, ...otherProps } = props
  const onChanged = (checkedItems: CheckboxValueType[]) => {
    if (typeof onChange === 'function') {
      onChange(checkedItems)
    }
  }
  return (
    <CheckboxGroup
      {...otherProps}
      value={value}
      onChange={onChanged}
    />
  )
}
export { CheckboxItemsProps, CheckboxValueType }
