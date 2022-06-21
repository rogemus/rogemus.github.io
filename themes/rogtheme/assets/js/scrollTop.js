const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

class ScrollTop {
  constructor() {
    this.button = document.querySelector('.scrollTop');

    if (this.button) {
      this._init();
    }
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  _init() {
    this._attachEvents();
    if (this._isScrolled()) {
      this.button.classList.add('show');
    }
  }

  _isScrolled() {
    const top = window.pageYOffset || document.documentElement.scrollTop;

    return top >= 1000;
  }

  _handleClick() {
    this.scrollTop();
  }

  _handleScroll() {
    if (this._isScrolled()) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  }

  _attachEvents() {
    this.button.addEventListener('click', this._handleClick.bind(this));
    document.addEventListener('scroll', debounce(this._handleScroll.bind(this), 50));
  }
}

new ScrollTop();