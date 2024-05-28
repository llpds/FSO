import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todoExample = {
    text: 'single todo',
    done: false
  }

  render(<Todo todo={todoExample} />)

  const textEl = screen.getByText('single todo')
  const doneEl = screen.getByText('This todo is not done')
  expect(textEl).toBeDefined()
  expect(doneEl).toBeDefined()
})