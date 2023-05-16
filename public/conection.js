const socket = io()

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

// socket.on(
//     'num_products',
//     data => console.log(data)
// )

// socket.on('num_products', data => {
//     const contadorSpan = document.getElementById('num_products');
//     contadorSpan.innerText = data.contador;
// });

socket.on('connect', () => {
        let selector = document.querySelectorAll('#btn')
        selector.forEach(each => each.addEventListener('click'))
        socket.emit('agregar_a_carrito')
    })
    
    socket.on('num_products', numProducts => {
        const contadorSpan = document.getElementById('contador');
        contadorSpan.innerText = numProducts;
    })
    
