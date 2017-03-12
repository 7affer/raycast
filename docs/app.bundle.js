!function(t){function e(i){if(s[i])return s[i].exports;var n=s[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}([function(t,e,s){s(1),t.exports=s(16)},function(t,e,s){"use strict";var i=s(2),n=s(3),o=s(8),r=s(9),a=s(10),h=s(14),l=document.getElementById("fps"),c=window.innerWidth<1024?window.innerWidth:1024,u={width:c,height:Math.floor(c/1.8),height2:Math.floor(c/1.8/2),fov:70*Math.PI/180,drawingdistance:20,floorcolor1:"#3D2F2D",floorcolor2:"#261311",wallheight:.8*Math.floor(c/1.8)},f=new i.AssetLoader;f.loadall(function(t){return document.getElementById("loading").innerHTML="Loading: "+Math.ceil(100*t)+"%"},function(){function t(){var e=Date.now(),s=e-p;p=e,d.getcontrols(c,i,s),g.renderframe(s,i,d,u.fov),requestAnimationFrame(t),l.innerText=Math.floor(1e3/s).toString()}document.getElementById("loading-container").style.display="none";var e=document.getElementById("gamecanvas"),s=e.getContext("2d"),i=new a.Map(150,.3,f,u),c=new o.Controls,d=new h.Player(i.size/2+.25,i.size/2+.25,new r.Angle(0),f),g=new n.Scene(s,u,f);e.width=u.width,e.height=u.height,e.style.width=u.width+"px",e.style.height=u.height+"px",c.bindevents(document,e),d.initonmap(i);var p=Date.now();t()})},function(t,e){"use strict";var s=function(){function t(){this.loaded=0,this.wallssrcs=["./assets/walls/wall1.jpg","./assets/walls/wall2.jpg","./assets/walls/wall3.jpg","./assets/walls/wall4.jpg","./assets/walls/wall5.jpg","./assets/walls/wall1b.jpg","./assets/walls/wall2b.jpg","./assets/walls/wall3b.jpg","./assets/walls/wall4b.jpg","./assets/walls/wall5b.jpg","./assets/walls/wall1c.jpg","./assets/walls/wall2c.jpg","./assets/walls/wall3c.jpg","./assets/walls/wall4c.jpg","./assets/walls/wall5c.jpg"],this.spritessrcs=["./assets/sprites/sprite1.png","./assets/sprites/sprite2.png","./assets/sprites/sprite3.png","./assets/sprites/sprite4.png","./assets/sprites/sprite5.png"],this.zspritessrcs=["./assets/sprites/zombie1.png","./assets/sprites/zombie2.png","./assets/sprites/zombie3.png","./assets/sprites/zombie4.png"],this.skylinesrcs=["./assets/sprites/skyline.jpg"],this.soundssrcs=["./assets/sounds/gun.mp3"],this.sprites=new Array,this.zsprites=new Array,this.walls=new Array,this.skyline=new Array,this.sounds=new Array}return t.prototype.toload=function(){return this.walls.length+this.sprites.length+this.zsprites.length+this.skyline.length},t.prototype.loadimages=function(t,e,s,i){var n=this;for(var o in t)e.push(new Image),e[o].onload=function(){s(++n.loaded/n.toload()),n.loaded>=n.toload()&&i()},e[o].src=t[o]},t.prototype.loadaudio=function(t,e,s,i){for(var n in t)e.push(new Audio),e[n].oncanplaythrough=function(){},e[n].src=t[n]},t.prototype.loadall=function(t,e){this.loadimages(this.wallssrcs,this.walls,t,e),this.loadimages(this.spritessrcs,this.sprites,t,e),this.loadimages(this.zspritessrcs,this.zsprites,t,e),this.loadimages(this.skylinesrcs,this.skyline,t,e),this.loadaudio(this.soundssrcs,this.sounds,t,e)},t}();e.AssetLoader=s},function(t,e,s){"use strict";var i=s(4),n=s(5),o=s(6),r=s(19),a=function(){function t(t,e,s){this.ctx=t,this.settings=e,this.assets=s,this.lastrender=Date.now(),this.height2=Math.floor(e.height/2),this.backgroundrenderer=new r.BackgroundRenderer(s,e)}return t.prototype.renderwall=function(t,e,s,i){var n=Math.ceil(this.settings.wallheight/e),o=Math.floor(this.height2-n/2),r=Math.floor(i*s.width),a=.7*this.settings.drawingdistance;this.ctx.drawImage(s,r,0,1,s.height,t,o,1,n),t%3==0&&(this.ctx.beginPath(),this.ctx.moveTo(t,o),this.ctx.lineTo(t,this.settings.height-o),this.ctx.lineWidth=4,this.ctx.strokeStyle="#000000",this.ctx.fillStyle="#000000",this.ctx.globalAlpha=Math.min(e,a)/a,this.ctx.stroke(),this.ctx.globalAlpha=1)},t.prototype.drawwall=function(t,e,s,i){var n=s.x-Math.floor(s.x),o=s.y-Math.floor(s.y),r=Math.abs(n>o?n:o);e<3?this.renderwall(t,e,this.assets.walls[s.type-1],r):e<8?this.renderwall(t,e,this.assets.walls[s.type-1+5],r):this.renderwall(t,e,this.assets.walls[s.type-1+10],r)},t.prototype.drawfloor=function(t,e,s,i){var n=Math.ceil(this.settings.wallheight/e),o=Math.floor(this.settings.height-(this.height2-n/2));return i&&t%3==0&&(this.ctx.beginPath(),this.ctx.moveTo(t,s),this.ctx.lineTo(t,o),this.ctx.lineWidth=3,this.ctx.strokeStyle=this.settings.floorcolor2,this.ctx.stroke()),o},t.prototype.filterobjectsinrange=function(t,e){for(var s=new Array,i=0;i<e.length;i++)n.DistanceCalc.mdistance(t,e[i])<this.settings.drawingdistance&&s.push(e[i]);return s},t.prototype.getobjectstodraw=function(t,e,s,o,r){for(var a=new Array,h=0,l=e;h<l.length;h++){var c=l[h],u=Math.atan2(c.y-t.y,c.x-t.x);if(c.distance=n.DistanceCalc.distance(t,c),c.distance<this.settings.drawingdistance&&c.distance<r){c.distance<.2&&(c.distance=.2);var f=s-u;f<-Math.PI&&(f+=i.PI2_0),f>Math.PI&&(f-=i.PI2_0);var d=f/Math.atan2(c.anglewidth,c.distance);Math.abs(d)<=1&&(d=Math.abs(d-1),c.left<0&&(c.left=o,c.starttexture=d),c.width+=5,c.endtexture=d,a.push(c))}}return a},t.prototype.renderframe=function(t,e,s,i){this.backgroundrenderer.render(this.ctx,s.facing.angle);for(var r=this.filterobjectsinrange(s,e.sprites),a=s.getrays(this.settings.width,this.settings.fov),h=(Math.floor(s.x)+Math.floor(s.y))%2==0,l=0;l<a.length;l++){for(var c=this.settings.height,u=h,f=void 0,d=Math.cos(s.facing.angle-a[l].angle),g=o.Ray.cast(e,s,null,null,a[l],this.settings.drawingdistance),p=0,y=g;p<y.length;p++){var w=y[p],m=n.DistanceCalc.distance(s,w)*d;w.type>0&&(f=m,this.drawwall(l,m,w,s)),c=this.drawfloor(l,m,c,u),u=!u}l%5==0&&this.getobjectstodraw(s,r,a[l].angle,l,f)}for(var v=0,x=r;v<x.length;v++){var M=x[v];M.left>=0&&M.render(this.ctx),M.left=-1,M.width=0}},t}();e.Scene=a},function(t,e){"use strict";e.PI0_5=Math.PI/2,e.PI1_0=Math.PI,e.PI1_5=3*Math.PI/2,e.PI2_0=2*Math.PI,e.PI4_0=4*Math.PI},function(t,e){"use strict";var s=function(){function t(){}return t.distance=function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},t.mdistance=function(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)},t}();e.DistanceCalc=s},function(t,e,s){"use strict";var i=s(5),n=s(7),o=function(){function t(){}return t.cast=function(e,s,o,r,a,h){if(h<1)return[];var l=o||t.nearesty(s,a),c=r||t.nearestx(s,a),u=i.DistanceCalc.mdistance(s,l),f=i.DistanceCalc.mdistance(s,c);if(u<f){var d=e.getvalue(Math.floor(l.x),l.y-(a.dy>0?0:1));return d>0?[new n.Colision(l.x,l.y,d)]:[new n.Colision(l.x,l.y,d)].concat(t.cast(e,l,null,c,a,h-u))}var d=e.getvalue(c.x-(a.dx>0?0:1),Math.floor(c.y));return d>0?[new n.Colision(c.x,c.y,d)]:[new n.Colision(c.x,c.y,d)].concat(t.cast(e,c,l,null,a,h-f))},t.nearesty=function(t,e){var s=Math.floor(t.y+e.dy);s==t.y&&(s-=1);var i=s-t.y,n=e.ctg*i;return{x:n+t.x,y:s}},t.nearestx=function(t,e){var s=Math.floor(t.x+e.dx);s==t.x&&(s-=1);var i=s-t.x,n=e.tg*i;return{x:s,y:n+t.y}},t}();e.Ray=o},function(t,e){"use strict";var s=function(){function t(t,e,s){this.x=t,this.y=e,this.type=s}return t}();e.Colision=s},function(t,e){"use strict";var s=function(){function t(){var t=this;this.rotateleft=!1,this.rotateright=!1,this.forward=!1,this.backward=!1,this.run=!1,this.strafeleft=!1,this.straferight=!1,this.mouserotateleft=0,this.mouserotateright=0,this.shoot=!1,this.mousemovefunction=function(e){return t.mousemove(e)}}return t.prototype.mousemove=function(t){t.movementX<0?(this.mouserotateleft=-t.movementX/5,this.mouserotateright=0):t.movementX>0&&(this.mouserotateleft=0,this.mouserotateright=t.movementX/5)},t.prototype.resetmouserotate=function(){this.mouserotateleft=0,this.mouserotateright=0},t.prototype.keydown=function(t){17==t.keyCode&&(this.shoot=!0),37==t.keyCode&&(this.rotateleft=!0),68==t.keyCode&&(this.strafeleft=!0),39==t.keyCode&&(this.rotateright=!0),65==t.keyCode&&(this.straferight=!0),38!=t.keyCode&&87!=t.keyCode||(this.forward=!0),40!=t.keyCode&&83!=t.keyCode||(this.backward=!0),this.run=t.shiftKey},t.prototype.touchstart=function(t,e){var s=t.touches[0];this.touchend(t),s.pageY<.5*e.height?this.shoot=!0:s.pageX<.333*window.innerWidth?this.rotateleft=!0:s.pageX<.666*window.innerWidth?this.forward=!0:this.rotateright=!0,t.preventDefault(),t.stopPropagation()},t.prototype.touchend=function(t){this.rotateleft=!1,this.rotateright=!1,this.forward=!1,t.preventDefault(),t.stopPropagation()},t.prototype.keyup=function(t){37==t.keyCode&&(this.rotateleft=!1),68==t.keyCode&&(this.strafeleft=!1),39==t.keyCode&&(this.rotateright=!1),65==t.keyCode&&(this.straferight=!1),38!=t.keyCode&&87!=t.keyCode||(this.forward=!1),40!=t.keyCode&&83!=t.keyCode||(this.backward=!1),this.run=t.shiftKey},t.prototype.bindevents=function(t,e){var s=this;t.addEventListener("keydown",function(t){return s.keydown(t)},!1),t.addEventListener("keyup",function(t){return s.keyup(t)},!1),t.addEventListener("pointerlockchange",function(i){s.lockChangeAlert(t,e)},!1),t.addEventListener("mozpointerlockchange",function(i){s.lockChangeAlert(t,e)},!1),e.addEventListener("touchstart",function(t){s.touchstart(t,e)},!1),e.addEventListener("touchend",function(t){s.touchend(t)},!1),e.addEventListener("click",function(t){e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock,e.requestPointerLock(),s.shoot=!0},!1)},t.prototype.lockChangeAlert=function(t,e){var s=document.getElementById("gamecanvas");t.pointerLockElement===s||document.mozPointerLockElement===e?t.addEventListener("mousemove",this.mousemovefunction,!1):t.removeEventListener("mousemove",this.mousemovefunction,!1)},t}();e.Controls=s},function(t,e,s){"use strict";var i=s(4),n=function(){function t(e){this.angle=t.normalizeangle(e),this.sin=Math.sin(e),this.cos=Math.cos(e),this.tg=this.sin/this.cos,this.ctg=this.cos/this.sin,this.dx=this.cos>0?1:0,this.dy=this.sin>0?1:0}return t.normalizeangle=function(t){return t<0&&(t+=i.PI2_0),t>i.PI2_0&&(t-=i.PI2_0),t},t}();e.Angle=n},function(t,e,s){"use strict";var i=s(11),n=function(){function t(t,e,s,n){this.map=new Uint8Array(t*t),this.size=t,this.randomize(e);var o=new i.SpritesFactory(s,t,n);this.sprites=new Array;for(var r=0;r<10*t;r++)this.sprites.push(o.createsprite(i.SpriteType.Static));for(var r=0;r<30*t;r++)this.sprites.push(o.createsprite(i.SpriteType.Zombie))}return t.prototype.setvalue=function(t,e,s){var i=this.size*e+t;i<this.map.length&&i>=0&&(this.map[this.size*e+t]=s)},t.prototype.getvalue=function(t,e){if(t>=0&&e>=0&&t<this.size&&e<this.size){var s=this.size*e+t;return this.map[s]}return 0},t.prototype.randomize=function(t){for(var e=0;e<this.map.length;e++)Math.random()<t?Math.random()<.1?this.map[e]=5:Math.random()<.1?this.map[e]=4:Math.random()<.3?this.map[e]=3:Math.random()<.5?this.map[e]=2:this.map[e]=1:this.map[e]=0},t}();e.Map=n},function(t,e,s){"use strict";var i=s(12),n=s(13),o=function(){function t(t,e,s){this.assetloader=t,this.mapsize=e,this.settings=s}return t.prototype.createsprite=function(t){switch(t){case r.Static:return new i.Sprite(Math.random()*this.mapsize,Math.random()*this.mapsize,this.assetloader.sprites[Math.floor(Math.random()*this.assetloader.sprites.length)],this.settings);case r.Zombie:return new n.Zombie(Math.random()*this.mapsize,Math.random()*this.mapsize,this.assetloader.zsprites[Math.floor(Math.random()*this.assetloader.zsprites.length)],this.settings)}},t}();e.SpritesFactory=o;var r;!function(t){t[t.Static=1]="Static",t[t.Zombie=2]="Zombie"}(r||(r={})),e.SpriteType=r},function(t,e){"use strict";var s=function(){function t(t,e,s,i){this.x=t,this.y=e,this.image=s,this.left=-1,this.width=0,this.anglewidth=.2,null!=i&&(this.height2=Math.floor(i.height/2),this.maxheight=i.wallheight)}return t.prototype.render=function(t){var e=Math.ceil(this.maxheight/this.distance),s=Math.floor(this.height2+e/2),i=Math.floor(this.starttexture*this.image.width),n=Math.floor(this.endtexture*this.image.width),o=Math.floor(.4*e),r=Math.max(1,n-i),a=s-o;t.drawImage(this.image,i,0,r,this.image.height,this.left,a,this.width,o)},t}();e.Sprite=s},function(t,e){"use strict";var s=function(){function t(t,e,s,i){this.x=t,this.y=e,this.image=s,this.left=-1,this.width=0,this.anglewidth=.35,null!=i&&(this.height2=Math.floor(i.height/2),this.maxheight=i.wallheight)}return t.prototype.render=function(t){var e=Math.ceil(this.maxheight/this.distance),s=Math.floor(this.height2+e/2),i=Math.floor(this.starttexture*this.image.width),n=Math.floor(this.endtexture*this.image.width),o=Math.floor(.8*e),r=Math.max(1,n-i),a=s-o;t.drawImage(this.image,i,0,r,this.image.height,this.left,a,this.width,o)},t}();e.Zombie=s},function(t,e,s){"use strict";var i=s(15),n=s(4),o=s(9),r=function(){function t(t,e,s,n){this.x=t,this.y=e,this.facing=s,this.loader=n,this.guncooldown=0,null!=n&&(this.mixer=new i.Mixer(n))}return t.prototype.getrays=function(t,e){for(var s=e/t,i=this.facing.angle+e/2,n=new Array,r=0;r<t;r++)n.push(new o.Angle(i)),i-=s;return n},t.prototype.shoot=function(){var t=(new Date).getTime();this.guncooldown<t&&(this.mixer.playsound(0),this.guncooldown=t+750)},t.prototype.rotateleft=function(t,e){this.facing=new o.Angle(this.facing.angle+Math.PI*e*t/1200)},t.prototype.rotateright=function(t,e){this.facing=new o.Angle(this.facing.angle-Math.PI*e*t/1200)},t.prototype.correctposition=function(t,e){t.getvalue(Math.floor(e.x),Math.floor(this.y))>0&&(e.x=this.x),t.getvalue(Math.floor(this.x),Math.floor(e.y))>0&&(e.y=this.y),this.x=e.x,this.y=e.y},t.prototype.moveforward=function(t,e,s){var i={x:this.x+this.facing.cos*t/(s?250:500),y:this.y+this.facing.sin*t/(s?250:500)};this.correctposition(e,i)},t.prototype.movebackward=function(t,e){this.correctposition(e,{x:this.x-this.facing.cos*t/500,y:this.y-this.facing.sin*t/500})},t.prototype.strafeleft=function(t,e,s){var i=new o.Angle(this.facing.angle-n.PI0_5);this.correctposition(e,{x:this.x+i.cos*t/(s?250:500),y:this.y+i.sin*t/(s?250:500)})},t.prototype.straferight=function(t,e,s){var i=new o.Angle(this.facing.angle+n.PI0_5);this.correctposition(e,{x:this.x+i.cos*t/(s?250:500),y:this.y+i.sin*t/(s?250:500)})},t.prototype.initonmap=function(t){for(;t.getvalue(Math.floor(this.x),Math.floor(this.y))>0;)this.x+=1},t.prototype.getcontrols=function(t,e,s){t.forward&&this.moveforward(s,e,t.run),t.backward&&this.movebackward(s,e),t.rotateleft&&this.rotateleft(s,1),t.rotateright&&this.rotateright(s,1),t.mouserotateleft&&this.rotateleft(s,t.mouserotateleft),t.mouserotateright&&this.rotateright(s,t.mouserotateright),t.strafeleft&&this.strafeleft(s,e,t.run),t.straferight&&this.straferight(s,e,t.run),t.shoot&&(this.shoot(),t.shoot=!1),t.resetmouserotate()},t}();e.Player=r},function(t,e){"use strict";var s=function(){function t(t){this.maxchannels=32,this.loader=t,this.audiochannels=new Array;for(var e=0;e<this.maxchannels;e++)this.audiochannels[e]=new i,this.audiochannels[e].audioel=new Audio,this.audiochannels[e].finish=-1}return t.prototype.playsound=function(t){var e=new Audio(this.loader.soundssrcs[t]);e.play()},t}();e.Mixer=s;var i=function(){function t(){}return t}()},function(t,e){},,,function(t,e,s){"use strict";var i=s(4),n=function(){function t(t,e){this.loader=t,this.settings=e}return t.prototype.render=function(t,e){var s=this.loader.skyline[0],n=Math.floor(s.width*(i.PI2_0-e)/i.PI4_0),o=Math.floor(s.width/2);t.drawImage(s,n,0,o,s.height,0,0,this.settings.width,this.settings.height2),t.fillStyle=this.settings.floorcolor1,t.fillRect(0,this.settings.height2,this.settings.width,this.settings.height),console.log(e+" "+s.width/2+" "+n)},t}();e.BackgroundRenderer=n}]);
//# sourceMappingURL=app.bundle.js.map