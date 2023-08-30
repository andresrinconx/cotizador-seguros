import { Fragment } from 'react'
import { marcas, years, planes } from '../constants'
import useCotizador from '../hooks/useCotizador'
import Error from './Error'

export default function Formulario() {
  const {datos, handleChangeDatos, error, setError, cotizarSeguro} = useCotizador()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(datos).includes('')) {
      setError('Error, campos obligatorios')
      return
    }
    setError('')
    cotizarSeguro()
  }
  
  return (
    <>
      {error && <Error />}
      <form onSubmit={handleSubmit}>
        <div className='my-5'>

          {/* marcas */}
          <label htmlFor='marca' className='block mb-3 font-bold text-gray-400 uppercase'>Marca</label>
          <select className='w-full p-3 bg-white border border-gray-200'
            onChange={e => handleChangeDatos(e)}
            name='marca'
            id='marca'
            value={datos.marca}
          >
            <option value=''>-- Seleccione Marca --</option>
            {marcas.map((marca: {nombre: string, id: number}) => {
              const {nombre, id} = marca
              return (
                <option key={id} value={`${id}`}>{nombre}</option>
              )
            })}
          </select>
          
          {/* years */}
          <label htmlFor='year' className='block mb-3 font-bold text-gray-400 uppercase mt-10'>Year</label>
          <select className='w-full p-3 bg-white border border-gray-200'
            onChange={e => handleChangeDatos(e)} 
            name='year' 
            id='year'
            value={datos.year}
          >
            <option value=''>-- Seleccione Year --</option>
            {years.map((year: number) => {
              return (
                <option key={year} value={`${year}`}>{year}</option>
              )
            })}
          </select>

          {/* planes */}
          <label htmlFor='plan' className='block mb-3 font-bold text-gray-400 uppercase mt-10'>Planes</label>
          <div className='flex gap-3'>
            {planes.map((plan: {nombre: string, id: number}) => {
              const {id, nombre} = plan
              return (
                <Fragment key={id}>
                  <label>{nombre}</label>
                  <input
                    onChange={e => handleChangeDatos(e)}
                    type='radio'
                    value={plan.id}
                    name='plan' // tienen que tener el mismo name para que se pueda seleccionar solo uno
                  />
                </Fragment>
              )
            })}
          </div>
        </div>

        <input className='w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold'
          type='submit'
          value={'Cotizar'}
        />
      </form>
    </>
  )
}
