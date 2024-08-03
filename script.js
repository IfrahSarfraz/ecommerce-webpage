// Get all product cards
const productCards = document.querySelectorAll('.card');

// Loop through each product card
productCards.forEach((productCard) => {
  // Get the image selection elements for this product card
  const imgs = productCard.querySelectorAll('.img-select a');
  const imgShowcase = productCard.querySelector('.img-showcase');
  let imgId = 1;

  // Add event listeners to the image selection elements
  imgs.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage(imgShowcase, imgId);
    });
  });

  // Define a separate slideImage function for each product card
  function slideImage(imgShowcase, imgId) {
    const mainImg = imgShowcase.querySelector('img');
    let imgSrc;

    // Update the image source based on the imgId and product card
    switch (imgId) {
      case '1':
      case '2':
      case '3':
      case '4':
        imgSrc = `shoes_images/shoe_${imgId}.jpg`; 
        break; 
        case '5': 
        case '6': 
        case '7': 
        case '8': 
        imgSrc = `T-shirts/t${imgId - 4}.png`; 
        break; 
        case '9': 
        case '10': 
        case '11': 
        case '12': 
        imgSrc = `Chairs/${imgId - 8}.jpeg`;
        
        break;
      default:
        imgSrc = '';
    }

    mainImg.src = imgSrc;
  }
});

// Get the cart sidebar and cart list elements
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartList = document.querySelector('#cart-list');
let cartItemCount = 0;

cartBtn.addEventListener('click', () => {
  cartSidebar.style.display = cartSidebar.style.display === 'block' ? 'none' : 'block';
});
// Define a function to add an item to the cart
function addToCart(button) {
  // Get the product card and its details
  const productCard = button.closest('.card');
  const productImg = productCard.querySelector('.img-showcase img');
  const productTitle = productCard.querySelector('.product-title').textContent;
  const productColor = productCard.querySelector('#color').value;
  const productSize = productCard.querySelector('#size').value;
  const productPrice = productCard.querySelector('.price span').textContent;

  // Create a new cart item element
  const cartItem = document.createElement('li');
  cartItem.className = 'cart-item';

  // Add the product image to the cart item
  const cartItemImage = document.createElement('img');
  cartItemImage.src = productImg.src;
  cartItemImage.alt = productTitle;
  cartItem.appendChild(cartItemImage);

  // Add the product details to the cart item
  const cartItemText = document.createElement('div');
  cartItemText.className = 'cart-item-text';
  cartItemText.innerHTML = `
    <span>Color: ${productColor}</span>
    <span>Size: ${productSize}</span>
    <span>Price: ${productPrice}</span>
  `;
  cartItem.appendChild(cartItemText);

  // Add the cart item to the cart list
  cartList.appendChild(cartItem);
updateSubtotal();
cartItem.addEventListener('click', removeCartItem);
  cartList.appendChild(cartItem);
  updateSubtotal();
  // Show the cart sidebar
  cartSidebar.style.display = 'block';
  cartItemCount++;
  document.querySelector('.cart-counter').textContent = cartItemCount;
}
// Define a function to remove a cart item
function removeCartItem(event) {
  const cartItem = event.target.closest('.cart-item');
  cartItem.remove();
  updateSubtotal(); cartItemCount--;
  document.querySelector('.cart-counter').textContent = cartItemCount;
}
function updateSubtotal() {
  const cartItems = cartList.children;
  let itemCount = 0;
  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceText = cartItem.querySelector('.cart-item-text span:nth-child(3)').textContent;
    const price = parseFloat(priceText.match(/\d+(\.\d+)?/)[0]); // Extract numeric value using regex
    totalPrice += price;
    itemCount++;
  }
  const subtotalElement = document.createElement('div');
  subtotalElement.className = 'subtotal';
  subtotalElement.innerHTML = `Subtotal (${itemCount} items): $${totalPrice.toFixed(2)}`;
  

  // Clear the previous subtotal element
  const subtotalContainer = document.querySelector('.subtotal-container');
  subtotalContainer.innerHTML = '';

  // Add the new subtotal element
  subtotalContainer.appendChild(subtotalElement);
}
cartSidebar.style.display = 'none';
