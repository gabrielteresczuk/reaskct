import React from 'react'
import './Resultados.css'

function Resultados({score,maxPreguntas,handleReset}) {

    let consejo = "";

    let porcentaje = Math.round(((score/10)/3)*100);
    if(porcentaje <= 33){
        consejo = "Hay que seguir practicando";
    }else if(porcentaje >34 && porcentaje <= 67){
        consejo = "Lo lograste, pero puede ser mejor que esto!";
    }else if(porcentaje > 67){
        consejo = "Eres el mejor, del mejor, de los mejores!";
    }

  return (
    <div className='Resultados'>
        <h1><div>Resultados</div><div>🎉🎊</div></h1>
        <ul className='ResultadosLista'>
            <li>
                <div>Cantidad de Preguntas</div><div>{maxPreguntas}</div>
            </li>
            <li>
                <div>Puntaje Final</div><div>{score} PT</div>
            </li>
            <li>
                <div>Porcentaje de Respuestas</div><div>{porcentaje}%</div>
            </li>
            <li>
                <div>Consejo</div><div className='ResultadoConsejo'>{consejo}</div>
            </li>
            <li>
                <div> </div><div><button className='Restart' onClick={handleReset}>Inicializar</button></div>
            </li>
        </ul>
    </div>
  )
}

export default Resultados