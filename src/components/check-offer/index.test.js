import { render, screen } from '@testing-library/react'
import CheckOffer from './index'

import { SurveryContextProvider } from '../../contexts'

describe('CheckOffer tests', () => {
  test('renders without crashing', () => {
    render(
      <SurveryContextProvider>
        <CheckOffer />
      </SurveryContextProvider>
    )

    expect(screen.getByText('Enter Username:')).toBeInTheDocument();
  })
})

