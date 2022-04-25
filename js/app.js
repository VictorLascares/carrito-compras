// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

cargarEventListener()
function cargarEventListener() {
  // Cuando se agrega un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener('click', agregarCurso)
}

// Funciones
function agregarCurso( e ) {
  e.preventDefault()
  if ( e.target.classList.contains('agregar-carrito') ) {
    const cursoSeleccionado = e.target.parentElement.parentElement 
    leerDatosCurso( cursoSeleccionado )
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  // Creamos un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('.imagen-curso').src,
    nombre: curso.querySelector('.info-card h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('.agregar-carrito').getAttribute('data-id'),
    cantidad: 1
  }

  console.log(infoCurso);
}