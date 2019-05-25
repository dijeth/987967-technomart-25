function Bar(param) {
  this.init(param);
}

Bar.prototype.init = function(param) {
  var min = document.querySelector(param.min),
    bar = min.parentElement,
    bar_rect = bar.getBoundingClientRect(),
    max = bar.querySelector(param.max),
    text_min = document.querySelector(param.text_min),
    text_max = document.querySelector(param.text_max),
    color_bar = bar.querySelector(param.color_bar),
    min_cost = Number(text_min.value),
    max_cost = Number(text_max.value),
    fr = (max_cost - min_cost) / bar_rect.width,
    self = this;

  min.ondragstart = function() { return false; };
  max.ondragstart = function() { return false; };

  Object.defineProperty(this, 'min_value', {
    get: function() {
      return Number(text_min.value);
    },

    set: function(cost) {
      var bar_rect = bar.getBoundingClientRect();

      if (cost < min_cost) cost = min_cost;
      if (cost > this.max_value) cost = this.max_value;

      this.min_coord = (cost-min_cost) / fr + bar_rect.left;
    }
  });

  Object.defineProperty(this, 'max_value', {
    get: function() {
      return Number(text_max.value);
    },

    set: function(cost) {
      var bar_rect = bar.getBoundingClientRect();

      if (cost < this.min_value) cost = this.min_value;
      if (cost > max_cost) cost = max_cost;

      this.max_coord = (cost-min_cost) / fr + bar_rect.left;
    }
  });

  Object.defineProperty(this, 'min_coord', {
    get: function() {
      var r = min.getBoundingClientRect();
      return r.left + r.width / 2;
    },

    set: function(x) {
      var r = min.getBoundingClientRect(),
        bar_rect = bar.getBoundingClientRect();

      if (x > this.max_coord) x = this.max_coord;
      x = x - bar_rect.left - r.width / 2;
      if (x < -r.width / 2) x = -r.width / 2;
      min.style.left = x + 'px';
      color_bar.style.left = x + 'px';
      text_min.value = Math.round((x + r.width / 2) * fr)+min_cost;
    }
  });

  Object.defineProperty(this, 'max_coord', {
    get: function() {
      var r = max.getBoundingClientRect();
      return r.left + r.width / 2;
    },

    set: function(x) {
      var r = max.getBoundingClientRect(),
        bar_rect = bar.getBoundingClientRect();

      if (x < this.min_coord) x = this.min_coord;
      x = bar_rect.right - x - r.width / 2;
      if (x < -r.width / 2) x = -r.width / 2;
      max.style.right = x + 'px';
      color_bar.style.right = x + 'px';
      text_max.value = Math.round(max_cost - (x + r.width / 2) * fr);
    }
  });

  text_min.addEventListener('change', function() {
    self.min_value = Number(this.value);
  });

  text_max.addEventListener('change', function() {
    self.max_value = Number(this.value);
  });

  min.addEventListener('mousedown', function(e) {
    document.onmousemove = function(e) {
      self.min_coord = e.pageX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });

  max.addEventListener('mousedown', function(e) {
    document.onmousemove = function(e) {
      self.max_coord = e.pageX;
    };

    document.onmouseup = function(e) {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });

  this.min_value = param.min_start;
  this.max_value = param.max_start;
};

var bar = new Bar({
  min: '.filter__range .bar__control--min',
  max: '.filter__range .bar__control--max',
  text_min: '.filter__cost--min',
  text_max: '.filter__cost--max',
  color_bar: '.filter__range .bar__color',
  min_start: 1,
  max_start: 30000
});
