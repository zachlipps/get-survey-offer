import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { SurveryContext } from '../contexts'
import Spinner from './Spinner'


const CheckOffer = () => {
  const {
    actions: {
      fetchSurveyOffers = () => { },
      clearSurveyData = () => { },
    } = {},
    surveyState: {
      surveyResponse: { has_offer = false, offer_url = '' } = {},
      hasError = false,
      hasFetched = false,
      isLoading = false,
    }
  } = useContext(SurveryContext)
  const [userIdentifier, setUserIdentifier] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    clearSurveyData()

    const hasValidationErrors = checkErrors()
    if (!hasValidationErrors) {
      fetchSurveyOffers(userIdentifier)
    }
  }

  const checkErrors = () => {
    if (userIdentifier.length === 0) {
      setValidationError('User identifier cannot be empty')
      return true
    }

    setValidationError('')
    return false
  }

  const handleChange = e => {
    const { target: { value = '' } = {} } = e
    if (value.length > 32) {
      setValidationError('User identifier cannot be any longer than 32 characters')
      setUserIdentifier(value.slice(0, 32))
    } else {
      setUserIdentifier(value)
    }
  }

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel
          aria-labelledby='userIdentifier'
        >
          Enter Username:
          <StyledText
            id='userIdentifier'
            type="text"
            value={userIdentifier}
            onChange={handleChange}
            aria-label='please enter your username'
          />
        </StyledLabel>
        <BottomContainer>
          <StyledSubmit type="submit" value="Submit" />
          <MessageContainer>
            {isLoading && <Spinner />}
            {!isLoading && (
              <>
                <StyledValidationError>{validationError}</StyledValidationError>
                {has_offer && hasFetched && (
                  <StyledLink
                    target='_blank'
                    href={offer_url}
                  >
                    Take Survey
                  </StyledLink>
                )}
                {hasFetched && !has_offer && (
                  <span>
                    No survey available
                  </span>
                )}
                {hasError && (
                  'Sorry there was an error, please try again'
                )}
              </>
            )}
          </MessageContainer>
        </BottomContainer>
      </StyledForm>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 400px;
  border-radius: 26px;
  background-color: lightblue;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  width: 275px;
  height: 100%;
  padding: 20px;
`

const StyledLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
`

const StyledText = styled.input`
  width: 100%;
  margin-top: 10px;
`

const BottomContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const StyledSubmit = styled.input`
  padding: 17px 40px;
  width: 100%;
  background: #f05c4f;
  color: #FFF;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  -moz-border-radius: 26px;
  -webkit-border-radius: 26px;
  border-radius: 26px;
  justify-content: space-around;
  margin-top: 20px;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`

const StyledValidationError = styled.div`
  color: red;
`

const StyledLink = styled.a`
  cursor: pointer;
`

export default CheckOffer
