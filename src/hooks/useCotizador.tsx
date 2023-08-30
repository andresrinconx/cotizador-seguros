import { useContext } from "react"
import CotizadorContext from "../context/CotizadorProvider"

const useCotizador = () => {
  return useContext(CotizadorContext) // retorna los valores del contexto que se le pase
}

export default useCotizador