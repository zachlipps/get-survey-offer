import { initialState } from './constants'

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'api_error':
      return { ...initialState, hasFetched: true, hasError: true }
    case 'fetching':
      return { ...initialState, isLoading: true }
    case 'clear_survey_data':
      return { ...initialState }
    case 'offersReady':
      return { surveyResponse: action.payload, hasFetched: true, isLoading: false }
    default:
      return state
  }
}

export default reducer
