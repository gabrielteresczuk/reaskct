
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { preguntasDB } from './assets/preguntasDB';
import Circles from './components/Circles';
import Loading from './components/Loading';
import PreguntasCont from './components/PreguntasCont';
import PreguntasResuelto from './components/PreguntasResuelto';
import Resultados from './components/Resultados';
import Score from './components/Score';


function App() {


  const MAXPREGUNTAS = 3;

  const [score, setScore] = useState(0);
  const [nroPregunta, setNroPregunta] = useState(1);
  const [respEnviada, setRespEnviada] = useState(0);
  const [seleccionada, setSeleccionada] = useState('');
  const [correcta, setCorrecta] = useState(0);
  const [esCorrecta, setEsCorrecta] = useState(false);
  const [respuestas, setRespuestas] = useState('');
  const [idPregunta, setIdPregunta] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [fin, setFin] = useState(false);
  const [datos, setDatos] = useState('');
  const [loader, setLoader] = useState(true);
  
  // Referencia para usar el teclado en el body de la app
  const app = useRef(null);

  //Al iniciar carga el Loader con las preguntas
  useEffect(() => {
    const fetchData = async () => {
      let myPromise = new Promise(function(myResolve, myReject) {
          setTimeout(function() { 
              myResolve(preguntasDB); 
          }, 700);
      });
      setDatos(await myPromise);
      setLoader(false);
    }

    fetchData();
  }, [])
  

  //cuando cambia el valor de DATOS, es por que se resto una pregunta
  useEffect(() => {

    if (!loader){
      let nro = 0;
      nro = Math.floor(Math.random() * datos.length);
      let pregunta=datos[nro];
      let arrayResp = [...pregunta.respuestas];
      arrayResp = arrayResp.sort((a, b) => 0.5 - Math.random());
      setRespuestas(arrayResp);
      setPregunta(datos[nro].pregunta);
      setCorrecta(datos[nro].correcta);
      setIdPregunta(datos[nro].id);

      
      app.current.focus();
    }
  }, [datos,loader]);

  //Al dar Click, se envia una respuesta y se evalua
  const handleRespuesta = (respuesta,index) => {
    if(respuesta === correcta){
      //console.log('correcto');
      setScore(score+10);
      setEsCorrecta(true);
    }else{
      //console.log('errado');
      setEsCorrecta(false);
    }
    setRespEnviada(1);
    setSeleccionada(index);
  }

  //Al dar click en el boton siguiente pregunta, para avanzar
  const siguientePregunta = () => {
    //console.log('siguiente');
    if (nroPregunta === MAXPREGUNTAS){
      console.log('juego terminado');
    }else{
      setNroPregunta(nroPregunta+1);
      setRespEnviada(0);
      let nuevoDatos = [...datos];
      nuevoDatos = nuevoDatos.filter(el => el.id !== idPregunta);
      setDatos(nuevoDatos);
    }

  }

  //Manejo de Teclas
  const handleKey = (e) => {
    if(!respEnviada){
      if(e.keyCode === 65){
        handleRespuesta(respuestas[0].id,0);
      }
      if(e.keyCode === 66){
        handleRespuesta(respuestas[1].id,1);
      }
      if(e.keyCode === 67){
        handleRespuesta(respuestas[2].id,2);
      }
      if(e.keyCode === 68){
        handleRespuesta(respuestas[3].id,3);
      }
    }else{
      if(e.keyCode === 32){
        siguientePregunta();
      }
    }

    if(nroPregunta === MAXPREGUNTAS){
      if(e.keyCode === 32){
        handleTerminar();
      }
    }

    if(fin){
      if(e.keyCode === 32){
        handleReset();
      }
    }


  }
  
  //Al presionar el boton TERMINAR
  const handleTerminar = () => {
    setFin(true);
    setRespEnviada(0);
  }

  //Al Presionar el boton incializar
  const handleReset = () => {
    setScore(0);
    setNroPregunta(1);
    setRespEnviada(0);
    setSeleccionada('');
    setCorrecta(0);
    setEsCorrecta(0);
    setRespuestas('');
    setPregunta('');
    setFin(false);
    setDatos(preguntasDB);
  }

  return (
    <div className="App" tabIndex="0" onKeyDown={handleKey} ref={app}>
      
          <div className="area" >

            <div className='AppContainer'>
              <h1 className='AppTitulo'>RE<span>Ask</span>CT</h1>

              <Score score={score} 
              nroPregunta={nroPregunta} 
              maxPreguntas={MAXPREGUNTAS} 
              esCorrecta={esCorrecta}
              respEnviada={respEnviada}
              />
            
                {
                /*Esta esta cargando? sino, pregunta si todavia NO termino el juego*/ 
                loader ? <Loading/> : 

                  /*Si NO termino, que cargue las preguntas, si termino, Mostrar resultados*/   
                  !fin?

                    //Hay alguna pregunta?, carga la interfaz
                    pregunta ?          
                      //La pregunta, NO se respondio?, sino carga el contendor con respuestas         
                      !respEnviada? 
                      <PreguntasCont 
                        handleRespuesta={handleRespuesta} 
                        respuestas={respuestas} 
                        pregunta={pregunta}
                        nroPregunta={nroPregunta}
                        handleKey={handleKey}
                      />
                      : <PreguntasResuelto
                        handleRespuesta={handleRespuesta} 
                        respuestas={respuestas} 
                        pregunta={pregunta}
                        nroPregunta={nroPregunta}
                        correcta={correcta}
                        siguientePregunta={siguientePregunta}
                        seleccionada={seleccionada}
                        maxPreguntas={MAXPREGUNTAS}
                        handleTerminar={handleTerminar}
                      />
                    :''

                  :<Resultados 
                  maxPreguntas={MAXPREGUNTAS}
                  score={score}
                  handleReset={handleReset}  
                  />


                }

                <div className='AppAutor'>
                  <div>Teresczuk Gabriel</div>
                  <div className="tooltip">?
                  <div className="tooltiptext">Puedes usar las letras A,B,C,D y ESPACE</div>
                  </div>
                </div>
            </div>
            
            {/*Carga los dibujos del fonto*/}
            <Circles/>
          </div>

    </div>
  );
}

export default App;
