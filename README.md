# toaster
Hi, there! 👋 This's a dead simple ~~library~~ script toast notifications. Based on Javascript.

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
| warning  | ```toast.warning()```  |
| success  | ```toast.success()```  |
| error  | ```toast.error()```  |

### Options

```js
new toaster({ selector: '.toaster', timeout: 10000 });


```

## Version

``` 0.0.2 ```
