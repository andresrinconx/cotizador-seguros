import useCotizador from "../hooks/useCotizador"
import Formulario from "./Formulario"
import Resultado from "./Resultado"
import Spinner from "./Spinner"

export default function AppSeguro() {
  const {cargando} = useCotizador()

  return (
    <>
      <header className='my-10'>
        <h1 className='text-4xl text-center font-black text-white'>Cotizador de Seguros de Auto</h1>
      </header>
      <main className='bg-white shadow mx-auto rounded-lg p-10 md:2/3 lg:2/4'>
        <Formulario />

        {cargando ? <Spinner /> : <Resultado />}
      </main>
    </>
  )
}
