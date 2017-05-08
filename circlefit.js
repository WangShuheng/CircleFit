var myscore=0;    //store temp score
var max_score=0;    //store this time max score
var time=0;       //time caculate, in order to expand the radius
var flag = false;
var tid;


const angv=1;       //angular velocity
const circle_max_size=150;
const level1=5;
const gameheight=Math.min(document.getElementById("circlefit").clientWidth,document.getElementById("circlefit").clientHeight);
const gamewidth=document.getElementById("circlefit").clientWidth

/*---------------------- mobile -------------------------*/
var tch=document.getElementById("circlefit");
tch.addEventListener('touchstart',function(e){
  e.preventDefault();
  document.getElementById("circlefit").focus();
  if(e.touches.length==1)
  {
    tid=setInterval(function(){
    start();
  },1000);
  }
});
tch.addEventListener('touchend',function(e){
  if(e.touches.length==0)
  {
    score();
    clearInterval(tid);
  }
});

/*-------------------- PC --------------------------*/
tch.addEventListener('mousedown',function(e){
  document.getElementById("circlefit").focus();
  if(e.which==1)
  {
    tid=setInterval(function(){
      start();
    },20)
  }
});
tch.addEventListener('mouseup',function(e){
  if(e.which==1)
  {
    score();
    clearInterval(tid);
  }
});

function start(){
  if(time>=circle_max_size) flag=true;
  if(time<=0) flag=false;
  if(!flag)
  {
    time+=1;
    if(myscore>=level1)
    {
      var randian_start=item._oDrawing._htInfo.startAngle+1;
      var randian_end=item._oDrawing._htInfo.endAngle+1;
      item.set({
        radius : time,
        startAngle : randian_start,
        endAngle : randian_end,
        x : gamewidth/2-time,
        y : gameheight/2-time
      });
    }
    else {
      item.set({
        radius : time,
        x : gamewidth/2-time,
        y : gameheight/2-time
      });
    }
  }
  else {
    time-=1;
    if(myscore>=level1)
    {
      var randian_start=item._oDrawing._htInfo.startAngle+1;
      var randian_end=item._oDrawing._htInfo.endAngle+1;
      item.set({
        radius : time,
        startAngle : randian_start,
        endAngle : randian_end,
        x : gamewidth/2-time,
        y : gameheight/2-time
      });
    }
    else {
      item.set({
        radius : time,
        x : gamewidth/2-time,
        y : gameheight/2-time
      });
    }
  }
}

function next(){
  if(time!=0)
  {
    time=0;
    clearInterval(tid);
  }
  if(myscore>=level1)
  {
    time=0;
    var temp;
    while(true)
    {
      temp = Math.random()*100;
      if(temp>=20) break;
    }
    var target_start,target_end;
    while(true){
      target_start = Math.random()*360;
      target_end = Math.random()*360;
      if((target_end-target_start)>230) break;
    }
    var item_start=target_start+30;
    var item_end=target_end-30;
    target_circle.set({
      radius : temp,
      strokeWidth : Math.random()*10,
      startAngle : target_start,
      endAngle : target_end,
      x : gamewidth/2-temp,
      y : gameheight/2-temp
    });
    item.set({
      radius : 0,
      strokeWidth : 1,
      startAngle : item_start,
      endAngle : item_end,
      x : gamewidth/2,
      y : gameheight/2
    });
  }
  else {
    time=0;
    var temp;
    while(true)
    {
      temp = Math.random()*100;
      if(temp>=20) break;
    }
    target_circle.set({
      radius : temp,
      strokeWidth : Math.random()*10,
      startAngle : 0,
      endAngle : 360,
      x : gamewidth/2-temp,
      y : gameheight/2-temp
    });
    item.set({
      radius : 0,
      strokeWidth : 1,
      startAngle : 0,
      endAngle : 360,
      x : gamewidth/2,
      y : gameheight/2
    })
  }

}

function score(){
  if((Math.abs(item._oDrawing._htInfo.radius-target_circle._oDrawing._htInfo.radius)<=target_circle._oDrawing._htInfo.strokeWidth)&&((item._oDrawing._htInfo.startAngle%361)>=target_circle._oDrawing._htInfo.startAngle)&&((item._oDrawing._htInfo.endAngle%361)<=target_circle._oDrawing._htInfo.endAngle))
  {
    myscore+=1;
    document.getElementById("score").value=myscore;
    next();
  }
  else
  {
    if(max_score<myscore) max_score=myscore
    document.getElementById("score").value="LOSE! MaxScore="+max_score;
    myscore=0;
    next();
  }
}

var layer = new collie.Layer({
    width : gamewidth,
    height : gameheight
});

var target_circle = new collie.Circle({
  radius : 100,
  strokeWidth : 10,
  startAngle : 0,
  endAngle : 360,
  x : gamewidth/2-100,
  y : gameheight/2-100
}).addTo(layer);

var item = new collie.Circle({
    radius : 0,
    strokeWidth : 1,
    startAngle : 0,
    endAngle : 360,
    x : gamewidth/2,
    y : gameheight/2
}).addTo(layer);
collie.Renderer.addLayer(layer);
collie.Renderer.load(document.getElementById("circlefit"));
collie.Renderer.start();
