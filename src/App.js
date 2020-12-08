import { SurveryContextProvider } from './contexts'
import { CheckOffer } from './components'
import styled from 'styled-components'

function App() {
  return (
    <AppStyles>
      <div className="App">
        <SurveryContextProvider>
          <CheckOffer />
        </SurveryContextProvider>
      </div>
    </AppStyles>
  )
}

const AppStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App
