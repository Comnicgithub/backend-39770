const socket = io()
console.log('js de index')

function emit_data() {
    socket.emit( //emit envia datos (en este caso desde el cliente hacia el servidor)
        'primer_conexion', //identificador del mensaje
        { //objeto con las propiedades a enviar (en este caso al servidor)
            name: 'Nico',
            last_name: 'Lopez',
            age: 37
        }
    )
}

let selectors = document.querySelectorAll('.btn')
console.log(selectors)
selectors.forEach(each => each.addEventListener('click', emit_data))

socket.on(
    'contador',
    data => console.log(data)
)