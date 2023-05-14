const websiteUrl = 'http://localhost:3000'

const createView = async () => {
    const { pathname } = window.location
    const response = await fetch(`${websiteUrl}/api${pathname}`, {
        method: "GET"
    })
    .then(res => res.json())

    if (response.status != 200) return

    const bigUniqueProduct = document.getElementById("productContainer")

    const prodTitle = document.createElement("p")
    const prodDescription = document.createElement("p")
    const divisor1 = document.createElement("div")
    const divisor2 = document.createElement("div")
    const prodPrice = document.createElement("p")
    //const addStockBackground = document.createElement("div")
    const addStockSumar = document.createElement("button")
    const addStockRestar = document.createElement("button")
    const addStockInput = document.createElement("input")
    const prodAddButton = document.createElement("button")
    const prodImage = document.createElement("img")

    //productContainer.appendChild(bigUniqueProduct)

    bigUniqueProduct.appendChild(prodTitle)
    bigUniqueProduct.appendChild(prodDescription)
    bigUniqueProduct.appendChild(divisor1)
    bigUniqueProduct.appendChild(divisor2)
    bigUniqueProduct.appendChild(prodPrice)
    //bigUniqueProduct.appendChild(addStockBackground)
    bigUniqueProduct.appendChild(addStockSumar)
    bigUniqueProduct.appendChild(addStockRestar)
    bigUniqueProduct.appendChild(addStockInput)
    bigUniqueProduct.appendChild(prodAddButton)
    bigUniqueProduct.appendChild(prodImage)

    //bigUniqueProduct.classList.add("bigUniqueProduct")
    prodTitle.classList.add("prodTitle-creator")
    prodTitle.classList.add("prodTitle-position-bigproduct")
    prodDescription.classList.add("prodDescription-creator")
    divisor1.classList.add("divisor1")
    divisor2.classList.add("divisor2")
    prodPrice.classList.add("prodPrice-creator")
    prodPrice.classList.add("prodPrice-position")
    //addStockBackground.classList.add("addStockBackground")
    addStockSumar.classList.add("addStock-mas")
    addStockSumar.classList.add("btn")
    addStockRestar.classList.add("addStock-menos")
    addStockRestar.classList.add("btn")
    addStockInput.classList.add("addStock-input")

    prodAddButton.classList.add("btn")
    prodAddButton.classList.add("prodAddButton")
    prodAddButton.classList.add("prodAddButton-enabled")

    prodImage.classList.add("prodImage-big")

    addStockSumar.type = "button"
    addStockRestar.type = "button"

    addStockSumar.textContent = "+"
    addStockRestar.textContent = "-"
    addStockInput.placeholder = "1"

    prodAddButton.textContent = "ADD 1 PRODUCT TO CART"
    prodAddButton.type = "button"

    prodImage.alt = response.product.title

    prodPrice.textContent = response.product.price
    prodTitle.textContent = response.product.title
    prodDescription.textContent = response.product.description

}

createView()