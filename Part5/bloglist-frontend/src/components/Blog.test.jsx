import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    id: 777777,
    title: 'titleTest',
    url: 'urlTest',
    likes: 14,
    user: 'userBlogTest',
    author: 'authorTest'
  }

  const user = {
    id: 666666,
    name: 'userTest'
  }


  test('renders content title and author. NOT: URl and likes. Ex 5.13', async () => {

    const { container } = render(<Blog blog={blog} user ={user} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('titleTest')
    expect(div).toHaveTextContent('authorTest')
    expect(div).not.toHaveTextContent('urlTest')
    expect(div).not.toHaveTextContent(14)
  })


  test('renders URL and likes after after clicking "view" button Ex 5.14', async () => {
    const { container } = render(<Blog blog={blog} user ={user} />)
    const div = container.querySelector('.blog')

    const userEv = userEvent.setup()
    const button = screen.getByText('view')
    await userEv.click(button)

    expect(div).toHaveTextContent('urlTest')
    expect(div).toHaveTextContent(14)
  })

  test('twice click "Like" Ex 5.15', async () => {

    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} user ={user}  handleLike = {mockHandler}/>)
    const div = container.querySelector('.blog')

    const userEv = userEvent.setup()
    const viewButton = screen.getByText('view')
    await userEv.click(viewButton)
    screen.debug()

    const likeButton = screen.getByRole('button', { name: 'liked' })
    await userEv.click(likeButton)
    screen.debug()

    //not work yet

  })
})