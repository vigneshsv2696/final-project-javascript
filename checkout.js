document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from local storage
    let cartData = JSON.parse(localStorage.getItem('cartData')) || {};

    // Reference to the elements on the checkout page
    let itemCountElement = document.getElementById('item-count');
    let totalAmountElement = document.getElementById('total-amount');
    let cardList = document.getElementById('card-list');

    // Initialize variables
    let itemCount = 0;
    let totalAmount = 0;

    // Populate checkout page with cart items
    for (let productId in cartData) {
        let product = cartData[productId];
        itemCount += product.inCart;
        totalAmount += product.inCart * product.price;

        let card = document.createElement('div');
        card.classList.add('checkout-card');
        card.innerHTML = `
            <div><img class="checkout-product-img" src="${product.photos}"></div>
            <div>
                <h4>${product.name}</h4>
                <p>x${product.inCart}</p>
                <p><span>Amount: Rs </span><span>${product.inCart * product.price}</span></p>
            </div>
        `;
        cardList.appendChild(card);
    }

    // Display total items and total amount
    itemCountElement.textContent = itemCount;
    totalAmountElement.textContent = totalAmount.toFixed(2); // Format as currency if needed

    // Handle "Place Order" button click
    let placeOrderButton = document.getElementById('btn-place-order');
    placeOrderButton.addEventListener('click', function() {
        // Implement order placement logic here
        // This could involve sending data to a server, clearing cart data, etc.
    });
});
