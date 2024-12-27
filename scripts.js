// Search Functionality
function searchFunction() {
    const query = document.getElementById('search').value;
    alert("Searching for: " + query);
    // You can implement a real search feature here by making API calls or filtering the restaurant list
}

// Chatbot Integration (Simple Example)
function openChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = 'block';
}

function closeChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = 'none';
}
function sendMessage() {
    const message = document.getElementById('chat-input').value;
    const chatContent = document.querySelector('.chat-content');
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat-message');
    newMessage.textContent = message;
    chatContent.appendChild(newMessage);
    document.getElementById('chat-input').value = '';
}
document.getElementById("commentForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value;
            const comment = document.getElementById("comment").value;

            if (name && comment) {
                alert(`Thank you for your comment, ${name}!\n\nYour comment: ${comment}`);
                document.getElementById("commentForm").reset();
            }
        });
document.getElementById("reviewForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const review = document.getElementById("review").value;
            const rating = document.querySelector('input[name="rating"]:checked');

            if (name && review && rating) {
                alert(`Thank you for your review, ${name}!\n\nYour Rating: ${rating.value} stars\nYour Review: ${review}`);
                document.getElementById("reviewForm").reset();
            } else {
                alert("Please fill in all fields.");
            }
        });
     
// Search functionality
document.getElementById('search-bar').addEventListener('input', function () {
    const query = this.value.toLowerCase(); // Get the search query
    const restaurants = document.querySelectorAll('.restaurant-item'); // Get all restaurant items

    // Loop through each restaurant and check if it matches the query
    restaurants.forEach(restaurant => {
        const name = restaurant.dataset.name.toLowerCase();
        const location = restaurant.dataset.location.toLowerCase();
        const cuisine = restaurant.dataset.cuisine.toLowerCase();

        // Check if the query matches name, location, or cuisine
        if (name.includes(query) || location.includes(query) || cuisine.includes(query)) {
            restaurant.classList.remove('hidden'); // Show the restaurant
        } else {
            restaurant.classList.add('hidden'); // Hide the restaurant
        }
    });
});
const cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const paymentModal = document.getElementById('payment-modal');
const paymentTotal = document.getElementById('payment-total');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const menuItem = this.parentElement;
        const name = menuItem.dataset.name;
        const price = parseFloat(menuItem.dataset.price);

        cart.push({ name, price });
        updateCart();
    });
});

// Update cart display and total price
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Add remove functionality
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Show payment modal
document.getElementById('checkout').addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    paymentTotal.textContent = totalPriceElement.textContent;
    paymentModal.classList.remove('hidden');
});

// Close payment modal
document.getElementById('close-modal').addEventListener('click', function () {
    paymentModal.classList.add('hidden');
});

// Confirm payment
document.getElementById('confirm-payment').addEventListener('click', function () {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all payment details!');
        return;
    }

    alert('Payment Successful!');
    cart.length = 0; // Clear the cart
    updateCart();
    paymentModal.classList.add('hidden');
});
