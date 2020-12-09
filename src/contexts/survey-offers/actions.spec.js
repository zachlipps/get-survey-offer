import $ from 'jquery'

import { fetchSurvey } from './actions'

jest.mock('jquery')

describe('Survey offer actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('return successful response correctly', async () => {
    $.ajax.mockResolvedValue({ data: { has_offer: true }})
    const result = await fetchSurvey()
    const { data: { has_offer } } = result
    expect(has_offer).toBe(true)
  })

  test('handle an error correctly', async () => {
    $.ajax.mockRejectedValueOnce({})
    const result = await fetchSurvey()
    const { hasError } = result
    expect(hasError).toBe(true)
  })
})