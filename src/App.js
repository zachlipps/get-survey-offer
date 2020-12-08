import { SurveryContextProvider } from './contexts'
import { CheckOffer } from './components'
import styled from 'styled-components'

function App() {
  return (
    <AppStyles>
      <SurveryContextProvider>
        <CheckOffer />
      </SurveryContextProvider>
    </AppStyles>
  )
}

const AppStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 5%;
`

export default App
