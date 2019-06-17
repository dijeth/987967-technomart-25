/**
  param = {
    slider_list, внутренний слайдер
    button_prev, кнопка обратно (необязатеный)
    button_next, кнопка туда (необязатеный)
    dot_list,    элемент с кнопками для выбора слайда (необязатеный)
                 Если их меньше, чем слайдов - добавятся в ините
    active_dot,  класс, который назначается активной кнопке
                 выбора слайда (необязатеный)
    disable_action  класс кнопок или ссылок внутри слайдов,
                    которые надо дизаблить, чтоб не происходил
                    их выбор по табу, когда слайд скрыт

    change_by_class
  }
*/

function Slider(param) {
  this.init(param);
};

Slider.prototype.init = function(param) {
  function getHandler(obj, n) {
    return function() { obj.go(n) }
  };

  function init_dots() {
    for (var i = 0; i < item_count; i++) {
      if (i >= dot_list.children.length) {
        var elem = dot_list.lastElementChild.cloneNode(true);
        dot_list.appendChild(elem);
      };

      dot_list.children[i].addEventListener('click', getHandler(self, i));
    };

    if (!active_dot) active_dot = param.dot_list + '--active';
    dot_list.children[0].classList.add(active_dot);
  };

  var slider_list = document.getElementsByClassName(param.slider_list)[0],
    slider = slider_list.parentElement,
    button_prev = param.button_prev && document.getElementsByClassName(param.button_prev)[0],
    button_next = param.button_next && document.getElementsByClassName(param.button_next)[0],
    dot_list = param.dot_list && document.getElementsByClassName(param.dot_list)[0],
    active_dot = param.active_dot,
    disable_action = param.disable_action,
    item_rect = slider.getBoundingClientRect(),
    slider_rect = slider_list.getBoundingClientRect(),
    item_count = slider_list.children.length,
    item_current = 0,
    self = this,
    tops = [],
    heights = [],
    h = slider_list.offsetTop;

  for (var i = 0; i < slider_list.children.length; i++) {
    tops.push(h - slider_list.children[i].offsetTop);
    heights.push(slider_list.children[i].offsetHeight);
  };

  if (dot_list) init_dots();

  if (button_prev) button_prev.addEventListener('click', (function(obj) { return function() { obj.go('prev') } })(self));
  if (button_next) button_next.addEventListener('click', (function(obj) { return function() { obj.go('next') } })(self));

  this.disable_action = disable_action;
  if (disable_action) {
    this.set_action(slider_list, false);
    this.set_action(slider_list.children[item_current], true);
  };

  this.item_current = item_current;
  this.button_prev = button_prev;
  this.button_next = button_next;
  this.item_count = item_count;
  // this.height_prc = 100 / item_count;
  this.dot_list = dot_list;
  this.slider = slider_list;
  this.active_dot_class = active_dot;
  this.tops = tops;
  this.heights = heights;
  this.change_by_class = param.change_by_class;

  this.go(0);
};

Slider.prototype.go = function(slide) { // slide = 'next', 'prev' или число начиная с 0
  var old = this.item_current;

  switch (slide) {
    case 'next':
      this.item_current++;
      break;
    case 'prev':
      this.item_current--;
      break;
    default:
      {
        slide = Number(slide);
        if (isNaN(slide)) return;
        if (slide >= this.item_count || slide < 0) return;
        this.item_current = slide;
      }
  };

  if (this.button_prev) {
    if (this.item_current == 0) this.button_prev.setAttribute('disabled', true)
    else this.button_prev.removeAttribute('disabled');
  };

  if (this.button_next) {
    if (this.item_current == this.item_count - 1) this.button_next.setAttribute('disabled', true)
    else this.button_next.removeAttribute('disabled');
  };

  if (this.change_by_class) {
    this.slider.children[old].classList.remove(this.change_by_class);
    this.slider.children[this.item_current].classList.add(this.change_by_class);
  } else {
    this.slider.style.transform = 'translateY(' + this.tops[this.item_current] + 'px)';
    this.slider.parentElement.style.height = this.heights[this.item_current] + 'px';
  }

  if (this.dot_list) {
    this.dot_list.children[old].classList.remove(this.active_dot_class);
    this.dot_list.children[this.item_current].classList.add(this.active_dot_class);
  };

  if (this.disable_action) {
    this.set_action(this.slider.children[old], false);
    this.set_action(this.slider.children[this.item_current], true);
  };
};

Slider.prototype.set_action = function(where, enable) { // Дизаблим активные кнопки на скрытых слайдах, чтоб они не воспринимали фокус по табу
  for (var is = where.getElementsByClassName(this.disable_action), maxi = is.length, i = 0; i < maxi; i++) {
    if (enable) is[i].removeAttribute('tabindex')
    else is[i].setAttribute('tabindex', -1);
  };
};

var promo_slider = new Slider({
  slider_list: 'slider',
  button_prev: 'slider-button__prev',
  button_next: 'slider-button__next',
  dot_list: 'control-list',
  active_dot: 'control-list__item--active',
  disable_action: 'slider__action'
});

var service_slider = new Slider({
  slider_list: 'slide-list',
  dot_list: 'service-list',
  active_dot: 'service-list__item--active',
  disable_action: 'button-send',
  change_by_class: 'slide-list__item--active'
});
