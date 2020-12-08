import React, { createContext, useReducer, useCallback } from 'react'
import $ from 'jquery'

const SurveryContext = createContext()

const initialState = {
  surveyData: {},
  hasFetched: false,
  isLoading: false,
}

const fetchSurvey = async (userIdentifier) => {
  let response

  // went with ajax for simplicity
  try {
    response = await $.ajax({
      url: 'https://www.tapresearch.com/supply_api/surveys/offer',
      dataType: 'jsonp',
      data: {
        api_token: '9a7fb35fb5e0daa7dadfaccd41bb7ad1',
        user_identifier: userIdentifier,
      },
      method: 'POST',
    })
  } catch (err) {
    console.error(err)
    return { hasError: true }
  }

  return response
}

let reducer = (state, action) => {
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

function SurveryContextProvider(props) {
  let [surveyState, dispatch] = useReducer(reducer, initialState)

  const fetchSurveyOffers = useCallback(async (userIdentifier) => {
    dispatch({
      type: "fetching",
    })

    const surveyResponse = await fetchSurvey(userIdentifier)

    const { hasError = false } = surveyResponse

    if (hasError) {
      dispatch({
        type: "api_error",
      })
    } else {
      dispatch({
        type: "offersReady",
        payload: surveyResponse,
      })
    }
  }, [])

  const clearSurveyData = () => {
    dispatch({
      type: "clear_survey_data",
    })
  }

  return (
    <SurveryContext.Provider value={{ surveyState, actions: { fetchSurveyOffers, clearSurveyData } }}>
      {props.children}
    </SurveryContext.Provider>
  )
}

export { SurveryContext, SurveryContextProvider }