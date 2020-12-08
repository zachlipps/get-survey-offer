import React, { useContext, useState } from 'react'
import { SurveryContext } from '../contexts'

import styled from 'styled-components'

const CheckOffer = () => {
  const { fetchSurveyOffers } = useContext(SurveryContext)
  const [userIdentifier, setUserIdentifier] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (evt) => {
    evt.preventDefault()
    checkErrors()
    fetchSurveyOffers(userIdentifier)
  }

  const checkErrors = () => {
    if (userIdentifier.length === 0 ) {
      setValidationError('User identifier cannot be empty')
    } else {
      setValidationError('')
    }
  }

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          Please enter your username:
        <input
            type="text"
            value={userIdentifier}
            onChange={e => {
              const { target: { value = '' } = {} } = e
              if (value.length > 32) {
                setValidationError('User identifier cannot be any longer than 32 characters')
                setUserIdentifier(value.slice(0, 32))
              } else {
                setUserIdentifier(value)
              }
            }}
          />
        </label>
        <input type="submit" value="Submit" />
        <StyledValidationError>{validationError}</StyledValidationError>
      </StyledForm>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const StyledValidationError = styled.div`
  color: red;
`

export default CheckOffer
