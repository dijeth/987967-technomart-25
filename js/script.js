function closer() {
  var elem = this;
  while (!elem.parentElement.classList.contains('modal--show')) elem = elem.parentElement;
  elem.parentElement.classList.remove('modal--show');
};

function show_modal(selector_a, class_modal) {
  for (var is = document.querySelectorAll(selector_a), maxi = is.length, i = 0; i < maxi; i++) {
    is[i].addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementsByClassName(class_modal)[0].classList.add('modal--show');
    });
  };
};

for (var is = document.getElementsByClassName('role-close'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', closer);
};

show_modal('.contacts .main-button', 'modal--write-us');
show_modal('.contacts__map a', 'modal--map');

for (var is = document.getElementsByClassName('tool__button--buy'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function(e) {
    e.preventDefault();

    var cart = document.getElementsByClassName('button-cart')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
    document.getElementsByClassName('modal--cart-plus')[0].classList.add('modal--show');
  });
};

for (var is = document.getElementsByClassName('tool__button--bookmark'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function(e) {
    e.preventDefault();

    var cart = document.getElementsByClassName('button-bookmarks')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
  });
};
