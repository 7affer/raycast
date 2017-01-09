!function(t){function e(o){if(i[o])return i[o].exports;var n=i[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){i(1),t.exports=i(11)},function(t,e,i){"use strict";function o(t){t.width=g.width,t.height=g.height,t.style.width=g.width+"px",t.style.height=g.height+"px",v.bindevents(document,t)}var n=i(2),s=i(6),r=i(7),a=i(8),h=i(9),c=document.getElementById("gamecanvas"),f=document.getElementById("fps"),u=c.getContext("2d"),l=new a.Map(100);l.randomize(.3);for(var g={width:800,height:600,fov:70*Math.PI/180,drawingdistance:30},y={renderfps:function(t){f.innerText=Math.floor(t).toString()}},p={x:l.size/2+.25,y:l.size/2+.25};l.getvalue(Math.floor(p.x),Math.floor(p.y))>0;)p.x+=1;var d=new h.Player(p,new r.Angle(0),g.fov),v=new s.Controls,m=new n.Scene(u,l,d,v,g,y);o(c),m.render()},function(t,e,i){"use strict";var o=i(3),n=i(5),s=function(){function t(t,e,i,o,n,s){this.ctx=t,this.map=e,this.player=i,this.controls=o,this.settings=n,this.events=s,this.lastrender=Date.now(),this.height2=Math.floor(n.height/2),this.wallheight=Math.floor(.8*n.height)}return t.prototype.renderbackground=function(){this.ctx.fillStyle="#ffffff",this.ctx.fillRect(0,0,this.settings.width,this.settings.height),this.ctx.fillStyle="#000000",this.ctx.fillRect(0,this.height2,this.settings.width,this.height2)},t.prototype.renderwall=function(t,e){var i=Math.ceil(this.wallheight/e),o=Math.floor(255-10*e),n=o.toString(16).toLowerCase(),s=Math.floor(this.height2-i/2);this.ctx.beginPath(),this.ctx.moveTo(t,s),this.ctx.lineTo(t,this.settings.height-s),this.ctx.lineWidth=2,this.ctx.strokeStyle="#"+n+n+n,this.ctx.stroke()},t.prototype.render=function(){var t=this,e=Date.now(),i=e-this.lastrender;this.lastrender=e,this.events.renderfps(Math.floor(1e3/i)),this.renderbackground(),this.player.getcontrols(this.controls,this.map,i);for(var s=this.player.getrays(this.settings.width),r=0;r<s.length;r++)for(var a=o.Ray.cast(this.map,this.player.position,null,null,s[r],this.settings.drawingdistance),h=0;h<a.length;h++)if(a[h].type>0){var c=n.DistanceCalc.getdistance(this.player.position,a[h].point),f=c*Math.cos(this.player.facing.angle-s[r].angle);this.renderwall(r,f);break}requestAnimationFrame(function(){return t.render()})},t}();e.Scene=s},function(t,e,i){"use strict";var o=i(4),n=function(){function t(){}return t.nearesty=function(t,e){var i=Math.floor(t.y+e.dy);i==t.y&&(i-=1);var o=i-t.y,n=e.ctg*o;return{x:n+t.x,y:i,manhattandistance:Math.abs(n)+Math.abs(o)}},t.nearestx=function(t,e){var i=Math.floor(t.x+e.dx);i==t.x&&(i-=1);var o=i-t.x,n=e.tg*o;return{x:i,y:n+t.y,manhattandistance:Math.abs(o)+Math.abs(n)}},t.cast=function(e,i,n,s,r,a){if(a<1)return[];var h=n||t.nearesty(i,r),c=s||t.nearestx(i,r);return h.manhattandistance<c.manhattandistance?(c.manhattandistance-=h.manhattandistance,[new o.Colision(h,e.getvalue(Math.floor(h.x),h.y-(r.dy>0?0:1)))].concat(t.cast(e,h,null,c,r,a-h.manhattandistance))):(h.manhattandistance-=c.manhattandistance,[new o.Colision(c,e.getvalue(c.x-(r.dx>0?0:1),Math.floor(c.y)))].concat(t.cast(e,c,h,null,r,a-c.manhattandistance)))},t}();e.Ray=n},function(t,e){"use strict";var i=function(){function t(t,e){this.point=t,this.type=e}return t}();e.Colision=i},function(t,e){"use strict";var i=function(){function t(){}return t.getdistance=function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},t}();e.DistanceCalc=i},function(t,e){"use strict";var i=function(){function t(){var t=this;this.rotateleft=!1,this.rotateright=!1,this.forward=!1,this.backward=!1,this.run=!1,this.strafeleft=!1,this.straferight=!1,this.mouserotateleft=!1,this.mouserotateright=!1,this.mousemovefunction=function(e){return t.mousemove(e)}}return t.prototype.mousemove=function(t){t.movementX<0?(this.mouserotateleft=!0,this.mouserotateright=!1):t.movementX>0&&(this.mouserotateleft=!1,this.mouserotateright=!0)},t.prototype.resetmouserotate=function(){this.mouserotateleft=!1,this.mouserotateright=!1},t.prototype.keydown=function(t){37==t.keyCode&&(this.rotateleft=!0),68==t.keyCode&&(this.strafeleft=!0),39==t.keyCode&&(this.rotateright=!0),65==t.keyCode&&(this.straferight=!0),38!=t.keyCode&&87!=t.keyCode||(this.forward=!0),40!=t.keyCode&&83!=t.keyCode||(this.backward=!0),this.run=t.shiftKey},t.prototype.keyup=function(t){37==t.keyCode&&(this.rotateleft=!1),68==t.keyCode&&(this.strafeleft=!1),39==t.keyCode&&(this.rotateright=!1),65==t.keyCode&&(this.straferight=!1),38!=t.keyCode&&87!=t.keyCode||(this.forward=!1),40!=t.keyCode&&83!=t.keyCode||(this.backward=!1),this.run=t.shiftKey},t.prototype.bindevents=function(t,e){var i=this;t.addEventListener("keydown",function(t){return i.keydown(t)},!1),t.addEventListener("keyup",function(t){return i.keyup(t)},!1),t.addEventListener("pointerlockchange",function(o){i.lockChangeAlert(t,e)},!1),e.addEventListener("click",function(t){e.requestPointerLock=e.requestPointerLock,e.requestPointerLock()},!1)},t.prototype.lockChangeAlert=function(t,e){var i=document.getElementById("gamecanvas");t.pointerLockElement===i?t.addEventListener("mousemove",this.mousemovefunction,!1):t.removeEventListener("mousemove",this.mousemovefunction,!1)},t}();e.Controls=i},function(t,e){"use strict";var i=function(){function t(t){this.angle=t,this.sin=Math.sin(t),this.cos=Math.cos(t),this.tg=this.sin/this.cos,this.ctg=this.cos/this.sin,this.dx=this.cos>0?1:0,this.dy=this.sin>0?1:0}return t}();e.Angle=i},function(t,e){"use strict";var i=function(){function t(t){this.map=new Uint8Array(t*t),this.size=t}return t.prototype.setvalue=function(t,e,i){var o=this.size*e+t;o<this.map.length&&o>=0&&(this.map[this.size*e+t]=i)},t.prototype.getvalue=function(t,e){if(t>=0&&e>=0&&t<this.size&&e<this.size){var i=this.size*e+t;return this.map[i]}return 0},t.prototype.randomize=function(t){for(var e=0;e<this.map.length;e++)this.map[e]=Math.random()<t?1:0},t}();e.Map=i},function(t,e,i){"use strict";var o=i(10),n=i(7),s=function(){function t(t,e,i){this.position=t,this.facing=e,this.fov=i}return t.prototype.getrays=function(t){for(var e=this.fov/t,i=this.facing.angle+this.fov/2,o=new Array,s=0;s<t;s++)o.push(new n.Angle(i)),i-=e;return o},t.prototype.rotateleft=function(t){this.facing=new n.Angle(this.facing.angle+Math.PI*t/1200)},t.prototype.rotateright=function(t){this.facing=new n.Angle(this.facing.angle-Math.PI*t/1200)},t.prototype.moveforward=function(t,e,i){var o={x:this.position.x+this.facing.cos*t/(i?250:500),y:this.position.y+this.facing.sin*t/(i?250:500)};0==e.getvalue(Math.floor(o.x),Math.floor(o.y))?this.position=o:0==e.getvalue(Math.floor(o.x),Math.floor(this.position.y))?(o.y=this.position.y,this.position=o):0==e.getvalue(Math.floor(this.position.x),Math.floor(o.y))&&(o.x=this.position.x,this.position=o)},t.prototype.movebackward=function(t,e){var i={x:this.position.x-this.facing.cos*t/500,y:this.position.y-this.facing.sin*t/500};0==e.getvalue(Math.floor(i.x),Math.floor(i.y))?this.position=i:0==e.getvalue(Math.floor(i.x),Math.floor(this.position.y))?(i.y=this.position.y,this.position=i):0==e.getvalue(Math.floor(this.position.x),Math.floor(i.y))&&(i.x=this.position.x,this.position=i)},t.prototype.strafeleft=function(t,e,i){var s=new n.Angle(this.facing.angle-o.PI0_5),r={x:this.position.x+s.cos*t/(i?250:500),y:this.position.y+s.sin*t/(i?250:500)};0==e.getvalue(Math.floor(r.x),Math.floor(r.y))&&(this.position=r)},t.prototype.straferight=function(t,e,i){var s=new n.Angle(this.facing.angle+o.PI0_5),r={x:this.position.x+s.cos*t/(i?250:500),y:this.position.y+s.sin*t/(i?250:500)};0==e.getvalue(Math.floor(r.x),Math.floor(r.y))&&(this.position=r)},t.prototype.getcontrols=function(t,e,i){t.forward&&this.moveforward(i,e,t.run),t.backward&&this.movebackward(i,e),(t.rotateleft||t.mouserotateleft)&&this.rotateleft(i),(t.rotateright||t.mouserotateright)&&this.rotateright(i),t.strafeleft&&this.strafeleft(i,e,t.run),t.straferight&&this.straferight(i,e,t.run),t.resetmouserotate()},t}();e.Player=s},function(t,e){"use strict";e.PI0_5=Math.PI/2,e.PI1_0=Math.PI,e.PI1_5=3*Math.PI/2,e.PI2_0=2*Math.PI},function(t,e){}]);
//# sourceMappingURL=app.bundle.js.map