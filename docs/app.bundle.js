/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(13);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sprite_1 = __webpack_require__(2);
	var assetloader_1 = __webpack_require__(3);
	var scene_1 = __webpack_require__(4);
	var controls_1 = __webpack_require__(9);
	var angle_1 = __webpack_require__(10);
	var map_1 = __webpack_require__(11);
	var player_1 = __webpack_require__(12);
	var fps = document.getElementById('fps');
	var width = window.innerWidth < 1024 ? window.innerWidth : 1024;
	var gamesettins = {
	    width: width,
	    height: Math.floor(width / 1.8),
	    fov: 70 * Math.PI / 180,
	    drawingdistance: 20,
	    floorcolor1: '#000011',
	    floorcolor2: '#111122'
	};
	var canvas = document.getElementById('gamecanvas');
	var ctx = canvas.getContext('2d');
	var map = new map_1.Map(150, 0.3);
	var player = new player_1.Player({ x: map.size / 2 + 0.25, y: map.size / 2 + 0.25 }, new angle_1.Angle(0), gamesettins.fov);
	var controls = new controls_1.Controls();
	var assetloader = new assetloader_1.AssetLoader();
	var scene = new scene_1.Scene(ctx, gamesettins, assetloader);
	var sprites = new Array();
	for (var i = 0; i < map.size * 25; i++) {
	    sprites.push(new sprite_1.Sprite({
	        x: Math.random() * map.size,
	        y: Math.random() * map.size
	    }, Math.floor(Math.random() * 5)));
	}
	canvas.width = gamesettins.width;
	canvas.height = gamesettins.height;
	canvas.style.width = gamesettins.width + "px";
	canvas.style.height = gamesettins.height + "px";
	controls.bindevents(document, canvas);
	player.initonmap(map);
	var objectsinrange = new Array();
	var lastrender = Date.now();
	function render() {
	    var now = Date.now();
	    var delta = now - lastrender;
	    lastrender = now;
	    objectsinrange = new Array();
	    for (var i = 0; i < sprites.length; i++) {
	        if (Math.abs(player.position.x - sprites[i].position.x) < gamesettins.drawingdistance &&
	            Math.abs(player.position.y - sprites[i].position.y) < gamesettins.drawingdistance) {
	            sprites[i].angle = angle_1.Angle.normalizeangle(Math.atan2(sprites[i].position.y - player.position.y, sprites[i].position.x - player.position.x));
	            objectsinrange.push(sprites[i]);
	        }
	    }
	    player.getcontrols(controls, map, delta);
	    scene.renderframe(delta, map, player, objectsinrange);
	    requestAnimationFrame(render);
	    fps.innerText = (Math.floor(1000 / delta)).toString();
	}
	assetloader.loadall(function (prog) { return document.getElementById('loading').innerHTML = "Loading: " + Math.ceil(prog * 100) + "%"; }, function () { document.getElementById('loading-container').style.display = 'none'; render(); });


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Sprite = (function () {
	    function Sprite(position, type) {
	        this.position = position;
	        this.type = type;
	        this.start = -1;
	    }
	    return Sprite;
	}());
	exports.Sprite = Sprite;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var AssetLoader = (function () {
	    function AssetLoader() {
	        this.loaded = 0;
	        this.wallssrcs = [
	            './assets/walls/wall1.jpg',
	            './assets/walls/wall2.jpg',
	            './assets/walls/wall3.jpg',
	            './assets/walls/wall4.jpg',
	            './assets/walls/wall5.jpg',
	            './assets/walls/wall1b.jpg',
	            './assets/walls/wall2b.jpg',
	            './assets/walls/wall3b.jpg',
	            './assets/walls/wall4b.jpg',
	            './assets/walls/wall5b.jpg',
	            './assets/walls/wall1c.jpg',
	            './assets/walls/wall2c.jpg',
	            './assets/walls/wall3c.jpg',
	            './assets/walls/wall4c.jpg',
	            './assets/walls/wall5c.jpg'
	        ];
	        this.walls = new Array();
	        for (var item in this.wallssrcs)
	            this.walls.push(new Image());
	        this.spritessrcs = [
	            './assets/sprites/sprite1.png',
	            './assets/sprites/sprite2.png',
	            './assets/sprites/sprite3.png',
	            './assets/sprites/sprite4.png',
	            './assets/sprites/sprite5.png'
	        ];
	        this.sprites = new Array();
	        for (var item in this.spritessrcs)
	            this.sprites.push(new Image());
	        this.skylinesrcs = [
	            './assets/sprites/skyline.jpg'
	        ];
	        this.skyline = new Array();
	        for (var item in this.skylinesrcs)
	            this.skyline.push(new Image());
	    }
	    AssetLoader.prototype.isloaded = function () {
	        return this.loaded == this.toload();
	    };
	    AssetLoader.prototype.toload = function () {
	        return this.walls.length + this.sprites.length + this.skyline.length;
	    };
	    AssetLoader.prototype.loadall = function (onprogress, callback) {
	        var _this = this;
	        for (var i in this.wallssrcs) {
	            this.walls[i].onload = function () {
	                _this.loaded += 1;
	                onprogress(_this.loaded / _this.toload());
	                if (_this.isloaded())
	                    callback();
	            };
	            this.walls[i].src = this.wallssrcs[i];
	        }
	        for (var i in this.spritessrcs) {
	            this.sprites[i].onload = function () {
	                _this.loaded += 1;
	                onprogress(_this.loaded / _this.toload());
	                if (_this.isloaded())
	                    callback();
	            };
	            this.sprites[i].src = this.spritessrcs[i];
	        }
	        for (var i in this.skylinesrcs) {
	            this.skyline[i].onload = function () {
	                _this.loaded += 1;
	                onprogress(_this.loaded / _this.toload());
	                if (_this.isloaded())
	                    callback();
	            };
	            this.skyline[i].src = this.skylinesrcs[i];
	        }
	    };
	    return AssetLoader;
	}());
	exports.AssetLoader = AssetLoader;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mathconst_1 = __webpack_require__(5);
	var ray_1 = __webpack_require__(6);
	var distancecalc_1 = __webpack_require__(8);
	var Scene = (function () {
	    function Scene(ctx, settings, assets) {
	        this.ctx = ctx;
	        this.settings = settings;
	        this.assets = assets;
	        this.lastrender = Date.now();
	        this.height2 = Math.floor(settings.height / 2);
	        this.wallheight = Math.floor(settings.height * 0.8);
	    }
	    Scene.prototype.renderbackground = function (player) {
	        // var grdceiling = this.ctx.createLinearGradient(0, 0, 0, this.height2);
	        // grdceiling.addColorStop(0, '#aaaaaa');
	        // grdceiling.addColorStop(1, '#222222');
	        // this.ctx.fillStyle = grdceiling;
	        // this.ctx.fillRect(0, 0, this.settings.width, this.height2)
	        var image = this.assets.skyline[0];
	        var PI4 = 4 * Math.PI;
	        var sleft = ((mathconst_1.PI2_0 - (player.facing.angle + player.fov / 2)) / PI4) * image.width;
	        sleft = Math.abs(sleft);
	        sleft = Math.floor(sleft);
	        var swidth = Math.floor((image.width * player.fov) / PI4);
	        var height = Math.floor(this.settings.height * 0.5);
	        this.ctx.drawImage(image, sleft, 0, swidth, image.height, 0, 0, this.settings.width, height);
	        this.ctx.fillStyle = this.settings.floorcolor1;
	        this.ctx.fillRect(0, this.height2, this.settings.width, this.settings.height);
	    };
	    Scene.prototype.renderwall = function (row, distance, image, textureposition) {
	        var height = Math.ceil(this.wallheight / distance);
	        var top = Math.floor(this.height2 - height / 2);
	        var texleft = Math.floor(textureposition * image.width);
	        this.ctx.drawImage(image, texleft, 0, 1, image.height, row, top, 1, height);
	        if (row % 3 == 0) {
	            this.ctx.beginPath();
	            this.ctx.moveTo(row, top);
	            this.ctx.lineTo(row, this.settings.height - top);
	            this.ctx.lineWidth = 4;
	            this.ctx.strokeStyle = '#000000';
	            this.ctx.fillStyle = '#000000';
	            this.ctx.globalAlpha = (distance / this.settings.drawingdistance) * 0.8;
	            this.ctx.stroke();
	            this.ctx.globalAlpha = 1;
	        }
	    };
	    Scene.prototype.drawwall = function (left, distance, wall, player) {
	        var modx = wall.point.x - Math.floor(wall.point.x);
	        var mody = wall.point.y - Math.floor(wall.point.y);
	        var textureposition = Math.abs(modx > mody ? modx : mody);
	        if (distance < 3) {
	            this.renderwall(left, distance, this.assets.walls[wall.type - 1], textureposition);
	        }
	        else if (distance < 8) {
	            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 5], textureposition);
	        }
	        else {
	            this.renderwall(left, distance, this.assets.walls[wall.type - 1 + 10], textureposition);
	        }
	    };
	    Scene.prototype.drawobject = function (object) {
	        var wallheight = Math.ceil(this.wallheight / object.distance);
	        var bottom = Math.floor(this.height2 + wallheight / 2);
	        var image = this.assets.sprites[object.type];
	        var texleft = Math.floor(object.starttexture * image.width);
	        var texright = Math.floor(object.endtexture * image.width);
	        var height = Math.floor(wallheight * 0.4);
	        var swidth = Math.max(1, texright - texleft);
	        var top = bottom - height;
	        var width = Math.max(1, object.end - object.start);
	        this.ctx.drawImage(image, texleft, 0, swidth, image.height, object.start, top, width, height);
	    };
	    Scene.prototype.drawfloor = function (left, distance, bottom, useback) {
	        var height = Math.ceil(this.wallheight / distance);
	        var newbottom = Math.floor(this.settings.height - (this.height2 - height / 2));
	        if (useback && left % 3 == 0) {
	            this.ctx.beginPath();
	            this.ctx.moveTo(left, bottom);
	            this.ctx.lineTo(left, newbottom);
	            this.ctx.lineWidth = 3;
	            this.ctx.strokeStyle = this.settings.floorcolor2;
	            this.ctx.stroke();
	        }
	        return newbottom;
	    };
	    Scene.prototype.renderframe = function (delta, map, player, objects) {
	        this.renderbackground(player);
	        var rays = player.getrays(this.settings.width);
	        var drawfloor = (Math.floor(player.position.x) + Math.floor(player.position.y)) % 2 == 0;
	        for (var r = 0; r < rays.length; r++) {
	            var bottom = this.settings.height;
	            var drawfloorray = drawfloor;
	            var walldistance = void 0;
	            var cos = Math.cos(player.facing.angle - rays[r].angle);
	            var colisions = ray_1.Ray.cast(map, player.position, null, null, rays[r], this.settings.drawingdistance);
	            for (var _i = 0, colisions_1 = colisions; _i < colisions_1.length; _i++) {
	                var colision = colisions_1[_i];
	                var distance = distancecalc_1.DistanceCalc.getdistance(player.position, colision.point) * cos;
	                if (colision.type > 0) {
	                    walldistance = distance;
	                    this.drawwall(r, distance, colision, player);
	                }
	                bottom = this.drawfloor(r, distance, bottom, drawfloorray);
	                drawfloorray = !drawfloorray;
	            }
	            for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
	                var object = objects_1[_a];
	                object.distance = distancecalc_1.DistanceCalc.getdistance(player.position, object.position);
	                if (object.distance < this.settings.drawingdistance && object.distance < walldistance) {
	                    if (object.distance < 0.25)
	                        object.distance = 0.25;
	                    if (rays[r].angle > mathconst_1.PI1_5)
	                        rays[r].angle -= mathconst_1.PI2_0;
	                    if (object.angle > mathconst_1.PI1_5)
	                        object.angle -= mathconst_1.PI2_0;
	                    var diff = (rays[r].angle - object.angle) / (2 * Math.atan2(0.05, object.distance));
	                    if (Math.abs(diff) <= 1) {
	                        diff = Math.abs((diff - 1) * 0.5);
	                        if (object.start < 0) {
	                            object.start = r;
	                            object.starttexture = diff;
	                        }
	                        object.end = r;
	                        object.endtexture = diff;
	                    }
	                }
	            }
	        }
	        for (var _b = 0, objects_2 = objects; _b < objects_2.length; _b++) {
	            var object = objects_2[_b];
	            if (object.start >= 0)
	                this.drawobject(object);
	            object.start = -1;
	        }
	    };
	    return Scene;
	}());
	exports.Scene = Scene;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	exports.PI0_5 = Math.PI / 2;
	exports.PI1_0 = Math.PI;
	exports.PI1_5 = 3 * Math.PI / 2;
	exports.PI2_0 = 2 * Math.PI;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var colision_1 = __webpack_require__(7);
	var Ray = (function () {
	    function Ray() {
	    }
	    Ray.nearesty = function (origin, facing) {
	        var nexty = Math.floor(origin.y + facing.dy);
	        if (nexty == origin.y)
	            nexty -= 1;
	        var dy = nexty - origin.y;
	        var dx = facing.ctg * dy;
	        return {
	            x: dx + origin.x,
	            y: nexty,
	            manhattandistance: Math.abs(dx) + Math.abs(dy)
	        };
	    };
	    Ray.nearestx = function (origin, facing) {
	        var nextx = Math.floor(origin.x + facing.dx);
	        if (nextx == origin.x)
	            nextx -= 1;
	        var dx = nextx - origin.x;
	        var dy = facing.tg * dx;
	        return {
	            x: nextx,
	            y: dy + origin.y,
	            manhattandistance: Math.abs(dx) + Math.abs(dy)
	        };
	    };
	    Ray.cast = function (map, origin, nexth, nextv, facing, maxdistance) {
	        if (maxdistance < 1)
	            return [];
	        var h = nexth || Ray.nearesty(origin, facing);
	        var v = nextv || Ray.nearestx(origin, facing);
	        if (h.manhattandistance < v.manhattandistance) {
	            v.manhattandistance -= h.manhattandistance;
	            var type = map.getvalue(Math.floor(h.x), h.y - (facing.dy > 0 ? 0 : 1));
	            if (type > 0) {
	                return [new colision_1.Colision(h, type)];
	            }
	            else {
	                return [new colision_1.Colision(h, type)]
	                    .concat(Ray.cast(map, h, null, v, facing, maxdistance - h.manhattandistance));
	            }
	        }
	        else {
	            h.manhattandistance -= v.manhattandistance;
	            var type = map.getvalue(v.x - (facing.dx > 0 ? 0 : 1), Math.floor(v.y));
	            if (type > 0) {
	                return [new colision_1.Colision(v, type)];
	            }
	            else {
	                return [new colision_1.Colision(v, type)]
	                    .concat(Ray.cast(map, v, h, null, facing, maxdistance - v.manhattandistance));
	            }
	        }
	    };
	    return Ray;
	}());
	exports.Ray = Ray;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Colision = (function () {
	    function Colision(point, type) {
	        this.point = point;
	        this.type = type;
	    }
	    return Colision;
	}());
	exports.Colision = Colision;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var DistanceCalc = (function () {
	    function DistanceCalc() {
	    }
	    DistanceCalc.getdistance = function (a, b) {
	        return Math.sqrt((a.x - b.x) * (a.x - b.x) +
	            (a.y - b.y) * (a.y - b.y));
	    };
	    return DistanceCalc;
	}());
	exports.DistanceCalc = DistanceCalc;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var Controls = (function () {
	    function Controls() {
	        var _this = this;
	        this.rotateleft = false;
	        this.rotateright = false;
	        this.forward = false;
	        this.backward = false;
	        this.run = false;
	        this.strafeleft = false;
	        this.straferight = false;
	        this.mouserotateleft = 0;
	        this.mouserotateright = 0;
	        this.mousemovefunction = function (e) { return _this.mousemove(e); };
	    }
	    Controls.prototype.mousemove = function (e) {
	        if (e.movementX < 0) {
	            this.mouserotateleft = -e.movementX / 5;
	            this.mouserotateright = 0;
	        }
	        else if (e.movementX > 0) {
	            this.mouserotateleft = 0;
	            this.mouserotateright = e.movementX / 5;
	        }
	    };
	    Controls.prototype.resetmouserotate = function () {
	        this.mouserotateleft = 0;
	        this.mouserotateright = 0;
	    };
	    Controls.prototype.keydown = function (e) {
	        if (e.keyCode == 37)
	            this.rotateleft = true;
	        if (e.keyCode == 68)
	            this.strafeleft = true;
	        if (e.keyCode == 39)
	            this.rotateright = true;
	        if (e.keyCode == 65)
	            this.straferight = true;
	        if (e.keyCode == 38 || e.keyCode == 87)
	            this.forward = true;
	        if (e.keyCode == 40 || e.keyCode == 83)
	            this.backward = true;
	        this.run = e.shiftKey;
	    };
	    Controls.prototype.touchstart = function (e) {
	        var t = e.touches[0];
	        this.touchend(e);
	        if (t.pageX < window.innerWidth * 0.333)
	            this.rotateleft = true;
	        else if (t.pageX < window.innerWidth * 0.666)
	            this.forward = true;
	        else
	            this.rotateright = true;
	        e.preventDefault();
	        e.stopPropagation();
	    };
	    Controls.prototype.touchend = function (e) {
	        this.rotateleft = false;
	        this.rotateright = false;
	        this.forward = false;
	        e.preventDefault();
	        e.stopPropagation();
	    };
	    Controls.prototype.keyup = function (e) {
	        if (e.keyCode == 37)
	            this.rotateleft = false;
	        if (e.keyCode == 68)
	            this.strafeleft = false;
	        if (e.keyCode == 39)
	            this.rotateright = false;
	        if (e.keyCode == 65)
	            this.straferight = false;
	        if (e.keyCode == 38 || e.keyCode == 87)
	            this.forward = false;
	        if (e.keyCode == 40 || e.keyCode == 83)
	            this.backward = false;
	        this.run = e.shiftKey;
	    };
	    Controls.prototype.bindevents = function (doc, canvas) {
	        var _this = this;
	        doc.addEventListener('keydown', function (e) { return _this.keydown(e); }, false);
	        doc.addEventListener('keyup', function (e) { return _this.keyup(e); }, false);
	        doc.addEventListener('pointerlockchange', function (e) { _this.lockChangeAlert(doc, canvas); }, false);
	        canvas.addEventListener('touchstart', function (e) { _this.touchstart(e); }, false);
	        canvas.addEventListener('touchend', function (e) { _this.touchend(e); }, false);
	        canvas.addEventListener('click', function (e) {
	            canvas.requestPointerLock = canvas.requestPointerLock;
	            canvas.requestPointerLock();
	        }, false);
	    };
	    Controls.prototype.lockChangeAlert = function (doc, canvas) {
	        var canvaselement = document.getElementById('gamecanvas');
	        if (doc.pointerLockElement === canvaselement) {
	            doc.addEventListener("mousemove", this.mousemovefunction, false);
	        }
	        else {
	            doc.removeEventListener("mousemove", this.mousemovefunction, false);
	        }
	    };
	    return Controls;
	}());
	exports.Controls = Controls;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mathconst_1 = __webpack_require__(5);
	var Angle = (function () {
	    function Angle(angle) {
	        this.angle = Angle.normalizeangle(angle);
	        this.sin = Math.sin(angle);
	        this.cos = Math.cos(angle);
	        this.tg = this.sin / this.cos;
	        this.ctg = this.cos / this.sin;
	        this.dx = this.cos > 0 ? 1 : 0;
	        this.dy = this.sin > 0 ? 1 : 0;
	    }
	    Angle.normalizeangle = function (angle) {
	        if (angle < 0)
	            angle += mathconst_1.PI2_0;
	        if (angle > mathconst_1.PI2_0)
	            angle -= mathconst_1.PI2_0;
	        return angle;
	    };
	    return Angle;
	}());
	exports.Angle = Angle;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var Map = (function () {
	    function Map(size, randparam) {
	        this.map = new Uint8Array(size * size);
	        this.size = size;
	        this.randomize(randparam);
	    }
	    Map.prototype.setvalue = function (x, y, value) {
	        var pos = this.size * y + x;
	        if (pos < this.map.length && pos >= 0) {
	            this.map[this.size * y + x] = value;
	        }
	    };
	    Map.prototype.getvalue = function (x, y) {
	        if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
	            var pos = this.size * y + x;
	            return this.map[pos];
	        }
	        return 0;
	    };
	    Map.prototype.randomize = function (randparam) {
	        for (var i = 0; i < this.map.length; i++) {
	            if (Math.random() < randparam) {
	                if (Math.random() < 0.1) {
	                    this.map[i] = 5;
	                }
	                else if (Math.random() < 0.1) {
	                    this.map[i] = 4;
	                }
	                else if (Math.random() < 0.3) {
	                    this.map[i] = 3;
	                }
	                else if (Math.random() < 0.5) {
	                    this.map[i] = 2;
	                }
	                else {
	                    this.map[i] = 1;
	                }
	            }
	            else {
	                this.map[i] = 0;
	            }
	        }
	    };
	    return Map;
	}());
	exports.Map = Map;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mathconst_1 = __webpack_require__(5);
	var angle_1 = __webpack_require__(10);
	var Player = (function () {
	    function Player(position, facing, fov) {
	        this.position = position;
	        this.facing = facing;
	        this.fov = fov;
	    }
	    Player.prototype.getrays = function (columns) {
	        var step = this.fov / columns;
	        var angle = this.facing.angle + this.fov / 2;
	        var rays = new Array();
	        for (var i = 0; i < columns; i++) {
	            rays.push(new angle_1.Angle(angle));
	            angle -= step;
	        }
	        return rays;
	    };
	    Player.prototype.rotateleft = function (delta, movement) {
	        this.facing = new angle_1.Angle(this.facing.angle + Math.PI * movement * delta / 1200);
	    };
	    Player.prototype.rotateright = function (delta, movement) {
	        this.facing = new angle_1.Angle(this.facing.angle - Math.PI * movement * delta / 1200);
	    };
	    Player.prototype.correctposition = function (map, position) {
	        if (map.getvalue(Math.floor(position.x), Math.floor(this.position.y)) > 0) {
	            position.x = this.position.x;
	        }
	        if (map.getvalue(Math.floor(this.position.x), Math.floor(position.y)) > 0) {
	            position.y = this.position.y;
	        }
	        return position;
	    };
	    Player.prototype.moveforward = function (delta, map, run) {
	        var position = {
	            x: this.position.x + this.facing.cos * delta / (run ? 250 : 500),
	            y: this.position.y + this.facing.sin * delta / (run ? 250 : 500)
	        };
	        this.position = this.correctposition(map, position);
	    };
	    Player.prototype.movebackward = function (delta, map) {
	        var position = {
	            x: this.position.x - this.facing.cos * delta / 500,
	            y: this.position.y - this.facing.sin * delta / 500
	        };
	        this.position = this.correctposition(map, position);
	    };
	    Player.prototype.strafeleft = function (delta, map, run) {
	        var newfacing = new angle_1.Angle(this.facing.angle - mathconst_1.PI0_5);
	        var position = {
	            x: this.position.x + newfacing.cos * delta / (run ? 250 : 500),
	            y: this.position.y + newfacing.sin * delta / (run ? 250 : 500)
	        };
	        this.position = this.correctposition(map, position);
	    };
	    Player.prototype.straferight = function (delta, map, run) {
	        var newfacing = new angle_1.Angle(this.facing.angle + mathconst_1.PI0_5);
	        var position = {
	            x: this.position.x + newfacing.cos * delta / (run ? 250 : 500),
	            y: this.position.y + newfacing.sin * delta / (run ? 250 : 500)
	        };
	        this.position = this.correctposition(map, position);
	    };
	    Player.prototype.initonmap = function (map) {
	        while (map.getvalue(Math.floor(this.position.x), Math.floor(this.position.y)) > 0) {
	            this.position.x += 1;
	        }
	    };
	    Player.prototype.getcontrols = function (controls, map, delta) {
	        if (controls.forward)
	            this.moveforward(delta, map, controls.run);
	        if (controls.backward)
	            this.movebackward(delta, map);
	        if (controls.rotateleft)
	            this.rotateleft(delta, 1);
	        if (controls.rotateright)
	            this.rotateright(delta, 1);
	        if (controls.mouserotateleft)
	            this.rotateleft(delta, controls.mouserotateleft);
	        if (controls.mouserotateright)
	            this.rotateright(delta, controls.mouserotateright);
	        if (controls.strafeleft)
	            this.strafeleft(delta, map, controls.run);
	        if (controls.straferight)
	            this.straferight(delta, map, controls.run);
	        controls.resetmouserotate();
	    };
	    return Player;
	}());
	exports.Player = Player;


/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map