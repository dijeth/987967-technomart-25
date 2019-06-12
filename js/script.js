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
  var section = document.querySelector(section);
  if (!section) return;

  var dialog = section.querySelector(dialog);

  section.addEventListener('click', function(e) {
    var rect = dialog.getBoundingClientRect();
    if (!(e.pageX > rect.left && e.pageX < rect.right && e.pageY > rect.top + pageYOffset && e.pageY < rect.bottom + pageYOffset)) this.classList.remove('modal--show');
  });
};

for (var is = document.getElementsByClassName('role-close'), maxi = is.length, i = 0; i < maxi; i++) {
  is[i].addEventListener('click', closer);
};

show_modal('.contacts .main-button', 'modal--write-us');
show_modal('.contacts__map a', 'modal--map');

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

// Код ниже обрабатывает клик по кнопкам "Купить" и "В закладки",
// предотвращая на сенсорном экране ситуацию ложного срабатывания кнопок, когда клик по картинке
// в карточке товара передается кнопке, которая в момент клика была скрыта.

if ('ontouchstart' in document.documentElement) {
  function setPEStyleToBtn() {
    for (var is = document.querySelectorAll('.tool__button'), maxi = is.length, i = 0; i < maxi; i++) {
      is[i].style.pointerEvents = 'none';
    }
  };

  for (var is = document.querySelectorAll('.tool'), maxi = is.length, i = 0; i < maxi; i++) {
    is[i].querySelectorAll('.tool__button').forEach(function(b) {
      b.style.pointerEvents = 'none';
      b.addEventListener('click', function (e) {
        e.preventDefault();

        this.style.pointerEvents = 'none';

        var cart = (this.classList.contains('tool__button--buy') ? document.querySelector('.button-cart') : document.querySelector('.button-bookmarks'));
        cart.classList.add('button-cart--full');
        cart.innerText = cart.innerText.replace(/(\d+)/, function(a) { return Number(a) + 1 });
        if (this.classList.contains('tool__button--buy')) document.getElementsByClassName('modal--cart-plus')[0].classList.add('modal--show');
      });
    });

    is[i].addEventListener('click', function(e) {
      if (e.target.classList.contains('tool__button')) return;
      setPEStyleToBtn();

      this.querySelectorAll('.tool__button').forEach(function(b) {
        b.style.pointerEvents = 'auto';
      });
    });
  }
} else {
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
}
