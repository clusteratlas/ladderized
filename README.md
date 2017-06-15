# Ladderized

> The featured-packed native loader of JS, CSS, and any type of files for mobile & desktop browsers.

- You can load resources from local directory, or from CDN's
- Supports series (one-by-one) loading of files 
- Supports parallel (regardless of order) loading of files
- Cross Origin is automatically detected on resource loading
- Supports callback on loading success, through "onLoad" property
- Supports callback on loading error, through "onError" property

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

**Basics, Series Loading**

```
<script src="https://unpkg.com/ladderized/dist/ladderized.min.js"></script>
<script>
	Ladderized
		.js({
			link: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
			onLoad: function () {
				console.log('jquery loaded!');
			}
		})
		.css({
			link: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'
		})
		.js({
			link: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'
		})
		.resource({
			name: 'descartes',
			link: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
			onLoad: function (resource, url) {
				var img = document.createElement('img');
				document.body.appendChild(img);
				img.src = url;
			}
		})
		.load(function(){
			console.log('all files loaded!');
		});
</script>
```

**Parallel Loading, Error Handling & Nanobar**

```
<script src="https://unpkg.com/ladderized/dist/ladderized.min.js"></script>
<script>
	Ladderized
		.showNanoBar()
		.js({
			link: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
			onLoad: function () {
				console.log('jquery loaded!');
			}
		})
		.js({
			link: './nonexistent.js',
			onError: function () {
				console.log('error loading js file!');
			}
		})
		.css({
			link: './nonexistent.css',
			onError: function () {
				console.log('error loading css!');
			}
		})
		.resource({
			name: 'nonexistentfile',
			link: 'https://uploadz.wikimedia.org/nonexistent.jpg',
			onLoad: function () {
				console.log('successfully loaded file!');
			},
			onError: function () {
				console.log('error loading file!');
			}
		})
		.resource({
			name: 'descartes1',
			link: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg?dawd2',
			onLoad: function () {
				console.log('successfully loaded descartes1!');
			},
			onError: function () {
				console.log('error loading descartes1!');
			}
		})
		.parallel({
			js: [
				'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/js/materialize.min.js'
			],
			css: [
				'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css'
			],
			resources: [
				{
					name: 'descartes2',
					link: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg'
				}
			]
		})
		.load(function(resources){
			var img = document.createElement('img');
			document.body.appendChild(img);
			img.src = resources.descartes1.objectURL;
			var img = document.createElement('img');
			document.body.appendChild(img);
			img.src = resources.descartes2.objectURL;
			console.log('resources:', resources);
			console.log('all files loaded!');
		});
</script>
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
  
**Other Methods**

```
// Use clearQueue method for a reset; can also be chained.
Ladderized
	.clearQueue()
	
// Use the standalone loaders for manual loading.
Ladderized.loaders.js(link[string], onLoad[function], onError[function])
Ladderized.loaders.css(link[string], onLoad[function], onError[function])
Ladderized.loaders.resource(name[string], link[string], onLoad[function], onError[function])
```

## Testing

- N/A

## License

MIT © [clusteratlas](https://github.com/clusteratlas)