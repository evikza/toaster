# toaster
Hi, there! 👋 This's a dead simple ~~library~~ script toast notifications. Based on Javascript.

[Demo](https://evikza.github.io/toaster/example/) 🚀

## Install
#### It's easy:

```html
<link rel="stylesheet" href="toaster.min.css" />
```
```js
<script src="toaster.min.js"></script>
```

#### … and initialize the script:

```js
const toast = new toaster({ selector: '.toaster' });

toast.error('Please wait a few minutes before you try again.');
```

| Method       | Сall method              | 
| -------------|:------------------:|
| default  | ``` toast.default()``` |
| info     | ``` toast.info()```    |
| success  | ```toast.success()```  |
| warning  | ```toast.warning()```  |
| error  | ```toast.error()```  |

### Options

```js
new toaster({
  selector: '.toaster',
  timeout: 5000,
  position: ['bottom', 'right'],
  unsafe: 1,
});
```

## Version

``` 0.0.2 ```
