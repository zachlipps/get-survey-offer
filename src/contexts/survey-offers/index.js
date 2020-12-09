import React, { createContext, useReducer, useCallback } from 'react'

import SurveyOfferReducer from './reducer'
import { fetchSurvey } from './actions'
import { initialState } from './constants'


const SurveryContext = createContext()

function SurveryContextProvider(props) {
  let [surveyState, dispatch] = useReducer(SurveyOfferReducer, initialState)

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
