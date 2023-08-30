import { useMemo, useRef } from 'react'
import { marcas, planes } from "../constants"
import useCotizador from "../hooks/useCotizador"

export default function Resultado() {
  const { resultado, datos: { marca, year, plan } } = useCotizador()
  const yearRef = useRef(year) // mantiene un valor (el argumento), de una forma en la que no hace una re-renderizacion

  // dos argumentos, una funcion, y arreglo de dependencias
    // lo que hace es MEMORIZAR la funcion y solo ejecutarla cuando las dependencias cambian
    // marca sel es la funcion memorizada... (USE CALLBACK)
    // marca sel es el return de la funcion (objeto) memorizado... (USE MEMO)
  const marcaSel = useMemo(() => marcas.find(m => m.id === Number(marca)), [resultado]) // find devuelve el elemento que cumple la condicion, uno solo
  // useCallback retorna lo que retorna la funcion, pero unicamente se ejecuta cuando la dependencia cambia
  // marcaSel seria el objeto (el elemento que cumple la condicion (solo 1))
  const planSel = useMemo(() => planes.find(m => m.id === Number(plan)), [resultado])

  if (resultado === 0) return null

  return (
    <div className='bg-gray-100 text-center mt-5 p-5 shadow'>
      <h2 className='text-gray-600 font-black text-3xl'>Resumen</h2>

      <p className='my-2'><span className='font-bold'>Marca: </span>{marcaSel?.nombre}</p>
      <p className='my-2'><span className='font-bold'>Plan: </span>{planSel?.nombre}</p>
      <p className='my-2'><span className='font-bold'>Year: </span>{yearRef.current}</p> {/* en current se almacena el valor de la referencia */}
      <p className='my-2 text-2xl'><span className='font-bold'>Total Cotizacion: </span>${resultado.toFixed(2)}</p>
    </div>
  )
}
