const currentCart = 1
const websiteUrl = 'http://localhost:3000'

const clickAddCart = async (pid, data) => {
    console.log("click!")
    console.log(pid)

    const units = 1
    const url = `${websiteUrl}/api/carts/${currentCart}/product/${pid}/${units}`
    const a = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({units: 1}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())

    console.log(a)
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