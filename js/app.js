// Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let cursosCarrito = []

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


  // Agregamos los cursos al arreglo de cursos
  cursosCarrito = [...cursosCarrito, infoCurso]
  carritoHTML()
}


// Muestra los cursos agregados al carrito de cmpras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML()

  // Recorre el carrito  y genera el HTML
  cursosCarrito.forEach( curso => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
        ${curso.nombre}
      </td>
    `
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row)
  })
}

// Elimina los cursos del tbody
function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}