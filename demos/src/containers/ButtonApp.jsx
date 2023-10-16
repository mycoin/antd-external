/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, Button } from '../Main'

const ButtonApp = () => {
  return (
    <div className="app">
      <Button type="dashed">dashed</Button>
      <Button type="primary">primary</Button>
      <Button href="withLink">with Link</Button>
      <Button
        type="primary"
        href="Button"
        menuItems={[
          {
            label: '链接',
            linkProps: {
              href: 'withMenu',
              badge: 1,
            },
          },
        ]}>
        with Menu
      </Button>
      <Button
        type="primary"
        href="Button"
        overlay={<div>overlay</div>}>
        with overlay
      </Button>

      <Link
        badge
        href="common">
        common Link
      </Link>
    </div>
  )
}

export default ButtonApp
