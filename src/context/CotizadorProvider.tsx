import { createContext, useState } from "react"
import { calcularMarca, calcularPlan, obtenerDiferenciaYear } from "../helpers"

// la primera parte es el tipo generico que toma ts para especificar explicitamente los td, que seria un objeto donde se define eso mismo
// la segunda parte son simplemente valores por defecto de cada "cosa" que se pase por el contexto
  // aqui se definen los datos o tipos de datos que se van a tener en el contexto, y se le coloca un objeto, que serian los valores por defecto (esto como argumento)
export const CotizadorContext = createContext<{ 
  handleChangeDatos: (e: {target: {name: string, value: string}}) => void
  datos: {marca: string, year: string, plan: string}
  error: string
  setError: (e: string) => void // no devuelve valor .
  cotizarSeguro: () => void
  resultado: number
  cargando: boolean
}>({
  handleChangeDatos: () => {}, // funcion que no recibe argumetos y no retorna nada
  datos: {marca: '', year: '', plan: ''},
  error: '',
  setError: () => {},
  cotizarSeguro: () => {},
  resultado: 0,
  cargando: false,
})

// el provider es una funcion
export const CotizadorProvider = ({ children }: { children: React.ReactNode}) => {
  const [datos, setDatos] = useState({marca: '', year: '', plan: ''})
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(0)
  const [cargando, setCargando] = useState(false)

  // funcion que se ejecuta cuando se cambia el valor de algun input
  const handleChangeDatos = (e: {target: {name: string, value: string}}) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value // se accede a la propiedad de manera dinamica, con los corchetes
    })
  }

  // cotizacion
  const cotizarSeguro = () => {
    let resultado = 2000
    const diferencia = obtenerDiferenciaYear(Number(datos.year))
    resultado -= ((diferencia * 3) * resultado) / 100
    resultado *= calcularMarca(datos.marca)
    resultado *= calcularPlan(datos.plan)
    setCargando(true)
    setTimeout(() => {
      setResultado(resultado)
      setCargando(false)
    }, 3000);
  }

  // retorna el contexto con el provider
  // recibe un prop llamado value
  return (
    <CotizadorContext.Provider
      value={{
        handleChangeDatos,
        datos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    > {/* en el value va lo que se va a poder acceder en la app en si, states, etc */}
      {children} {/* son todos los hijos, que tendran acceso a los datos */}
    </CotizadorContext.Provider>
  )

}

export default CotizadorContext