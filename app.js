const regExEncriptacion = /[aeiou]/g;
const codigoEncriptacion = {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat'
}

const regExDesencriptacion = /(ai|enter|imes|ober|ufat)/g;
const codigoDesencriptacion = {
  'ai': 'a',
  'enter': 'e',
  'imes': 'i',
  'ober': 'o',
  'ufat': 'u'
}

/*Misma funcion para encriptar y desencriptar.
Parametro: 1-encriptar 2-desencriptar*/
function transformarTexto(opcion) {
  //Obtener valor del text area
  let textoOriginal = document.querySelector('#userInput').value;
  //Si no hay un texto para transformar, terminar la funcion
  if(!textoOriginal.length){
    alert('No has introducido texto aún');
    return;
  } 
  //validar que no se hayan introducido mayusculas o caracteres especiales
  if(validarTexto(textoOriginal)){
    alert('El texto no puede contener mayúsculas ni caracteres especiales');
    return;
  }
  //obtener texto transformado
  let resultado = textoOriginal.replace((opcion === 1 ? regExEncriptacion : regExDesencriptacion), (coincidencia) => {
    return (opcion === 1 ? codigoEncriptacion : codigoDesencriptacion)[coincidencia];
  })
  mostrarResultado(resultado);
}

function validarTexto (texto) {
  //Testear la cadena contra las expresiones regulares que buscan mayusculas y caracteres especiales
  return (/[^a-z0-9\s]/.test(texto));
}

function mostrarResultado(resultado) {
  //Muestra el texto encriptado en el area designada
  document.querySelector('#textoResultado').innerHTML = resultado;
  //Muestra el boton para copiar
  document.querySelector("#botonCopiar").style.display = 'inline-block';
  //Esconde los elementos que no se deben ver una vez que ya hay texto procesado
  document.querySelector("#mensajeDeNoTexto").style.display = 'none';
}

function copiarTexto() {
  // Obtener el texto a copiar
  let texto = document.querySelector('#textoResultado').innerHTML;
  // Usa la API del portapapeles para copiar
  navigator.clipboard.writeText(texto).then(function() {
      alert('Texto copiado al portapapeles!');
  }).catch(function(err) {
      console.error('Error al copiar el texto: ', err);
  });
}