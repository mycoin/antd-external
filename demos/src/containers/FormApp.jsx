/* eslint-disable no-unused-vars */
import { Popconfirm } from 'antd'
import React, { Component } from 'react'
import { Modal, Radio, RadioList, Checkbox, CheckboxList } from '../Main'

const dataSource = [
  {
    label: '继续发布商品',
    help: '继续发布商品',
    value: 100,
  },
  {
    label: '管理商品',
    help: '管理商品',
    value: false,
  },
  {
    label: '修改该商品',
    help: '修改该商品',
    value: 'string',
  },
]

class FormApp extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  r = (key, value) => {
    if (value === undefined) {
      return this.state[key]
    } else {
      return this.setState({
        [key]: value,
      })
    }
  }

  renderRadio() {
    const onChange = (isChecked, event) => {
      this.r('RR', event.target.value)
    }
    return (
      /**/
      <div>
        单选：
        <Radio
          checked={this.r('RR') === '100'}
          value="100"
          help="普通单选"
          onChange={onChange}>
          普通单选
        </Radio>
        <Radio
          checked={this.r('RR') === '200'}
          value="200"
          help="高级单选"
          onChange={onChange}>
          高级单选
        </Radio>
      </div>
    )
  }

  renderCheckbox() {
    const baseH = this.init('Checkbox1')
    const advH = this.init('Checkbox2')
    const onChangeAsync = (checked) => {
      if (checked) {
        if (confirm('Please select is checked ?')) {
          advH.onChange(checked)
        }
      } else {
        advH.onChange(checked)
      }
    }
    return (
      /**/
      <div>
        多选：
        <Checkbox
          help="普通多选"
          checked={baseH.value}
          onChange={baseH.onChange}>
          普通多选
        </Checkbox>
        <Checkbox
          help="高级单选"
          checked={advH.value}
          onChange={advH.onChange}>
          高级单选1
        </Checkbox>
        <Checkbox
          help="高级单选"
          checked={advH.value}
          onChange={onChangeAsync}>
          高级单选2
        </Checkbox>
      </div>
    )
  }

  init = (key, fieldName = 'value') => {
    return {
      [fieldName]: this.state[key],
      onChange: (value) => {
        this.setState({
          [key]: value,
        })
      },
    }
  }

  renderRadioList() {
    const fields = this.init('RadioList1')
    return (
      <div>
        多选分组1：
        <RadioList {...fields}>
          {dataSource.map((item) => (
            <Radio {...item}>{item.label}</Radio>
          ))}
        </RadioList>
        <br />
        多选分组2：
        <RadioList
          {...fields}
          dataSource={dataSource}
        />
      </div>
    )
  }

  renderCheckboxList() {
    const fields = this.init('CheckboxList1')
    return (
      <div>
        多选分组1：
        <CheckboxList {...fields}>
          {dataSource.map((item) => (
            <Checkbox {...item}>{item.label}</Checkbox>
          ))}
        </CheckboxList>
        <br />
        多选分组2：
        <CheckboxList
          {...fields}
          dataSource={dataSource}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="app">
        {this.renderRadio()}
        {this.renderRadioList()}
        {this.renderCheckbox()}
        {this.renderCheckboxList()}

        <p>{JSON.stringify(this.state)}</p>
      </div>
    )
  }
}

export default FormApp
