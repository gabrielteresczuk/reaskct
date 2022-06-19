import React from 'react'
import './Score.css'

function Score({score, nroPregunta, maxPreguntas,esCorrecta,respEnviada}) {
  
  let correcto = ['👑','😁','😎','🤩','🥳','😆'];
  let incorrecto = ['😥','😫','😓','😭','😖','😩'];

  let nro =  Math.floor(Math.random() * correcto.length);
  

  return (
    <div className='Score'>
     <div className='ScoreScore'>Score {score} PT</div>
     <div className='ScoreRespuesta'>{respEnviada ? esCorrecta? 'Correcto! '+ correcto[nro]:'Incorrecto!' + incorrecto[nro] : ''}</div>
     <div className='ScorePreguntas'>Preguntas {nroPregunta}-{maxPreguntas}</div>
    </div>
  )
}

export default Score