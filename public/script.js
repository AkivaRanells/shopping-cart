var STORAGE_ID = 'cart';
var ShoppingCart = function () {
  // an array with all of our cart items

  let source = $('#cart-template').html();
  let template = Handlebars.compile(source);
  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $('.cart-list').empty();
    $('.total').text('0');
    let cartHandlebar = {
      cart: cart
    }
    let newHTML = template(cartHandlebar);
    $(".cart-list").append(newHTML);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
    $('.total').text(total);
    console.log(cart);
  }

  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart))
  }
  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID)) || [];
  }

  var cart = getFromLocalStorage(); 
  var addItem = function (clickedItem) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    itemName = $(clickedItem).closest('.card').data().name;
    itemPrice = $(clickedItem).closest('.card').data().price;
    item = {
      name: itemName,
      price: itemPrice
    };
    cart.push(item);
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart = [];
    updateCart();
  }

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    saveToLocalStorage: saveToLocalStorage,
    getFromLocalStorage: getFromLocalStorage,
    cart: cart
  }
};

var app = ShoppingCart();
// app.cart = app.getFromLocalStorage();
console.log(app.cart)
// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  app.addItem(this);
  app.saveToLocalStorage();
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});