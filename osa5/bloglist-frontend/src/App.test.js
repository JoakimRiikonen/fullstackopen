import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App/>', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App/>)
    component.rerender(<App/>)

    await waitForElement(
      () => component.getByText('Log in to application')
    )

    expect(component.container).toHaveTextContent('username')
    expect(component.container).not.toHaveTextContent('Where am I Unknown Author')
  })

  test('when loggen in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '123123123',
      name: 'Timothy the Tester'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App/>)
    component.rerender(<App/>)

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container).toHaveTextContent('Where am I Unknown Author')
    expect(component.container).not.toHaveTextContent('username')
  })
})