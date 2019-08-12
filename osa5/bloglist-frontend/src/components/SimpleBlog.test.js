import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

/* test('renders content', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true
    }

    const component = render(
      <Note note={note} />
    )

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  }) */
describe('<SimpleBlog/>', () => {
  const blog = {
    title: 'Testtitle',
    author: 'Testauthor',
    likes: 0
  }
  test('renders content', () => {
    const component = render(
      <SimpleBlog blog={blog}/>
    )

    expect(component.container).toHaveTextContent('Testtitle')
    expect(component.container).toHaveTextContent('Testauthor')
    expect(component.container).toHaveTextContent(0)
  })

  test('clicking button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
