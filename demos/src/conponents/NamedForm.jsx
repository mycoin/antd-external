import React, { useState } from 'react'

export default (props) => {
  const { value, hideModal, handleUpdate } = props
  const [string, updateString] = useState(value.string)

  const onBlur = () => {
    handleUpdate({
      string,
    })
  }
  const onChange = (event) => {
    updateString(event.target.value)
  }
  return (
    <div>
      <input
        value={string}
        onBlur={onBlur}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={hideModal}>
        hideModal
      </button>
    </div>
  )
}
