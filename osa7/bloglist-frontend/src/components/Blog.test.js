import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Testtitle',
    author: 'Testauthor',
    url: 'Testurl',
    likes: '0',
    user: {
      name: 'Test Name',
      username: 'Testusername'
    }
  }

  test('blog only shows title and author when not expanded', () => {
    const component = render(
      <Blog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('Testtitle')
    expect(component.container).toHaveTextContent('Testauthor')
    expect(component.container).not.toHaveTextContent('Test Name')
  })

  test('when clicked blog expands and shows likes and user', () => {
    const component = render(
      <Blog blog={blog}/>
    )

    const button = component.getByText('Testtitle Testauthor')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(0)
    expect(component.container).toHaveTextContent('Test Name')
  })
})
