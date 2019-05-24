function Slider (slider_list, button_prev, button_next, dot_list, active_dot, disable_action) {
  this.init(slider_list, button_prev, button_next, dot_list, active_dot, disable_action);
  this.set_action();
};

Slider.prototype.init = function(slider_list, button_prev, button_next, dot_list, active_dot, disable_action) {
  function getHandler(n) {
    return function() {self.go(n)}
  };

  if (! active_dot) active_dot = dot_list + '--active';

  var slider_list = document.getElementsByClassName(slider_list)[0],
    slider = slider_list.parentElement,
    button_prev = document.getElementsByClassName(button_prev)[0],
    button_next = document.getElementsByClassName(button_next)[0],
    dot_list = document.getElementsByClassName(dot_list)[0],
    item_rect = slider.getBoundingClientRect(),
    slider_rect = slider_list.getBoundingClientRect(),
    item_count = Math.round(slider_rect.height/item_rect.height),
    item_current = Math.round((item_rect.top-slider_rect.top)/item_rect.height),
    self = this;

  for (var i = 0; i < item_count; i++) {
    if (i >= dot_list.children.length) {
      var elem = dot_list.lastElementChild.cloneNode(true);
      dot_list.appendChild(elem);
    };

    dot_list.children[i].addEventListener('click', getHandler(i));
  };

  button_prev.addEventListener('click', function() {self.go ('prev')});
  button_next.addEventListener('click', function() {self.go ('next')});

  dot_list.children[0].classList.add(active_dot);

  this.item_current = item_current;
  this.button_prev = button_prev;
  this.button_next = button_next;
  this.item_count = item_count;
  this.height_prc = 100/item_count;
  this.dot_list = dot_list;
  this.slider = slider_list;
  this.active_dot_class = active_dot;
  this.disable_action = disable_action;
};

Slider.prototype.go = function(slide) { // slide = 'next', 'prev' или число начиная с 0
  var old = this.item_current;

  switch (slide) {
    case 'next': this.item_current++; break;
    case 'prev': this.item_current--; break;
    default: {
      slide = Number(slide);
      if (isNaN(slide)) return;
      if (slide >= this.item_count || slide < 0) return;
      this.item_current = slide;
    }
  }

  if (this.item_current == 0) this.button_prev.setAttribute('disabled', true)
  else this.button_prev.removeAttribute('disabled');

  if (this.item_current == this.item_count-1) this.button_next.setAttribute('disabled', true)
  else this.button_next.removeAttribute('disabled');

  this.slider.style.transform = 'translateY(-'+(this.item_current*this.height_prc)+'%)';

  this.dot_list.children[old].classList.remove(this.active_dot_class);
  this.dot_list.children[this.item_current].classList.add(this.active_dot_class);

  this.set_action();
};

Slider.prototype.set_action = function() { // Дизаблим активные кнопки на скрытых слайдах, чтоб они не воспринимали фокус по табу
  for (var is = this.slider.getElementsByClassName(this.disable_action), maxi = is.length, i = 0; i < maxi; i++) {
    is[i].setAttribute('tabindex', -1);
  };
  for (var is = this.slider.children[this.item_current].getElementsByClassName(this.disable_action), maxi = is.length, i = 0; i < maxi; i++) {
    is[i].removeAttribute('tabindex');
  };
};

var slider = new Slider(
    'slider',
    'slider-button__prev',
    'slider-button__next',
    'control-list',
    'control-list__item--active',
    'slider__action'
    );
