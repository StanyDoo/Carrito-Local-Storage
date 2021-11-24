//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

createEventListeners();
function createEventListeners(){
//Agregatr cursos presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
   
//Eliminar cursos del carrito    
    carrito.addEventListener('click', eliminarCarrito);

//Muestra los cursos de Local Storage

document.addEventListener('DOMContentLoaded', ()=>{

    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
})

//Vaciar el carrito
    btnVaciarCarrito.addEventListener('click', () => {

        articulosCarrito= [];//Reseteamos el arreglo

        limpiarHTML();//Eliminamos todo el HTML

    });

}

//funciones

function agregarCurso(e){
//Si da clic en un elemnto con la clase agregar carrito que muestre el HTML 
//Target muestra el html sobre el que se ejecuta el evento
    if(e.target.classList.contains('agregar-carrito')){
       
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
       
    }


}

    function vaciarCarrito(){

 while(articulosCarrito !== ''){

    articulosCarrito = '';
 }
    


}

function eliminarCarrito(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        console.log(articulosCarrito);

    }

    carritoHTML();


}

//Lee el contenido del HTML al que le dimos clic y extrae informacion del curso
function leerDatosCurso(curso){ //Extraer los datos del curso

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento aya existe en el carrito
    //Some verifica que se cumpla la condicion con alguno de los elementos del arreglo

    const existe = articulosCarrito.some( curso =>  curso.id === infoCurso.id );
    if(existe){
        //Actualizamos la cantidad y se cra un nuevo arreglo con map
        const cursos = articulosCarrito.map( curso => {
                    if(curso.id === infoCurso.id){
                        curso.cantidad++;
                        return curso; //Retorna el objeto actualizado
                    } else {
                        return curso; //Retorna los objetos que no son duplicados
                    }


        });
        //Hacemos una copia de los cursos con spread operator
        articulosCarrito = [...cursos];
        
    } else {

         //Agrega elementos al arreglo de carrito

    //Se usa y se pone articulos carrito con un spread operator para crear una copia
    // y no perder los articulos que vaya agregando
    
    articulosCarrito = [...articulosCarrito, infoCurso];
    
    }


   
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra/agrega el carrito de compras en el HTML
    function carritoHTML(){
        //Limpiar HTML previo

        limpiarHTML();

        //Recorre el carrito y general el html
        articulosCarrito.forEach( curso => {
            //Hacemos destructuring se llama a las propiedades del objeto 
            const {imagen, titulo, precio, cantidad, id} = curso;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                   <img src="${imagen}" width="100">
                </td>
                <td>
                    ${titulo}
                </td>
                <td>
                    ${precio}
                </td>
                <td>
                    ${cantidad}
                </td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                </td>
              
                          `;
            //Agregar el HTML  del carrito en el tbody
            //AppendChild agrega los elementos al final del arreglo

            contenedorCarrito.appendChild(row);

        } );

        //Agregar el carrito de ompras a LOCAL STORAGE
        sincronizarStorage();

    }

    function sincronizarStorage(){

        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

    }

    function limpiarHTML(){
        //Forma lenta de limpiar
        //contenedorCarrito.innerHTML = '';

        //Mejor forma de limpiar

        while(contenedorCarrito.firstChild){

            contenedorCarrito.removeChild(contenedorCarrito.firstChild);

        }

    }