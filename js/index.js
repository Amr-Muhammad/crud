var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var ProductCategoryInput = document.getElementById("ProductCategory")
var ProductDescriptionInput = document.getElementById("ProductDescription")
var searchInput = document.getElementById("searchInput")


var b = 0
var productsArray = []
var currentIndex = 0

document.getElementById("edit").style.display = "none"
document.getElementById("regexName").style.display = "none"
document.getElementById("regexPrice").style.display = "none"


if (localStorage.getItem("Products") != null) {
    productsArray = JSON.parse(localStorage.getItem("Products"));
    displayProduct(productsArray);
    eventHandler();
}

if (localStorage.getItem("B") != null) {
    b = JSON.parse(localStorage.getItem("B"))
    console.log(b);
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
        localStorage.setItem("B", JSON.stringify(b))
        clearForm();
        eventHandler();
    }
}

function displayProduct(arrayParameter) {
    var temp = ""
    for (var i = 0; i < arrayParameter.length; i++, b++) {
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
    <td> <button infiniteIndex="${b}" class="btn bg-danger"><i class="fa-solid fa-trash"></i></button></td>
    </tr > `
    }
    document.getElementById("productsContent").innerHTML = temp
}


function eventHandler() {
    var deleteBtns = document.querySelectorAll("[infiniteIndex]")
    for (var i = 0; i < productsArray.length; i++) {
        deleteBtns[i].addEventListener("click", function (e) {
            var infiniteIndex = Number(e.target.getAttribute("infiniteIndex"))
            deleteProduct(infiniteIndex)
        })
    }
}


function deleteProduct(infiniteIndex) {
    productsArray.splice(infiniteIndex, 1);
    localStorage.setItem("Products", JSON.stringify(productsArray))
    displayProduct(productsArray);
    eventHandler();
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
    currentIndex = i
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


    productsArray[currentIndex].name = productNameInput.value
    productsArray[currentIndex].price = productPriceInput.value
    productsArray[currentIndex].category = ProductCategoryInput.value
    productsArray[currentIndex].description = ProductDescriptionInput.value

    localStorage.setItem("Products", JSON.stringify(productsArray))

    displayProduct(productsArray)
    clearForm()
}
















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


