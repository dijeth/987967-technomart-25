function closer() {
  var elem = this;
  while (!elem.parentElement.classList.contains('modal--show')) elem = elem.parentElement;
  elem.parentElement.classList.remove('modal--show');
};

for (var is = document.getElementsByClassName('role-close'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', closer);
};

var b = document.querySelector('.contacts .main-button');
if (b) {
  b.addEventListener('click', function() {
    document.getElementsByClassName('modal--write-us')[0].classList.add('modal--show');
  });
  b.removeAttribute('href');
}

var b = document.querySelector('.contacts__map a');
if (b) {
  b.addEventListener('click', function() {
    document.getElementsByClassName('modal--map')[0].classList.add('modal--show');
  });
  b.removeAttribute('href');
};

for (var is = document.getElementsByClassName('tool__button--buy'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function() {
    var cart = document.getElementsByClassName('button-cart')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
    document.getElementsByClassName('modal--cart-plus')[0].classList.add('modal--show');
  });
  is[i].removeAttribute('href');
};

for (var is = document.getElementsByClassName('tool__button--bookmark'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function() {
    var cart = document.getElementsByClassName('button-bookmarks')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
  });
  is[i].removeAttribute('href');
};
