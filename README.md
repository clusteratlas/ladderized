# Ladderized

> The featured-packed native loader of JS, CSS, and any type of files for mobile & desktop browsers.

- Loads JS files.
- Loads CSS files.
- Loads / preloads binary files.
- With optional callbacks.
- Series / One-by-one loading.

---

## Installation

**From NPM**

```
$ npm install ladderized@latest --save

<!-- From node_modules directory -->
<script src="./node_modules/ladderized/dist/ladderized.min.js"></script>
```

**From CDN**

```
<!-- From unpkg.com CDN, latest version by default -->
<script src="https://unpkg.com/ladderized/dist/ladderized.min.js"></script>
```

## Usage

- You can load resources from local directory, or from CDN's
- Supports series (one-by-one) loading of files 
- Supports parallel (regardless of order) loading of files
- Cross Origin is automatically detected on resource loading
- Supports callback on loading success, through "onLoad" property
- Supports callback on loading error, through "onError" property
- The **"/dist"** folder contains the compiled & minified js files
- The **"/demo"** folder contains example usage

**Running the Demo**

```
// At CMD or Terminal:

git clone https://github.com/clusteratlas/ladderized
cd ladderized
npm install
cd demo
node index.js

// Demo shall now viewable at http://localhost/ (port 80, by default)

```

## Other Notes

**HTTP/2 For Efficiency**

- Serve from servers with HTTP/2 support for major advantage
- Info here: https://http2.github.io/faq/
- Test tool here: https://tools.keycdn.com/http2-test
- CDN's like unpkg.com & cdnjs.com uses this.

**Exposed Window Objects / Components**

- **"window.Ladderized"**
  - Our main module, which provides chainable progressive loading w/ optional callbacks.
- **"window.onceDocumentIsReady"**
  - It works similarly to jQuery's $(document).ready(), but this is a small single standalone function that does not require jQuery in any way.
  - https://github.com/DanAtkinson/docReady
- **"window.Loader"**
  - englercj's Resource Loader
  - https://github.com/englercj/resource-loader
  - http://englercj.github.io/resource-loader/index.html
- **"window.Nanobar"**
  - Extra-lightweight progress bars
  - http://nanobar.jacoborus.codes/
  = https://github.com/jacoborus/nanobar

## Testing

- N/A

## License

MIT © [clusteratlas](https://github.com/clusteratlas)