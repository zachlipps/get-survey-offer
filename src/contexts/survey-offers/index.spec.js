import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { SurveryContextProvider, SurveryContext } from './index'

jest.mock('./actions')

describe('Survey offer actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('get correct loading state initially', () => {
    const TestComponent = () => {
      const {
        surveyState: {
          isLoading,
        }
      } = useContext(SurveryContext)
      return <div data-testid='value'>{isLoading.toString()}</div>
    }


    render(
      <SurveryContextProvider>
        <TestComponent />
      </SurveryContextProvider>
    )

    expect(screen.getByTestId('value')).toHaveTextContent('false')
  })
})