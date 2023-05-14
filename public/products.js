
const currentCart = 1
const websiteUrl = 'http://localhost:3000'

const updateView = async () => {
    const response = await fetch(`${websiteUrl}/api/products`, {
        method: "GET"
    })
    .then(res => res.json())

    if (response.status != 200) return


    const total_container = document.getElementById("containerElementos")
    
    response.products.forEach(e => {
        const card = document.createElement("div")

        const thumbnailContainer = document.createElement("div")
        const anchor = document.createElement("a")
        const img = document.createElement("img")

        const cardBody = document.createElement("div")
        const h5 = document.createElement("h5")
        const p = document.createElement("p")
        const button = document.createElement("button")

        cardBody.appendChild(h5)
        cardBody.appendChild(p)
        cardBody.appendChild(button)
        thumbnailContainer.appendChild(anchor)
        anchor.appendChild(img)

        card.appendChild(thumbnailContainer)
        card.appendChild(cardBody)

        card.classList.add("card")
        thumbnailContainer.classList.add("thumbnailContainer")
        anchor.classList.add("invisible-button")
        img.classList.add("card-img-top")

        cardBody.classList.add("card-body")
        p.classList.add("card-text")
        
        button.classList.add("btn")
        button.classList.add(e.stock > 0 ? "agregar-carrito" : "sin-stock")
        button.textContent = e.stock > 0 ? "AGREGAR AL CARRITO" : "SIN STOCK"

        img.src = e.thumbnail
        img.alt = e.title
        button.type = "button"

        total_container.appendChild(card)

        const pid = e.id
        const units = 1

        anchor.href = `/products/${e.id}`
        button.addEventListener("click", async (data) => {
            const response = await fetch(`${websiteUrl}/api/carts/${currentCart}/product/${pid}/${units}`, {
                method: "PUT",
                body: JSON.stringify({units: units}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (response.status == 200) {
                Swal.fire({
                    title: `Product added successfully`,
                    icon: 'error',
                    position: 'bottom-right',
                    confirmButtonText: 'Cool',
                    showConfirmButton: false,
                    animation: false,
                    toast: true,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true
                })
            }
        })
    })
}

updateView()