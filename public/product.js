function post(path, title, description, price, stock, url_photo ) {
    document.getElementById("formField").title = title;
    document.getElementById("formField").description = description;
    document.getElementById("formField").price = price;
    document.getElementById("formField").stock = stock;
    document.getElementById("formField").url_photo = url_photo;

    document.getElementById("form").action = path;
    document.getElementById("form").submit();
}

post("https://www.wikipedia.org/", "Writer", "Jim Collins");