import algoliasearch from "algoliasearch";

const client = algoliasearch("YJGIALJJ1Z", "e93fd419ebbb5c49cf5ad08981724dc5");
const index = client.initIndex("pravalika");




  let data = []
let resultsRootElement = document.querySelector('.results');
fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
    data = json;
   // console.log(data)
})
document.querySelector('#searchInput').addEventListener('keyup', ()=>{
    let searchTerm = document.querySelector('#searchInput').value;
    
    let resultsArray = []
    if(String(searchTerm).trim().length > 0){
      index.search(searchTerm).then(response => {
        renderProducts(response.hits)
      })
      

  }
  else{
  
    removeElements()
  }
})

function renderProducts(products){
    removeElements()
    products.forEach(product=>{
    renderSingleProduct(product);
    })
}
function renderSingleProduct(product){
    let resultDiv = document.createElement('div')
    resultDiv.setAttribute('class','result')
    
    let resultImage = document.createElement('img')
    let resultTitle = document.createElement('h4')
    let resultPrice = document.createElement('p')
    let purchaseButton = document.createElement('button')

    resultImage.src = product.image
    resultTitle.innerText = product.title
    resultPrice.innerText = product.price
    purchaseButton.innerText = 'purchase'

resultDiv.appendChild(resultImage)
resultDiv.appendChild(resultTitle)
resultDiv.appendChild(resultPrice)
resultDiv.appendChild(purchaseButton)
resultsRootElement.appendChild(resultDiv)
}
function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
         prod.remove()
     })
 }