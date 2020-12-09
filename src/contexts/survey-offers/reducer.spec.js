import SuveyReducer from './reducer'

import { initialState } from './constants'

describe('Survey offer reducer', () => {

  test('returns original state by default', () => {
    const stateMock = { hasError: true }
    const state = SuveyReducer(stateMock)
    expect(state).toEqual(stateMock)
  })

  test('have handle api_error', () => {
    const stateMock = {}
    const state = SuveyReducer(stateMock, { type: 'api_error' })
    expect(state).toEqual({ ...initialState, hasFetched: true, hasError: true })
  })

  test('reset to initial state when fetching', () => {
    const stateMock = { has_offer: true }
    const state = SuveyReducer(stateMock, { type: 'fetching' })
    expect(state).toEqual({ ...initialState, isLoading: true })
  })

  test('handle save survey offers correctly', () => {
    const stateMock = { }
    const mockPayload = { has_offer: true }
    const state = SuveyReducer(stateMock, { type: 'offersReady', payload: mockPayload })
    expect(state).toEqual({ surveyResponse: mockPayload, hasFetched: true, isLoading: false })
  })
})