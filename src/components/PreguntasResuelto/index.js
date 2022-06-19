import React from 'react'
import './PreguntasResuelto.css'

//console.log(preguntasDB);

function PreguntasResuelto({correcta,respuestas,pregunta, nroPregunta,siguientePregunta, seleccionada,maxPreguntas,handleTerminar}) {
  //console.log(seleccionada);
  let letra=['A','B','C','D'];

  return (
    <div className='PreguntasResuelto'>
        <h1>{nroPregunta}. {pregunta}</h1>
        <div className='Preguntas'>
            <ul className='PreguntasListaResuelto'>
              {respuestas.map((el,index) => 
              <li 
                key={el.id} 
                className={(el.id !==correcta ?'mal':'bien') + (index===seleccionada ? 'selected':'')} >
                  {letra[index]} - {el.text}
              </li>
              )}
              {maxPreguntas === nroPregunta ? 
                <div className='siguienteCont'> <button onClick={handleTerminar}>Terminar &gt;</button></div>
                :
                <div className='siguienteCont'> <button onClick={siguientePregunta}>Siguente &gt;</button></div>
                }
              
            </ul>
            
            
        </div>
    </div>
  )
}

export default PreguntasResuelto