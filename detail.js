// Define the update_main_image function
function update_main_image(new_image) {
    console.log(new_image.src);

    let main_image = document.getElementById("main_image");

    document.getElementById(main_image.dataset.img).classList.remove("active");
    new_image.classList.add("active");
    main_image.src = new_image.src;
    main_image.dataset.img = new_image.id;
}

$(document).ready(function() {
    let id = parseInt(window.location.search.split('=')[1]);
    let container = document.getElementById("container01");
    
    // Initialize cart data in local storage if not already initialized
    let allData = JSON.parse(localStorage.getItem('cartData')) || {};

    // Function to calculate the total cart count
    function calculateTotalQuantity(cartData) {
        let totalQuantity = 0;
        for (let productId in cartData) {
            totalQuantity += cartData[productId].inCart;
        }
        return totalQuantity;
    }

    $.get(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`, function(res) {
        let photosave = '';
        for (let i = 0; i < res.photos.length; i++) {
            photosave += `<img src="${res.photos[i]}" id="image_${i}" onclick="update_main_image(this);">`;
        }

        container.innerHTML = `
            <div class="leftside">
                <img src="${res.preview}" alt="${res.name}" id="main_image" data-img="image_0">
            </div>
            <div class="right">
                <h1 class="name1">${res.name}</h1>
                <h1 class="brand1">${res.brand}</h1>
                <h1 class="price1">Price: Rs <span class="price-rs">${res.price}</span></h1>
                <h1 class="des">Description</h1>
                <h1 class="description">${res.description}</h1>

                <div class="photos">
                    ${photosave}
                </div>
                <button id="button" class="js-button">add to cart</button>
            </div>
        `;

        document.querySelectorAll('.js-button').forEach((btn) => {
            btn.addEventListener('click', function() {
                if (!allData[id]) {
                    allData[id] = { ...res, inCart: 1 };
                } else {
                    allData[id].inCart += 1;
                }

                // Update both local storage and session storage
                localStorage.setItem('cartData', JSON.stringify(allData));
                sessionStorage.setItem('cartData', JSON.stringify(allData));

                let totalQuantity = calculateTotalQuantity(allData);
                document.getElementById("cart-count").textContent = totalQuantity;
            });
        });

        // Set initial cart count
        let totalQuantity = calculateTotalQuantity(allData);
        document.getElementById("cart-count").textContent = totalQuantity;
    });

    // Retrieve cart data from session storage when the page loads
    let sessionData = JSON.parse(sessionStorage.getItem('cartData'));
    if (sessionData) {
        allData = sessionData;
        let totalQuantity = calculateTotalQuantity(allData);
        document.getElementById("cart-count").textContent = totalQuantity;
    }
});
