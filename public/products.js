const currentCart = 1

const clickAddCart = (pid, data) => {
    console.log("click!")
    console.log(id)

    const url = `localhost:3000/api/carts/${currentCart}`
    const a = fetch(url, {
        method: "POST",
        body: {
            
        }
    })
}

document.addEventListener("DOMContentLoaded", (a, b, c) => {
    const addCartButtons = document.querySelectorAll(".agregar-carrito")
    addCartButtons.forEach(e => {
        e.addEventListener("click", (data) => {
            const id = e.parentElement.parentElement.querySelector(".thumbnailContainer").querySelector(".card-img-top").alt
            clickAddCart(id, data)
        })
    })
})