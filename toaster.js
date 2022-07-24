const toaster = function (config) {
  this.config = config;

  this.options = {
    selector: '.toaster',
    toasterContainerSelector: '.toaster-container',
    timeout: 4_400,
    position: ['bottom', 'right'],
    priority: '',
    once: 0,
    unsafe: 1,
  };

  this.properties = {
    default: [],
    info: [],
    success: [],
    warning: [],
    error: [],
  };

  this.config = Object.assign(
    { dialogType: this.properties },
    this.options,
    this.config
  );

  for (let [priority] of Object.entries(this.config.dialogType)) {
    this[priority] = function (text) {
      this.config.priority = priority;

      return this.createToast(text);
    };
  }

  this.createToast = function (text) {
    this.createToaster();

    this.createElement(
      {
        className: this.concat().classList([
          this.config.selector,
          'active',
          `toaster-${this.config.priority}`,
        ]),
        innerText: this.escapeHTML(text),
        role: 'alert',
      },
      this.config.toasterContainerSelector,
      function (toast, self) {
        if (!self.config.timeout) {
          return;
        }

        setTimeout(function () {
          toast.remove();

          if (!self.hasActiveToasts()) {
            self.clear().all();
          }
        }, self.config.timeout);
      }
    );
  };

  this.createToaster = function () {
    let toaster = this.selector('All')(this.config.toasterContainerSelector);

    if (toaster.length) {
      return;
    }

    this.createElement(
      {
        className: this.concat().classList(
          [this.config.toasterContainerSelector].concat(this.config.position)
        ),
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
    this.all = function () {
      let toasters = this.selector('All')(this.config.toasterContainerSelector);

      if (!toasters.length) {
        return;
      }

      for (let toaster of [...toasters]) {
        toaster.remove();
      }
    };

    return this;
  };

  this.hasActiveToasts = function () {
    return this.selector('All')(this.config.selector).length ? !0 : !1;
  };

  this.concat = function () {
    this.classList = function (classList) {
      return classList
        .map(function (iterator) {
          return iterator.replace(/[\.]/g, '');
        })
        .join(' ');
    };

    return this;
  };

  this.escapeHTML = function (unsafeText) {
    if (this.config.unsafe) {
      return unsafeText;
    }

    return unsafeText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  this.selector = function (suffix = '') {
    return document[`querySelector${suffix}`].bind(document);
  };
};
