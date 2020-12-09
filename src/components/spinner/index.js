// found souce code on https://loading.io/css/
// kept css for simplicity
import './index.css'

const Spinner = () => {
  return (
    <div className="lds-ellipsis" data-testid="spinner"><div></div><div></div><div></div><div></div></div>
  )
}

export default Spinner