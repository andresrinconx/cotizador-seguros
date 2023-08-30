import {CotizadorProvider} from './context/CotizadorProvider'
import AppSeguro from "./components/AppSeguro";

export default function App() {
  return (
    <div className='mx-20'>
      <CotizadorProvider>
        <AppSeguro />
      </CotizadorProvider>
    </div>
  )
}
