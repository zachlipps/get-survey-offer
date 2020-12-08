import React, { createContext, useReducer, useCallback } from 'react'
import $ from 'jquery'

const SurveryContext = createContext()

const initialState = {
  isFetching: false,
  surveyData: {}
}

const fetchSurvey = async (userIdentifier) => {
  let response

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
  } catch(err) {
    console.error(err)
  }

  return response
}

let reducer = async (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { ...state, isFetching: true }
    case 'offersReady':
      return { surveyData: action.payload, isFetching: false }
    default:
      return state
  }
}

function SurveryContextProvider(props) {
  let [survey, surveyReducer] = useReducer(reducer, initialState)

  const fetchSurveyOffers = useCallback(async (userIdentifier) => {
    surveyReducer({
      type: "fetching",
    })
    const surveyData = await fetchSurvey(userIdentifier)
    surveyReducer({
      type: "offersReady",
      payload: surveyData,
    })
  }, []);

  return (
    <SurveryContext.Provider value={{ survey, fetchSurveyOffers }}>
      {props.children}
    </SurveryContext.Provider>
  )
}

export { SurveryContext, SurveryContextProvider }