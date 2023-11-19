import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogFrom /> updates parent state and calls onSubmit', async () => {
  const mockHandler = jest.fn()
  const blogs = []
  const userEv = userEvent.setup()

  render(<BlogForm addBlog={mockHandler} blogs = {blogs}/>)

  const inputTitle = screen.getByTestId('titleTest')
  const inputAuthor = screen.getByTestId('authorTest')
  const inputUrl = screen.getByTestId('urlTest')
  const sendButton = screen.getByText('create')

  await userEv.type(inputTitle, 'test input title')
  await userEv.type(inputAuthor, 'test input author')
  await userEv.type(inputUrl, 'test input url')
  await userEv.click(sendButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('test input title')
  expect(mockHandler.mock.calls[0][0].author).toBe('test input author')
  expect(mockHandler.mock.calls[0][0].url).toBe('test input url')
})