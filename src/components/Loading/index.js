import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div className='LoadingCont' >
    
        <h1 className='preguntaLoading skeleton'>.</h1>
        <div className='Preguntas'>
            <ul className='PreguntasListaLoading' >
                <li className='PreguntaLoading skeleton' >A -</li>
                <li className='PreguntaLoading skeleton' >B -</li>
                <li className='PreguntaLoading skeleton' >C -</li>
                <li className='PreguntaLoading skeleton' >D -</li>
                <div className='siguienteLoading'><button className='skeleton'>Siguente &gt;</button></div>
            </ul>
        </div>
    </div>
  )
}

export default Loading