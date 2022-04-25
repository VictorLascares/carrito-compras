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

  // Eliminar cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    cursosCarrito = [] // Reseteamos el arreglo
    limpiarHTML() // Eliminamos todo de el HTML
  })
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

  // Revisa si un elemento ya existe en el carrito
  const existe = cursosCarrito.some( curso => curso.id === infoCurso.id )

  if (existe) {
    // Actualizamos la cantidad
    const cursos = cursosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++
        return curso // retorna el objeto actualizado
      } else {
        return curso // retorna los objetos que no son los duplicados
      }
    })
    cursosCarrito = [...cursos]
  } else {
    // Agregamos los cursos al arreglo de cursos
    cursosCarrito = [...cursosCarrito, infoCurso]
  }
  console.log(cursosCarrito);
  carritoHTML()
}


// Muestra los cursos agregados al carrito de cmpras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML()

  // Recorre el carrito  y genera el HTML
  cursosCarrito.forEach( curso => {
    const { imagen, nombre, precio, cantidad, id } = curso
    const row = document.createElement('tr')
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100" >
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
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

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id')

    // Eliminar curso del arreglo de cursos
    cursosCarrito = cursosCarrito.filter(curso => curso.id !== cursoId)

    // Iterar sobre el carrito y mostrar su HTML
    carritoHTML()
  }
}