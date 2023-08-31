$(document).ready(function(){
    // localStorage.setItem('cartData',JSON.stringify({}))
$.get('https://5d76bf96515d1a0014085cf9.mockapi.io/product',function(res){
    let product = res;
    let container = document.getElementById("container")
   

    for(let i=0;i<product.length;i++){
        if(product[i].isAccessory===false){
        container.innerHTML += `
        
        <a href='./details.html?id=${product[i].id}' class="card">
        <div class='clothing-section'>
        
            <img src='${product[i].preview}'>    
               <h1 class="name">${product[i].name}</h1>
               <p class="brand">${product[i].brand}</p>
               <p class="price">RS  ${product[i].price}</p>
               
        </div>
        </a>

        `
        }
    }

    let Accessory = document.getElementById("Accessory")


    for(let i=0;i<product.length;i++){
        if(product[i].isAccessory===true){
            Accessory.innerHTML += `
            <a href='./details.html?id=${product[i].id}' class="card">
        <div class='Accesories-section'>
            <img src='${product[i].preview}'>    
               <h1 class="name">${product[i].name}</h1>
               <p class="brand">${product[i].brand}</p>
               <p class="price">RS: ${product[i].price}</p>
        </div></a>

        `
        }
    }

})
})


