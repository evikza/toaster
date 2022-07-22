const toaster = function (config) {
  this.config = config;

  this.options = {
    toasterContainerSelector: '.toaster-container',
    timeout: 3_400,
    position: [],
  };

  this.properties = {
    default: ['#f5f5f5', '#818182'],
    info: [],
    success: ['#d1e7dd', '#155724'],
    warning: ['#fff3cd', '#664d03'],
    error: ['#f8d7da', '#842029'],
  };

  this.config = Object.assign(
    { dialogType: this.properties },
    this.options,
    this.config
  );

  for (let [key] of Object.entries(this.config.dialogType)) {
    this[key] = function (text = '', toastType = key) {
      return this.createToaster(text, toastType);
    };
  }

  this.createToaster = function (text, toastType) {
    this.createToasterWrapper();

    let [backgroundColor, color] = this.config.dialogType[toastType];

    this.createElement(
      {
        className: this.concatClassList([
          this.config.selector,
          'active',
          `toaster-${toastType}`,
        ]),
        innerText: text,
        role: 'alert',
        'aria-live': 'assertive',
      },
      this.config.toasterContainerSelector,
      function (toast, self) {
        setTimeout(function () {
          toast.remove();

          if (!self.hasActiveToasts()) {
            self.clear();
          }
        }, self.config.timeout);
      }
    );
  };

  this.createToasterWrapper = function () {
    let toasterWrapper = this.selector('All')(
      this.config.toasterContainerSelector
    );

    if (toasterWrapper.length) {
      return;
    }

    this.createElement(
      {
        className: this.concatClassList([
          this.config.toasterContainerSelector,
          'bottom',
          'right',
        ]),
      },
      'body'
    );
  };

  this.createElement = function (properties = {}, appendToElement, execute) {
    const rootElement = document.createElement('div');

    this.selector()(appendToElement).prepend(
      Object.assign(rootElement, properties)
    );

    typeof execute === 'function' ? execute(rootElement, this) : !0;
  };

  this.clear = function () {
    let toasters = this.selector('All')(this.config.toasterContainerSelector);

    if (!toasters.length) {
      return;
    }

    for (let toaster of [...toasters]) {
      toaster.remove();
    }
  };

  this.hasActiveToasts = function () {
    return this.selector('All')(this.config.selector).length ? !0 : !1;
  };

  this.concatClassList = function (classList) {
    return classList.map((e) => e.replace(/[\.]/g, '')).join(' ');
  };

  this.selector = function (suffix = '') {
    return document[`querySelector${suffix}`].bind(document);
  };
};
