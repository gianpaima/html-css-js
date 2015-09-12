var eye = function(x, y){
	this.x = x;
	this.y = y;
	
	this.lastBlink = 0;
	this.eyeExposure = { current: 0, target: 1 };
	this.radius = 160;
}

var canvas, ctx, newEye;
var mouseX = 0;
var mouseY = 0;
var mouseIsDown = false;

var init = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
  
  window.addEventListener("resize", windowResize, false);	
  windowResize();
  
  document.addEventListener("mousemove", mouseMove, false);  
  document.addEventListener("mousedown", function(){ mouseIsDown = true; }, false);
  document.addEventListener("mouseup", function(){ mouseIsDown = false; }, false);

  setInterval(bezierEye, 1000/24);
}

var bezierEye = function(){

	ctx.clearRect(newEye.x - newEye.radius, newEye.y - newEye.radius, newEye.radius * 2, newEye.radius * 2);

  var time = new Date();
			
			if( newEye.eyeExposure.current < 0.5 ) { 
				newEye.eyeExposure.target = 1;
			}
			else if( Math.random() > 0.98 && time.getTime() - newEye.lastBlink > 1000 ) { 
				newEye.eyeExposure.target = 0;
				newEye.lastBlink = time.getTime();
			}

	newEye.eyeExposure.current += ( newEye.eyeExposure.target - newEye.eyeExposure.current ) * 0.3; 

	
  var el = {x: newEye.x - (newEye.radius * .8), y: newEye.y};
  var er = {x: newEye.x + (newEye.radius * .8), y: newEye.y};
  
  var et = {x: newEye.x, y: newEye.y - (newEye.radius * (newEye.eyeExposure.current - 0.5))}; 
  var eb = {x: newEye.x, y: newEye.y + (newEye.radius * (newEye.eyeExposure.current - 0.5))};

  var ei = { x: newEye.x, y: newEye.y};
  var eio = { 
				x: ( mouseX - ei.x ) / canvas.width, 
				y: ( mouseY - ei.y ) /canvas.height
			};

	ei.x += eio.x * 80;
	ei.y += eio.y * 40;

	ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,1.0)';
	ctx.strokeStyle = 'rgba(100,100,100,1.0)';
	ctx.beginPath();
	ctx.lineWidth = 5;
	ctx.lineJoin = 'round';
	ctx.moveTo( el.x, el.y );
	ctx.quadraticCurveTo( et.x, et.y, er.x, er.y );
	ctx.quadraticCurveTo( eb.x, eb.y, el.x, el.y );
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();

	ctx.save();	
	ctx.globalCompositeOperation = 'source-atop';
	ctx.strokeStyle = 'rgba(0,0,0,0.5)';
	ctx.fillStyle = 'rgba(120,0,0,0.9)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(ei.x, ei.y, newEye.radius/4 , 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
	ctx.strokeStyle = 'rgba(0,0,0,0.4)';
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.arc(ei.x, ei.y, newEye.radius/6 , 0, Math.PI*2, true);
	ctx.stroke();
  ctx.restore();	

  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
	ctx.fillStyle = 'rgba(0,0,0,0.9)';
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(ei.x, ei.y, newEye.radius/15 , 0, Math.PI*2, true);
	ctx.fill();
	ctx.stroke();
  ctx.restore();

  for(var i=0; i<3; i+=1){
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    
    ctx.translate(ei.x, ei.y)
      if(mouseIsDown){
        ctx.rotate( -4 * Math.PI * (time.getSeconds() + time.getMilliseconds()/1000) ); 
      }
    ctx.fillStyle = 'rgba(0,0,0,0.9)';

    ctx.beginPath();
    var cx = newEye.radius/6 * Math.sin(2*Math.PI/3 * i);
    var cy = newEye.radius/6 * Math.cos(2*Math.PI/3 * i);
    ctx.arc(cx, cy, newEye.radius/24 , 0, Math.PI*2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + (newEye.radius/24 * Math.sin(2*Math.PI/3 * i)), cy + (newEye.radius/24 * Math.cos(2*Math.PI/3 * i)));
    
    ctx.quadraticCurveTo(newEye.radius/4.2 * Math.sin(2*Math.PI/3 * i + Math.PI/24), newEye.radius/4.2 * Math.cos(2*Math.PI/3 * i + Math.PI/24), newEye.radius/4 * Math.sin(2*Math.PI/3 * i), newEye.radius/4 * Math.cos(2*Math.PI/3 * i));
    
    ctx.quadraticCurveTo(newEye.radius/4.2 * Math.sin(2*Math.PI/3 * i + Math.PI/18), newEye.radius/4.2 * Math.cos(2*Math.PI/3 * i + Math.PI/18), cx + (newEye.radius/24 * Math.sin(2*Math.PI/3 * i + Math.PI/2)), cy + (newEye.radius/24 * Math.cos(2*Math.PI/3 * i + Math.PI/2)));
    
    ctx.fill();
    ctx.restore();
  }
}
var windowResize = function(){	
	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;
  newEye = new eye(canvas.width/2, canvas.height/2);
}
	
var mouseMove = function(evt){	
	mouseX = evt.pageX;
	mouseY = evt.pageY;
	}

window.onload = init;