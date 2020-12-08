import { SurveryContextProvider } from './contexts'
import { CheckOffer } from './components'
import styled from 'styled-components'

function App() {
  return (
    <AppStyles>
      <NavBar>
        <a href='/weather.html'>go to weather styling</a>
      </NavBar>
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

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
`

export default App
