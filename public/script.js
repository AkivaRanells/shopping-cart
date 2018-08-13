var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $('.cart-list').empty();
    $('.total').text('0');
    let cartHandlebar = {
      cart: cart
    }
    let source = $('#cart-template').html();
    let template = Handlebars.compile(source);
    let newHTML = template(cartHandlebar);
    $(".cart-list").append(newHTML);
    let total = 0;
    for(let i = 0; i < cart.length; i ++){
      total+=cart[i].price;
    }
    $('.total').text(total);
  }


  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    cart.push(item);
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart=[];
    updateCart();
  }
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
    $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  itemName = $(this).closest('.card').data().name;
  itemPrice = $(this).closest('.card').data().price;
  item = {
    name: itemName,
    price: itemPrice
  };
  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});