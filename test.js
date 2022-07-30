import './assets/page.css';
import './assets/toaster.css';

const toaster = function (config) {
  this.config = config;

  this.options = {
    selector: '.toaster',
    toasterContainerSelector: '.toaster-container',
    timeout: 3_400,
    position: ['bottom', 'right'],
    priority: '',
    title: 1,
    icon: 0,
    unsafe: 1,
  };

  this.properties = {
    default: [],
    info: [],
    success: [],
    warning: [],
    error: [],
  };

  this.extende = {
    onceFlag: 0,
  };

  this.config = Object.assign(
    { dialogType: this.properties },
    this.options,
    this.config
  );

  for (let [priority] of Object.entries(this.config.dialogType)) {
    this[priority] = function (text, parameters = {}) {
      this.config.priority = priority;

      this.createToast(text);

      if (parameters.once) {
        this.extende.onceFlag = 1;
      }
    };
  }

  this.createToast = function (text) {
    this.createToaster();

    if (this.extende.onceFlag) {
      return;
    }

    this.createElement(
      [
        {
          type: 'div',
          characters: {
            className: this.concat().classList([
              this.config.selector,
              'active',
              `toaster-${this.config.priority}`,
            ]),
            role: 'alert',
          },
          children: [
            this.set().icon(),
            {
              type: 'div',
              characters: {
                className: 'toaster-basic-container',
              },
              children: [
                this.set().title(),
                {
                  type: 'div',
                  characters: {
                    className: this.concat().classList([`toaster-message`]),
                    innerText: this.escapeHTML(text),
                  },
                },
              ],
            },
          ],
        },
      ],
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

  this.set = function () {
    this.title = function () {
      if (!this.config.title) {
        return 0;
      }

      return {
        type: 'div',
        characters: {
          className: this.concat().classList([`toaster-title`]),
          innerText: this.escapeHTML(
            this.capitalizeFirstLetter(this.config.priority)
          ),
        },
      };
    };

    this.icon = function () {
      if (!this.config.icon) {
        return 0;
      }

      return {
        type: 'div',
        characters: {
          className: this.concat().classList([
            'toaster-icon',
            !this.config.title ? 'single' : 'group',
          ]),
          innerHTML: '🍞',
        },
      };
    };

    return this;
  };

  this.createToaster = function () {
    let toaster = this.selector('All')(this.config.toasterContainerSelector);

    if (toaster.length) {
      return;
    }

    this.createElement(
      [
        {
          type: 'div',
          characters: {
            className: this.concat().classList(
              [this.config.toasterContainerSelector].concat(
                this.config.position
              )
            ),
          },
        },
      ],
      'body'
    );
  };

  this.createElement = function (characters = [], appendToElement, execute) {
    let root;

    const DOMBuilder = {
      div: (e) => {
        return Object.assign(document.createElement(e.type), e.characters);
      },
    };

    function createDOMElement(e) {
      let element;

      if ((element = DOMBuilder[e.type]?.(e))) {
        if (e.id) element.id = e.id;
        e.children?.forEach((c) => {
          var createElement = createDOMElement(c);
          if (createElement) element.appendChild(createElement);
        });

        return element;
      }
    }

    characters.forEach((value) => {
      let element = createDOMElement(value);
      if (element) {
        root = element;
      }
    });

    this.selector()(appendToElement).prepend(root);

    typeof execute === 'function' ? execute(root, this) : !0;
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

      this.extende.onceFlag = 0;
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

  this.capitalizeFirstLetter = function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
};
