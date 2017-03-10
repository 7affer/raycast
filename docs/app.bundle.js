!function(t){function e(s){if(i[s])return i[s].exports;var o=i[s]={exports:{},id:s,loaded:!1};return t[s].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){i(1),t.exports=i(15)},function(t,e,i){"use strict";var s=i(2),o=i(3),n=i(9),a=i(5),r=i(10),h=i(13),l=document.getElementById("fps"),c=window.innerWidth<1024?window.innerWidth:1024,u={width:c,height:Math.floor(c/1.8),fov:70*Math.PI/180,drawingdistance:20,floorcolor1:"#3D2F2D",floorcolor2:"#261311",wallheight:.8*Math.floor(c/1.8)},d=new s.AssetLoader;d.loadall(function(t){return document.getElementById("loading").innerHTML="Loading: "+Math.ceil(100*t)+"%"},function(){function t(){var e=Date.now(),i=e-p;p=e,g.getcontrols(c,s,i),f.renderframe(i,s,g,u.fov),requestAnimationFrame(t),l.innerText=Math.floor(1e3/i).toString()}document.getElementById("loading-container").style.display="none";var e=document.getElementById("gamecanvas"),i=e.getContext("2d"),s=new r.Map(150,.3,d,u),c=new n.Controls,g=new h.Player(s.size/2+.25,s.size/2+.25,new a.Angle(0),d),f=new o.Scene(i,u,d);e.width=u.width,e.height=u.height,e.style.width=u.width+"px",e.style.height=u.height+"px",c.bindevents(document,e),g.initonmap(s);var p=Date.now();t()})},function(t,e){"use strict";var i=function(){function t(){this.loaded=0,this.mobilecheck=function(){var t=!1;return function(e){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t},this.wallssrcs=["./assets/walls/wall1.jpg","./assets/walls/wall2.jpg","./assets/walls/wall3.jpg","./assets/walls/wall4.jpg","./assets/walls/wall5.jpg","./assets/walls/wall1b.jpg","./assets/walls/wall2b.jpg","./assets/walls/wall3b.jpg","./assets/walls/wall4b.jpg","./assets/walls/wall5b.jpg","./assets/walls/wall1c.jpg","./assets/walls/wall2c.jpg","./assets/walls/wall3c.jpg","./assets/walls/wall4c.jpg","./assets/walls/wall5c.jpg"],this.spritessrcs=["./assets/sprites/sprite1.png","./assets/sprites/sprite2.png","./assets/sprites/sprite3.png","./assets/sprites/sprite4.png","./assets/sprites/sprite5.png"],this.zspritessrcs=["./assets/sprites/zombie1.png","./assets/sprites/zombie2.png","./assets/sprites/zombie3.png","./assets/sprites/zombie4.png"],this.skylinesrcs=["./assets/sprites/skyline.jpg"],this.soundssrcs=["./assets/sounds/gun.mp3"],this.sprites=new Array,this.zsprites=new Array,this.walls=new Array,this.skyline=new Array,this.sounds=new Array}return t.prototype.toload=function(){return this.walls.length+this.sprites.length+this.zsprites.length+this.skyline.length+(this.mobilecheck()?0:this.sounds.length)},t.prototype.loadimages=function(t,e,i,s){var o=this,n=function(n){e.push(new Image),e[n].onload=function(){i(++o.loaded/o.toload()),o.loaded>=o.toload()&&s(),console.log("loaded "+e[n])},e[n].src=t[n]};for(var a in t)n(a)},t.prototype.loadaudio=function(t,e,i,s){var o=this,n=function(n){e.push(new Audio),e[n].oncanplaythrough=function(){i(++o.loaded/o.toload()),o.loaded>=o.toload()&&s(),console.log("loaded "+e[n])},e[n].src=t[n]};for(var a in t)n(a)},t.prototype.loadall=function(t,e){this.loadimages(this.wallssrcs,this.walls,t,e),this.loadimages(this.spritessrcs,this.sprites,t,e),this.loadimages(this.zspritessrcs,this.zsprites,t,e),this.loadimages(this.skylinesrcs,this.skyline,t,e),this.loadaudio(this.soundssrcs,this.sounds,t,e);var i=new Audio;i.onload=function(){}},t}();e.AssetLoader=i},function(t,e,i){"use strict";var s=i(4),o=i(5),n=i(6),a=i(7),r=function(){function t(t,e,i){this.ctx=t,this.settings=e,this.assets=i,this.lastrender=Date.now(),this.height2=Math.floor(e.height/2)}return t.prototype.renderbackground=function(t,e){var i=this.assets.skyline[0],o=4*Math.PI,n=(s.PI2_0-(t.facing.angle+e/2))/o*i.width;n=Math.abs(n),n=Math.floor(n);var a=Math.floor(i.width*e/o),r=Math.floor(.5*this.settings.height);this.ctx.drawImage(i,n,0,a,i.height,0,0,this.settings.width,r),this.ctx.fillStyle=this.settings.floorcolor1,this.ctx.fillRect(0,this.height2,this.settings.width,this.settings.height)},t.prototype.renderwall=function(t,e,i,s){var o=Math.ceil(this.settings.wallheight/e),n=Math.floor(this.height2-o/2),a=Math.floor(s*i.width),r=.7*this.settings.drawingdistance;this.ctx.drawImage(i,a,0,1,i.height,t,n,1,o),t%3==0&&(this.ctx.beginPath(),this.ctx.moveTo(t,n),this.ctx.lineTo(t,this.settings.height-n),this.ctx.lineWidth=4,this.ctx.strokeStyle="#000000",this.ctx.fillStyle="#000000",this.ctx.globalAlpha=Math.min(e,r)/r,this.ctx.stroke(),this.ctx.globalAlpha=1)},t.prototype.drawwall=function(t,e,i,s){var o=i.x-Math.floor(i.x),n=i.y-Math.floor(i.y),a=Math.abs(o>n?o:n);e<3?this.renderwall(t,e,this.assets.walls[i.type-1],a):e<8?this.renderwall(t,e,this.assets.walls[i.type-1+5],a):this.renderwall(t,e,this.assets.walls[i.type-1+10],a)},t.prototype.drawfloor=function(t,e,i,s){var o=Math.ceil(this.settings.wallheight/e),n=Math.floor(this.settings.height-(this.height2-o/2));return s&&t%3==0&&(this.ctx.beginPath(),this.ctx.moveTo(t,i),this.ctx.lineTo(t,n),this.ctx.lineWidth=3,this.ctx.strokeStyle=this.settings.floorcolor2,this.ctx.stroke()),n},t.prototype.filterobjectsinrange=function(t,e){for(var i=new Array,s=0;s<e.length;s++)Math.abs(t.x-e[s].x)<this.settings.drawingdistance&&Math.abs(t.y-e[s].y)<this.settings.drawingdistance&&(e[s].angle=o.Angle.normalizeangle(Math.atan2(e[s].y-t.y,e[s].x-t.x)),i.push(e[s]));return i},t.prototype.getobjectstodraw=function(t,e,i,o,n){for(var r=new Array,h=0,l=e;h<l.length;h++){var c=l[h];if(c.distance=a.DistanceCalc.distance(t,c),c.distance<this.settings.drawingdistance&&c.distance<n){c.distance<.2&&(c.distance=.2),i.angle>s.PI1_5&&(i.angle-=s.PI2_0),c.angle>s.PI1_5&&(c.angle-=s.PI2_0);var u=(i.angle-c.angle)/(2*Math.atan2(.05,c.distance));Math.abs(u)<=1&&(u=Math.abs(.5*(u-1)),c.left<0&&(c.left=o,c.starttexture=u),c.width++,c.endtexture=u,r.push(c))}}return r},t.prototype.renderframe=function(t,e,i,s){this.renderbackground(i,s);for(var o=this.filterobjectsinrange(i,e.sprites),r=i.getrays(this.settings.width,this.settings.fov),h=(Math.floor(i.x)+Math.floor(i.y))%2==0,l=0;l<r.length;l++){for(var c=this.settings.height,u=h,d=void 0,g=Math.cos(i.facing.angle-r[l].angle),f=n.Ray.cast(e,i,null,null,r[l],this.settings.drawingdistance),p=0,m=f;p<m.length;p++){var w=m[p],y=a.DistanceCalc.distance(i,w)*g;w.type>0&&(d=y,this.drawwall(l,y,w,i)),c=this.drawfloor(l,y,c,u),u=!u}this.getobjectstodraw(i,o,r[l],l,d)}for(var v=0,x=o;v<x.length;v++){var k=x[v];k.left>=0&&k.render(this.ctx),k.left=-1,k.width=0}},t}();e.Scene=r},function(t,e){"use strict";e.PI0_5=Math.PI/2,e.PI1_0=Math.PI,e.PI1_5=3*Math.PI/2,e.PI2_0=2*Math.PI},function(t,e,i){"use strict";var s=i(4),o=function(){function t(e){this.angle=t.normalizeangle(e),this.sin=Math.sin(e),this.cos=Math.cos(e),this.tg=this.sin/this.cos,this.ctg=this.cos/this.sin,this.dx=this.cos>0?1:0,this.dy=this.sin>0?1:0}return t.normalizeangle=function(t){return t<0&&(t+=s.PI2_0),t>s.PI2_0&&(t-=s.PI2_0),t},t}();e.Angle=o},function(t,e,i){"use strict";var s=i(7),o=i(8),n=function(){function t(){}return t.nearesty=function(t,e){var i=Math.floor(t.y+e.dy);i==t.y&&(i-=1);var s=i-t.y,o=e.ctg*s;return{x:o+t.x,y:i}},t.nearestx=function(t,e){var i=Math.floor(t.x+e.dx);i==t.x&&(i-=1);var s=i-t.x,o=e.tg*s;return{x:i,y:o+t.y}},t.cast=function(e,i,n,a,r,h){if(h<1)return[];var l=n||t.nearesty(i,r),c=a||t.nearestx(i,r),u=s.DistanceCalc.mdistance(i,l),d=s.DistanceCalc.mdistance(i,c);if(u<d){var g=e.getvalue(Math.floor(l.x),l.y-(r.dy>0?0:1));return g>0?[new o.Colision(l.x,l.y,g)]:[new o.Colision(l.x,l.y,g)].concat(t.cast(e,l,null,c,r,h-u))}var g=e.getvalue(c.x-(r.dx>0?0:1),Math.floor(c.y));return g>0?[new o.Colision(c.x,c.y,g)]:[new o.Colision(c.x,c.y,g)].concat(t.cast(e,c,l,null,r,h-d))},t}();e.Ray=n},function(t,e){"use strict";var i=function(){function t(){}return t.distance=function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},t.mdistance=function(t,e){return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)},t}();e.DistanceCalc=i},function(t,e){"use strict";var i=function(){function t(t,e,i){this.x=t,this.y=e,this.type=i}return t}();e.Colision=i},function(t,e){"use strict";var i=function(){function t(){var t=this;this.rotateleft=!1,this.rotateright=!1,this.forward=!1,this.backward=!1,this.run=!1,this.strafeleft=!1,this.straferight=!1,this.mouserotateleft=0,this.mouserotateright=0,this.shoot=!1,this.mousemovefunction=function(e){return t.mousemove(e)}}return t.prototype.mousemove=function(t){t.movementX<0?(this.mouserotateleft=-t.movementX/5,this.mouserotateright=0):t.movementX>0&&(this.mouserotateleft=0,this.mouserotateright=t.movementX/5)},t.prototype.resetmouserotate=function(){this.mouserotateleft=0,this.mouserotateright=0},t.prototype.keydown=function(t){17==t.keyCode&&(this.shoot=!0),37==t.keyCode&&(this.rotateleft=!0),68==t.keyCode&&(this.strafeleft=!0),39==t.keyCode&&(this.rotateright=!0),65==t.keyCode&&(this.straferight=!0),38!=t.keyCode&&87!=t.keyCode||(this.forward=!0),40!=t.keyCode&&83!=t.keyCode||(this.backward=!0),this.run=t.shiftKey},t.prototype.touchstart=function(t,e){var i=t.touches[0];this.touchend(t),i.pageY<.5*e.height?this.shoot=!0:i.pageX<.333*window.innerWidth?this.rotateleft=!0:i.pageX<.666*window.innerWidth?this.forward=!0:this.rotateright=!0,t.preventDefault(),t.stopPropagation()},t.prototype.touchend=function(t){this.rotateleft=!1,this.rotateright=!1,this.forward=!1,t.preventDefault(),t.stopPropagation()},t.prototype.keyup=function(t){37==t.keyCode&&(this.rotateleft=!1),68==t.keyCode&&(this.strafeleft=!1),39==t.keyCode&&(this.rotateright=!1),65==t.keyCode&&(this.straferight=!1),38!=t.keyCode&&87!=t.keyCode||(this.forward=!1),40!=t.keyCode&&83!=t.keyCode||(this.backward=!1),this.run=t.shiftKey},t.prototype.bindevents=function(t,e){var i=this;t.addEventListener("keydown",function(t){return i.keydown(t)},!1),t.addEventListener("keyup",function(t){return i.keyup(t)},!1),t.addEventListener("pointerlockchange",function(s){i.lockChangeAlert(t,e)},!1),t.addEventListener("mozpointerlockchange",function(s){i.lockChangeAlert(t,e)},!1),e.addEventListener("touchstart",function(t){i.touchstart(t,e)},!1),e.addEventListener("touchend",function(t){i.touchend(t)},!1),e.addEventListener("click",function(t){e.requestPointerLock=e.requestPointerLock||e.mozRequestPointerLock,e.requestPointerLock(),i.shoot=!0},!1)},t.prototype.lockChangeAlert=function(t,e){var i=document.getElementById("gamecanvas");t.pointerLockElement===i||document.mozPointerLockElement===e?t.addEventListener("mousemove",this.mousemovefunction,!1):t.removeEventListener("mousemove",this.mousemovefunction,!1)},t}();e.Controls=i},function(t,e,i){"use strict";var s=i(11),o=i(12),n=function(){function t(t,e,i,n){this.map=new Uint8Array(t*t),this.size=t,this.randomize(e),this.sprites=new Array;for(var a=0;a<5*t;a++)this.sprites.push(new s.Sprite(Math.random()*t,Math.random()*t,i.sprites[Math.floor(Math.random()*i.sprites.length)],n));for(var a=0;a<30*t;a++)this.sprites.push(new o.Zombie(Math.random()*t,Math.random()*t,i.zsprites[Math.floor(Math.random()*i.zsprites.length)],n))}return t.prototype.setvalue=function(t,e,i){var s=this.size*e+t;s<this.map.length&&s>=0&&(this.map[this.size*e+t]=i)},t.prototype.getvalue=function(t,e){if(t>=0&&e>=0&&t<this.size&&e<this.size){var i=this.size*e+t;return this.map[i]}return 0},t.prototype.randomize=function(t){for(var e=0;e<this.map.length;e++)Math.random()<t?Math.random()<.1?this.map[e]=5:Math.random()<.1?this.map[e]=4:Math.random()<.3?this.map[e]=3:Math.random()<.5?this.map[e]=2:this.map[e]=1:this.map[e]=0},t}();e.Map=n},function(t,e){"use strict";var i=function(){function t(t,e,i,s){this.x=t,this.y=e,this.image=i,this.left=-1,this.width=0,null!=s&&(this.height2=Math.floor(s.height/2),this.maxheight=s.wallheight)}return t.prototype.render=function(t){var e=Math.ceil(this.maxheight/this.distance),i=Math.floor(this.height2+e/2),s=Math.floor(this.starttexture*this.image.width),o=Math.floor(this.endtexture*this.image.width),n=Math.floor(.4*e),a=Math.max(1,o-s),r=i-n;t.drawImage(this.image,s,0,a,this.image.height,this.left,r,this.width,n)},t}();e.Sprite=i},function(t,e){"use strict";var i=function(){function t(t,e,i,s){this.x=t,this.y=e,this.image=i,this.left=-1,this.width=0,null!=s&&(this.height2=Math.floor(s.height/2),this.maxheight=s.wallheight)}return t.prototype.render=function(t){var e=Math.ceil(this.maxheight/this.distance),i=Math.floor(this.height2+e/2),s=Math.floor(this.starttexture*this.image.width),o=Math.floor(this.endtexture*this.image.width),n=Math.floor(.4*e),a=Math.max(1,o-s),r=i-n;t.drawImage(this.image,s,0,a,this.image.height,this.left,r,this.width,n)},t}();e.Zombie=i},function(t,e,i){"use strict";var s=i(14),o=i(4),n=i(5),a=function(){function t(t,e,i,o){this.x=t,this.y=e,this.facing=i,this.loader=o,this.guncooldown=0,null!=o&&(this.mixer=new s.Mixer(o))}return t.prototype.getrays=function(t,e){for(var i=e/t,s=this.facing.angle+e/2,o=new Array,a=0;a<t;a++)o.push(new n.Angle(s)),s-=i;return o},t.prototype.shoot=function(){var t=(new Date).getTime();this.guncooldown<t&&(this.mixer.playsound(0),this.guncooldown=t+750)},t.prototype.rotateleft=function(t,e){this.facing=new n.Angle(this.facing.angle+Math.PI*e*t/1200)},t.prototype.rotateright=function(t,e){this.facing=new n.Angle(this.facing.angle-Math.PI*e*t/1200)},t.prototype.correctposition=function(t,e){t.getvalue(Math.floor(e.x),Math.floor(this.y))>0&&(e.x=this.x),t.getvalue(Math.floor(this.x),Math.floor(e.y))>0&&(e.y=this.y),this.x=e.x,this.y=e.y},t.prototype.moveforward=function(t,e,i){var s={x:this.x+this.facing.cos*t/(i?250:500),y:this.y+this.facing.sin*t/(i?250:500)};this.correctposition(e,s)},t.prototype.movebackward=function(t,e){this.correctposition(e,{x:this.x-this.facing.cos*t/500,y:this.y-this.facing.sin*t/500})},t.prototype.strafeleft=function(t,e,i){var s=new n.Angle(this.facing.angle-o.PI0_5);this.correctposition(e,{x:this.x+s.cos*t/(i?250:500),y:this.y+s.sin*t/(i?250:500)})},t.prototype.straferight=function(t,e,i){var s=new n.Angle(this.facing.angle+o.PI0_5);this.correctposition(e,{x:this.x+s.cos*t/(i?250:500),y:this.y+s.sin*t/(i?250:500)})},t.prototype.initonmap=function(t){for(;t.getvalue(Math.floor(this.x),Math.floor(this.y))>0;)this.x+=1},t.prototype.getcontrols=function(t,e,i){t.forward&&this.moveforward(i,e,t.run),t.backward&&this.movebackward(i,e),t.rotateleft&&this.rotateleft(i,1),t.rotateright&&this.rotateright(i,1),t.mouserotateleft&&this.rotateleft(i,t.mouserotateleft),t.mouserotateright&&this.rotateright(i,t.mouserotateright),t.strafeleft&&this.strafeleft(i,e,t.run),t.straferight&&this.straferight(i,e,t.run),t.shoot&&(this.shoot(),t.shoot=!1),t.resetmouserotate()},t}();e.Player=a},function(t,e){"use strict";var i=function(){function t(t){this.maxchannels=32,this.loader=t,this.audiochannels=new Array;for(var e=0;e<this.maxchannels;e++)this.audiochannels[e]=new s,this.audiochannels[e].audioel=new Audio,this.audiochannels[e].finish=-1}return t.prototype.playsound=function(t){var e=new Audio(this.loader.soundssrcs[t]);e.play()},t}();e.Mixer=i;var s=function(){function t(){}return t}()},function(t,e){}]);
//# sourceMappingURL=app.bundle.js.map