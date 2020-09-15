import React, { useState } from 'react';
import './App.css';



const App = () => {

  //EJERCICIO 1
  //ESTADOS
  const [arreglo, setArreglo] = useState('');
  const [numero, setNumero] = useState('');
  const [respuesta1, setRespuesta1] = useState('');

  //VALIDACIONES


  //ALGORITMO DEL EJERCICIO 1
  const ejercicio1 = () => {
    var resultado = [] //Contendrá todas las soluciones posibles
    var usados = [] //Almacena las claves ya usadas para no repetirlas
    if( arreglo.trim() === '' || numero.trim() === '' ){
      alert('Debe llenar todos los campos')
      return;
    } 
    if( !arreglo.match(/^(-*\d+,*)+$/) ) {
      alert('El arreglo debe contener solo números negativos y/o positivos separados por comas')
      return;
    }
    if( isNaN(numero) ) {
      alert('El número no es válido')
      return;
    }
    var elementos = arreglo.split(',');
    for(let i in elementos){ //Recorremos el arreglo en x
      if( !usados.includes(Number(i)) ){
        for (let j = Number(i)+1; j < elementos.length; j++) { //Recorremos el arreglo en y, usamos la forma clásica por el valor inicial de j
          if( !usados.includes(Number(j)) ){
            if (Number(elementos[i]) + Number(elementos[j]) === Number(numero)) { //Comprobamos que sume el dígito ingresado
              usados.push(i,j) //Almacenamos los usados
              resultado.push([elementos[i],elementos[j]]); //Almacenamos el resultado
              break;
            }
          }
        }
      }
    }
    //Renderizamos el componente del resultado
    setRespuesta1(
      <>
        <p>{`Total: ${resultado.length}`}</p>
        <pre>
  {JSON.stringify(resultado)}
        </pre>
      </>
    )
  }



  //ESTADOS EJERCICIO 2
  const [patron, setPatron] = useState('');
  const [cadena, setCadena] = useState('');
  const [respuesta2, setRespuesta2] = useState('');


  //ALGORITMO DEL EJERICIO 2
  const ejercicio2 = () => {
    var respuesta = true
    var listaPatron = [] //Creamos un arreglo con las letras del patrón que se almacenarán
    var listaCadena = [] //Creamos un arreglo con las palabras de la cadena que se almacenarán
    if( patron.trim() === '' || cadena.trim() === '' ){
      alert('Debe llenar todos los campos')
      return;
    }
    if( !patron.match(/^[a-z]+$/) ){
      alert('Ingrese solo letras en el patrón')
      return;
    }
    if( !cadena.match(/^([a-z1-9]+\s{0,1})+$/) ){
      alert('Ingrese solo letras, número y separelas solo por un espacio en la cadena de texto.')
      return;
    }
    var arrPatron = Array.from(patron) //Transformamos el patrón el arreglo
    var arrCadena = cadena.split(' ')
    
    //Verificamos que las longitudes sean iguales, sino no cumple el patrón
    if(arrPatron.length !== arrCadena.length){
      setRespuesta2(<p>La respuesta es: FALSO</p>)
      return;
    }

    //Recorremos el patrón como base. Se entiende que son la misma longitud
    for( let i in arrPatron ){
      //Si uno existe y el otro no, se entiende que ya no se cumple el patrón, por ende ponemos como defecto false
      respuesta = false

      //Verificamos que no exista la letra del patrón ni la palabra de la cadena para crear
      if( !listaPatron.includes(arrPatron[i]) && !listaCadena.includes(arrCadena[i]) ){
        listaCadena[i] = arrCadena[i]
        listaPatron[i] = arrPatron[i]
        respuesta = true
      }

      //Comprobamos que ambas estén creadas para verificar la relación
      else if( listaPatron.includes(arrPatron[i]) && listaCadena.includes(arrCadena[i]) ){
        for(let j in listaCadena){
          //Comprobamos que respete la relación creada
          if( listaCadena[j] === arrCadena[i] && listaPatron[j] === arrPatron[i] ){
            respuesta = true
            break;
          }
        }
      }
      //Basta una respuesta en falso para que el patrón no se cumpla
      if(!respuesta){
        setRespuesta2(<p>La respuesta es: FALSO</p>)
        return;
      }
    }

    //Si llegó hasta acá quiere decir que pasó todas las pruebas el patrón
    setRespuesta2(<p>La respuesta es: VERDADERO</p>)

  }


  //RENDERIZACIÓN DEL COMPONENTE
  return (
    <>
    <h1>TheGoldenGarbage</h1>
    <ul>
      <li>Ejercicio 1 y Ejercicio 2 está en base al correo</li>
      <li>Los campos no se vacían a propósito con el fin de que se haga una comparación</li>
      <li>Las comillas de la respuesta del Ejercicio 1 se debe a la función stringify</li>
      <li>Para este desarrollo se utilizó ReactJS</li>
    </ul>
    <div className='contenedor'>
      <div className='ejercicio'>
        <h3>Ejercicio 1</h3>
        <div>
          <label>Introduzca el arreglo</label>
          <input 
            className='input' 
            onChange={(e) => setArreglo(e.target.value)}
            value={arreglo}
            placeholder='Separe por comas. Ej. 1,1,1,-5'
          />
        </div>
        <div>
          <label>Introduzca el número</label>
          <input 
            type='number' 
            className='input' 
            onChange={(e) => setNumero(e.target.value)}
            value={numero}
            placeholder='Ej. 2'
          />
        </div>
        <div>
          <button className='button' onClick={ejercicio1}>
            Calcular
          </button>
        </div>
        <div>
          {respuesta1}
        </div>
      </div>
      <div className='ejercicio'>
        <h3>Ejercicio 2</h3>
        <div>
          <label>Introduzca el patrón</label>
          <input 
            className='input'
            onChange={(e) => setPatron(e.target.value)}
            value={patron} 
            placeholder='Ej. abbab'/>
        </div>
        <div>
          <label>Introduzca la cadena de texto</label>
          <input
            className='input'
            onChange={(e) => setCadena(e.target.value)}
            value={cadena} 
            placeholder='Separe por espacios. Ej. perro gato gato ...'/>
        </div>
        <div>
          <button className='button' onClick={ejercicio2}>
            Comprobar
          </button>
        </div>
        <div>
          {respuesta2}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
