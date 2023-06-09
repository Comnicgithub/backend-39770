let agregarACarrito = document.getElementById("agregarACarrito")

function eventoClick(){
    if (confirm("Desea agregar este producto al carrito?")) {
        alert("Agregaste un producto nuevo a tu carrito")
    }
}

agregarACarrito.addEventListener("click", eventoClick)



