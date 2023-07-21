var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var ProductCategoryInput = document.getElementById("ProductCategory")
var ProductDescriptionInput = document.getElementById("ProductDescription")
var searchInput = document.getElementById("searchInput")

var productsArray = []
var temp = ""
var amr = 0

document.getElementById("edit").style.display = "none"
document.getElementById("regexName").style.display = "none"
document.getElementById("regexPrice").style.display = "none"


if (localStorage.getItem("Products") != null) {
    productsArray = JSON.parse(localStorage.getItem("Products"));
    displayProduct(productsArray);
}

function addProduct() {
    if (checkProductName() == true && checkProductPrice() == true) {

        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: ProductCategoryInput.value,
            description: ProductDescriptionInput.value,
        }

        productsArray.push(product);
        localStorage.setItem("Products", JSON.stringify(productsArray))
        displayProduct(productsArray);
        clearForm();

    }

}

function displayProduct(arrayParameter) {
    var temp = ""
    for (var i = 0; i < arrayParameter.length; i++) {
        temp = temp + `<tr>
    <td class = "color text-center">${i}</td>
    
    <td>${(arrayParameter[i].name.charAt(0).toUpperCase() + arrayParameter[i].name.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td>${arrayParameter[i].price}</td>
    
    <td>${(arrayParameter[i].category.charAt(0).toUpperCase() + arrayParameter[i].category.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td>${(arrayParameter[i].description.charAt(0).toUpperCase() + arrayParameter[i].description.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td> <a href="#" onclick="update(${i})" class="bg-color btn bg-warning"><i class="fa-solid fa-pen-to-square"></i></a></td>
    <td> <button onclick="deleteProduct(${i})" class="btn bg-danger"><i class="fa-solid fa-trash"></i></button></td>
    </tr > `
    }
    document.getElementById("productsContent").innerHTML = temp
}

function deleteProduct(i) {
    productsArray.splice(i, 1);
    localStorage.setItem("Products", JSON.stringify(productsArray))
    displayProduct(productsArray);
}

function searchProducts() {
    var matchedProductsArray = []

    for (var i = 0; i < productsArray.length; i++) {
        if (productsArray[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
            matchedProductsArray.push(productsArray[i])
        }
    }

    displayProduct(matchedProductsArray);
}

function update(i) {

    productNameInput.value = productsArray[i].name
    productPriceInput.value = productsArray[i].price
    ProductCategoryInput.value = productsArray[i].category
    ProductDescriptionInput.value = productsArray[i].description

    document.getElementById("addProductelement").style.display = "none";
    document.getElementById("edit").style.display = "inline-block";
    amr = i
}

function clearForm() {
    productNameInput.value = ""
    productPriceInput.value = ""
    ProductCategoryInput.value = ""
    ProductDescriptionInput.value = ""
}

function editProducts() {

    document.getElementById("addProductelement").style.display = "inline-block";
    document.getElementById("edit").style.display = "none";


    productsArray[amr].name = productNameInput.value
    productsArray[amr].price = productPriceInput.value
    productsArray[amr].category = ProductCategoryInput.value
    productsArray[amr].description = ProductDescriptionInput.value

    localStorage.setItem("Products", JSON.stringify(productsArray))

    displayProduct(productsArray)
    clearForm()
}



//! lma ados 3la update y3ml scroll up w y focus el screen
//? lma a3ml search 3la 7aga w agrb ams7 aw a edit el index elly shaylo el zrayr byt8yr 
//! ezay fi goz2 el display lma a search 3la 7aga mn nos elkelma y3mlha replace brdo blon mo5tlf



function checkProductName() {

    var regexName = /^[A-Z][a-z]{3,8}[0-9]{0,2}$/

    if (regexName.test(productNameInput.value) == true) {

        document.getElementById("regexName").style.display = "none"

        return true;
    }
    else {
        document.getElementById("regexName").style.display = "block"
        return false;
    }

}



function checkProductPrice() {

    var regexPrice = /^[0-9]{3,6}$/

    if (regexPrice.test(productPriceInput.value) == true) {
        document.getElementById("regexPrice").style.display = "none"
        return true;
    }
    else {
        document.getElementById("regexPrice").style.display = "block"
        return false;
    }
}

