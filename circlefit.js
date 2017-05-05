window.onload=function(){
  document.onkeydown = start
  document.onkeyup = score
  document.onkeypress = start
}
var myscore=0;    //store temp score
var max_score=0;    //store this time max score
var time=0;       //time caculate, in order to expand the radius
var flag = false;

const angv=1;       //angular velocity
const circle_max_size=150;
const level1=5;



function start(e){
  keynum=window.event? e.keyCode:e.which;
  if(keynum==32)
  {
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
          x : 250-time,
          y : 250-time
        });
      }
      else {
        item.set({
          radius : time,
          x : 250-time,
          y : 250-time
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
          x : 250-time,
          y : 250-time
        });
      }
      else {
        item.set({
          radius : time,
          x : 250-time,
          y : 250-time
        });
      }
    }

  }
}

function next(){
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
      x : 250-temp,
      y : 250-temp
    });
    item.set({
      radius : 0,
      strokeWidth : 1,
      startAngle : item_start,
      endAngle : item_end,
      x : 250,
      y : 250
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
      x : 250-temp,
      y : 250-temp
    });
    item.set({
      radius : 0,
      strokeWidth : 1,
      startAngle : 0,
      endAngle : 360,
      x : 250,
      y : 250
    })
  }

}

function score(e){
  keynum=window.event? e.keyCode:e.which;
  if(keynum==32)
  {
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
}

var layer = new collie.Layer({
    width : 500,
    height : 500
});

var target_circle = new collie.Circle({
  radius : 100,
  strokeWidth : 10,
  x : 150,
  y : 150
}).addTo(layer);

var item = new collie.Circle({
    radius : 0,
    strokeWidth : 1,
    x : 250,
    y : 250
}).addTo(layer);
collie.Renderer.addLayer(layer);
collie.Renderer.load(document.getElementById("circlefit"));
collie.Renderer.start();
