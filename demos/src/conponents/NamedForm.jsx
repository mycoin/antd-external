import React, { useState } from 'react'

export default (props) => {
  const { value, handler, onChange } = props
  const [string, updateString] = useState(value.string)
  const handleChange = (event) => {
    updateString(event.target.value)
  }
  const onBlur = () => {
    onChange({
      string,
    })
  }
  return (
    <div>
      <input
        value={string}
        onBlur={onBlur}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handler.onOk}>
        onOk
      </button>
      <button
        type="button"
        onClick={handler.onCancel}>
        onCancel
      </button>
    </div>
  )
}
