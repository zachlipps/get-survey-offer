import { render, screen } from '@testing-library/react'
import Spinner from './index'

test('renders spinner', () => {
  render(
    <Spinner />
  )

  expect(screen.getByTestId('spinner')).toBeInTheDocument()
})
