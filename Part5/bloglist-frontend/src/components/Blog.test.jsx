import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    id: 777777,
    title: 'titleTest',
    url: 'urlTest',
    likes: 14,
    user: 123,
    author: 'authorTest'
  }

  const user = {
    id: 666666,
    name: 'userTest'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user ={user} toggleVisibility = {mockHandler} />)

  screen.debug()

  const userEv = userEvent.setup()
  const button = screen.getByText('view')
  await userEv.click(button)
  screen.debug()
  expect(mockHandler.mock.calls).toHaveLength(1)

  // expect(element).toBeDefined()
  // const element = screen.getByText('titleTest')

  // const { container } = render(<Blog blog={blog} user ={user} />)
  // const div = container.querySelector('.blog')
  // expect(div).toHaveTextContent('titleTest')
})