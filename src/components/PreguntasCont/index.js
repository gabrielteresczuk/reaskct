import React from 'react'
import './PreguntasCont.css'


function PreguntasCont({handleRespuesta,respuestas,pregunta, nroPregunta}) {

  return (
    <div className='PreguntasCont' >
    
        <h1>{nroPregunta}. {pregunta}</h1>
        <div className='Preguntas'>
            <ul className='PreguntasLista' >
                <li className='Pregunta1' onClick={() => handleRespuesta(respuestas[0].id,0)}>A - {respuestas[0].text}</li>
                <li className='Pregunta2' onClick={() => handleRespuesta(respuestas[1].id,1)}>B - {respuestas[1].text}</li>
                <li className='Pregunta3' onClick={() => handleRespuesta(respuestas[2].id,2)}>C - {respuestas[2].text}</li>
                <li className='Pregunta4' onClick={() => handleRespuesta(respuestas[3].id,3)}>D - {respuestas[3].text}</li>
                <div className='siguienteDisabled'><button >Siguente &gt;</button></div>
            </ul>
        </div>
    </div>
  )
}

export default PreguntasCont