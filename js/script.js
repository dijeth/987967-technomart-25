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

function click_modal(section, dialog) {
  var section = document.querySelector(section),
    dialog = section.querySelector(dialog);

  section.addEventListener('click', function(e) {
    var rect = dialog.getBoundingClientRect();
    if ((e.pageX < rect.left || e.pageX > rect.right) && (e.pageY < rect.top || e.pageY > rect.bottom)) this.classList.remove('modal--show');
  });
};

for (var is = document.getElementsByClassName('role-close'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', closer);
};

show_modal('.contacts .main-button', 'modal--write-us');
show_modal('.contacts__map a', 'modal--map');

for (var is = document.getElementsByClassName('tool__button--buy'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function(e) {

    e.preventDefault();
    if (getComputedStyle(this.parentElement.querySelector('.tool__image')).opacity != 0) return;

    var cart = document.getElementsByClassName('button-cart')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
    document.getElementsByClassName('modal--cart-plus')[0].classList.add('modal--show');
  });
};

for (var is = document.getElementsByClassName('tool__button--bookmark'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', function(e) {
    e.preventDefault();
    if (getComputedStyle(this.parentElement.querySelector('.tool__image')).opacity != 0) return;

    var cart = document.getElementsByClassName('button-bookmarks')[0];
    cart.classList.add('button-cart--full');
    cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
  });
};

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) {
    var modal = document.querySelector('.modal--show');
    if (modal) {
      e.preventDefault();
      modal.classList.remove('modal--show');
    };
  };
});

click_modal('.modal--cart-plus', '.dialog');
click_modal('.modal--map', '.map-popup');
click_modal('.modal--write-us', '.dialog');
