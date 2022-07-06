const COOKIE_NAME = 'cookieconsent_status';

class CookieBanner {
  constructor() {
    this.$banner = document.querySelector('.cookie-banner');
    this.$button = document.querySelector('.cookie-banner_accept');

    if (this.$banner) {
      this._init();
    }
  }

  _init() {
    this._attachEvents();

    if (!this._isCookieApproved()) {
      this._show();
    }
  }

  _isCookieApproved() {
    const cookie = this._getCookie(COOKIE_NAME);
    return cookie === 'approved';
  }

  _setCookie(cookieName, cookieValue, cookieExpDays) {
    let date = new Date();
    date.setTime(date.getTime() + (cookieExpDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
  }

  _getCookie(cookieName) {
    const name = cookieName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;

    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return res;
  }

  _show() {
    this.$banner.classList.add('show');
  }

  _hide() {
    this.$banner.classList.remove('show');
  }

  _handleClick() {
    this._setCookie(COOKIE_NAME, 'approved', 30);
    this._hide();
  }

  _attachEvents() {
    this.$button.addEventListener('click', this._handleClick.bind(this));
  }
}

new CookieBanner();