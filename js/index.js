var productNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var ProductCategoryInput = document.getElementById("ProductCategory")
var ProductDescriptionInput = document.getElementById("ProductDescription")
var searchInput = document.getElementById("searchInput")

var productsArray = []
var temp = ""
var amr = 0

document.getElementById("edit").style.display = "none"

if (localStorage.getItem("Products") != null) {
    productsArray = JSON.parse(localStorage.getItem("Products"));
    displayProduct(productsArray);
}

function addProduct() {
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

function displayProduct(arrayParameter) {
    var temp = ""
    for (var i = 0; i < arrayParameter.length; i++) {
        temp = temp + `<tr>
    <td class = "color">${i}</td>
    
    <td>${(arrayParameter[i].name.charAt(0).toUpperCase() + arrayParameter[i].name.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td>${arrayParameter[i].price}</td>
    
    <td>${(arrayParameter[i].category.charAt(0).toUpperCase() + arrayParameter[i].category.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td>${(arrayParameter[i].description.charAt(0).toUpperCase() + arrayParameter[i].description.slice(1).toLowerCase()).replace((searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase()), `<span class="bg-info">${(searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1).toLowerCase())}</span>`)
            }</td >
    <td> <button onclick="update(${i})" class="bg-color btn bg-warning"><i class="fa-solid fa-pen-to-square"></i></button></td>
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



 //! (arrayParameter[i].name.charAt(0).toUpperCase() + arrayParameter[i].name.slice(1).toLowerCase())
 //? Gamda awi

 //! lma ados 3la update y3ml scroll up w y focus el screen