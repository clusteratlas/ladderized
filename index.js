var ladderized = function () {
		
	var nanobar;
	var nanoPulses = 0;
	var nanoValue = 10;
	
	this.showNanoBar = function () {
		var options = {
			classname: 'ladderized-nanobar',
			id: 'ladderized-nanobar',
			target: document.body
		};
		nanobar = new Nanobar(options);
		nanoValue = 10;
		nanobar.go(nanoValue);
		return this;
	}
	
	var queue = [];
	this.queue = queue;
	
	this.clearQueue = function () {
		queue = [];
		nanoPulses = 0;
		nanoValue = 10;
		return this;
	}
	
	this.parallel = function (entries) {
		if (typeof nanobar !== 'undefined') {
			nanoPulses++;
		}
		// the typecheck IS NOW SET HERE.
		// this is now the new formet:
		// entry: {name, link, callback} for JS, CSS & RESOURCE
		// entries: {js, css, resource, callback} for PARALLEL
		if (typeof entries !== 'object') {
			console.log('error', 'expecting OBJECT on PARALLEL');
		}
		queue.push({
			type: 'parallel',
			entries: entries,
		});
		return this;
	}
	
	this.js = function (entry) {
		if (typeof nanobar !== 'undefined') {
			nanoPulses++;
		}
		if (typeof entry !== 'object') {
			console.log('error', 'expecting OBJECT on JS');
		}
		if (Object.prototype.hasOwnProperty.call(entry, 'link') === false) {
			console.log('error', 'expecting LINK PROPERTY on JS');
		}
		queue.push({
			type: 'js',
			entry: entry
		});
		return this;		
	}
	
	this.css = function (entry) {
		if (typeof nanobar !== 'undefined') {
			nanoPulses++;
		}
		if (typeof entry !== 'object') {
			console.log('error', 'expecting OBJECT on CSS');
		}
		if (Object.prototype.hasOwnProperty.call(entry, 'link') === false) {
			console.log('error', 'expecting LINK PROPERTY on CSS');
		}
		queue.push({
			type: 'css',
			entry: entry
		});
		return this;		
	}
	
	this.resource = function (entry) {
		if (typeof nanobar !== 'undefined') {
			nanoPulses++;
		}
		if (typeof entry !== 'object') {
			console.log('error', 'expecting OBJECT on RESOURCE');
		}
		if (Object.prototype.hasOwnProperty.call(entry, 'name') === false) {
			console.log('error', 'expecting NAME PROPERTY on RESOURCE');
		}
		if (Object.prototype.hasOwnProperty.call(entry, 'link') === false) {
			console.log('error', 'expecting LINK PROPERTY on RESOURCE');
		}
		queue.push({
			type: 'resource',
			entry: entry
		});
		return this;		
	}
	
	var resources = {};
	this.resources = resources;
	
	var loaders = {
		js: function (link, onLoad, onError) {
			var scriptElement = document.createElement('script');
			document.head.appendChild(scriptElement);
			scriptElement.onload = function () {
				if (typeof onLoad === 'function') {
					onLoad();
				}
			};
			scriptElement.onerror = function () {
				if (typeof onError === 'function') {
					onError();
				}
			};
			scriptElement.type = 'text/javascript';
			if (typeof link === 'string') {
				scriptElement.src = link;
			}
		},
		css: function (link, onLoad, onError) {
			var linkElement = document.createElement('link');
			document.head.appendChild(linkElement);
			linkElement.onload = function () {
				if (typeof onLoad === 'function') {
					onLoad();
				}
			};
			linkElement.onerror = function () {
				if (typeof onError === 'function') {
					onError();
				}
			};
			linkElement.rel = 'stylesheet';
			linkElement.type = 'text/css';
			if (typeof link === 'string') {
				linkElement.href = link;
			}
		},
		resource: function (name, link, onLoad, onError) {			
			if (typeof name === 'string' && typeof link === 'string') {
				var loader = new Loader();
				// console.log('name', name);
				// console.log('link', link);
				// console.log('onLoad', onLoad);
				// console.log('onError', onError);
				
				loader
					.add(name,link,{loadType: 1})
					.load();
				// console.log('loader', loader);
				loader.onLoad.add(function(loader, resource){
					// console.log(arguments);
					// console.log(resource.data);
					resources[resource.name] = resource;
					if (typeof onLoad === 'function') {
						var urlCreator = window.URL || window.webkitURL;
						var objectURL = urlCreator.createObjectURL(resource.data);
						resource.objectURL = objectURL;
						onLoad(resource, objectURL);
					}
				})
				loader.onError.add(function(error, loader, resource){
					console.log('error:', error.message);
					if (typeof onError === 'function') {
						onError();
					}
				});
				
				/*
				var newResource = new Loader.Resource(
					name,
					link,
					{loadType: 1}
				);
				newResource.load();
				newResource.onComplete.add(function (resource) {
					resources[resource.name] = resource;
					if (typeof onLoad === 'function') {
						var urlCreator = window.URL || window.webkitURL;
						var objectURL = urlCreator.createObjectURL(resource.data);
						resource.objectURL = objectURL;
						onLoad(resource, objectURL);
					}
				});
				*/
				/*
				console.log(newResource);
				newResource.onError.add(function (resource) {
					if (typeof onError === 'function') {
						onError();
					}
				});
				*/
			}
		}
	}
	
	this.loaders = loaders;
		
	this.load = function (callback) {
		onceDocumentIsReady(function() {
			function recurseQueue() {
				if (typeof nanobar !== 'undefined') {
					nanoValue += (75/nanoPulses);
					nanobar.go(nanoValue);
				}
				if (queue.length >= 1) {
					shifted = queue.shift();
					switch (shifted.type) {
						case 'js':
							var entry = shifted.entry;
							loaders.js(
								entry.link,
								function () {
									if (Object.prototype.hasOwnProperty.call(entry, 'onLoad') === true) {
										entry.onLoad();
									}
									recurseQueue();
								},
								function () {
									if (Object.prototype.hasOwnProperty.call(entry, 'onError') === true) {
										entry.onError();
									}
									recurseQueue();
								}
							);
							break;
						case 'css':
							var entry = shifted.entry;
							loaders.css(
								entry.link,
								function () {
									if (Object.prototype.hasOwnProperty.call(entry, 'onLoad') === true) {
										entry.onLoad();
									}
									recurseQueue();
								},
								function () {
									if (Object.prototype.hasOwnProperty.call(entry, 'onError') === true) {
										entry.onError();
									}
									recurseQueue();
								}
							);
							break;
						case 'resource':
							var entry = shifted.entry;
							loaders.resource(
								entry.name,
								entry.link,
								function (resource, objectURL) {
									if (Object.prototype.hasOwnProperty.call(entry, 'onLoad') === true) {
										entry.onLoad(resource, objectURL);
									}
									recurseQueue();
								},
								function () {
									if (Object.prototype.hasOwnProperty.call(entry, 'onError') === true) {
										entry.onError();
									}
									recurseQueue();
								}
							);
							break;
						case 'parallel':
							var count = 0;
							var entries = shifted.entries;
							if (Object.prototype.hasOwnProperty.call(entries, 'js') === true) {
								count += entries.js.length;
							}
							if (Object.prototype.hasOwnProperty.call(entries, 'css') === true) {
								count += entries.css.length;
							}
							if (Object.prototype.hasOwnProperty.call(entries, 'resources') === true) {
								count += entries.resources.length;
							}
							// console.log('info', 'count', count);
							var loaded = 0;
							function checkIfEverythingLoaded () {
								// console.log('loaded', loaded);
								if (count === loaded) {
									// console.log('count is eq loaded');
									if (Object.prototype.hasOwnProperty.call(entries, 'onLoad') === true) {
										entries.onLoad(resources);
									}
									recurseQueue();
								}
							}
							if (Object.prototype.hasOwnProperty.call(entries, 'js') === true) {
								entries.js.forEach(function (currentValue, index, array) {
									loaders.js(
										currentValue,
										function () {
											loaded++;
											checkIfEverythingLoaded();
										},
										function () {
											if (Object.prototype.hasOwnProperty.call(entries, 'onError') === true) {
												entries.onError();
											}
										}
									);
								});
							}
							if (Object.prototype.hasOwnProperty.call(entries, 'css') === true) {
								entries.css.forEach(function (currentValue, index, array) {
									loaders.css(
										currentValue,
										function () {
											loaded++;
											checkIfEverythingLoaded();
										},
										function () {
											if (Object.prototype.hasOwnProperty.call(entries, 'onError') === true) {
												entries.onError();
											}
										}
									);
								});
							}
							if (Object.prototype.hasOwnProperty.call(entries, 'resources') === true) {
								entries.resources.forEach(function (currentValue, index, array) {
									// console.log(currentValue);
									loaders.resource(
										currentValue.name,
										currentValue.link,
										function (resource, objectURL) {
											loaded++;
											checkIfEverythingLoaded();
										},
										function () {
											if (Object.prototype.hasOwnProperty.call(entries, 'onError') === true) {
												entries.onError();
											}
										}
									);
								});
							}
							
							break;
						default:
							console.log('error', 'unknown TYPE of SHITED');
							break;
					}
				} else {
					if (typeof callback === 'function') {
						callback(resources);
					}
					if (typeof nanobar !== 'undefined') {
						nanobar.go(100);
					}
				}
			}
			recurseQueue();
		});
	}
	
}

if (typeof module === 'object') {
	module.exports = new ladderized();
} else {
	if (typeof window === 'object') {
		window.Ladderized = new ladderized();
	}
}