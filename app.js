
var cvs =document.getElementById("canvas");
var ctx =cvs.getContext("2d");
var snakeH=15;
var snakeW=15;
let score=0;
let isPaused=true;
const foodImg=new Image();
foodImg.src="fruit.png";



function drawSnake(x,y){

if(x==snake[0].x&&y==snake[0].y)
{

ctx.fillStyle="yellow";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)
ctx.fillStyle="black";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
}
else
{ctx.fillStyle="darkgreen";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)
ctx.fillStyle="black";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
}

}
var len =4;

snake=[];
for(var i=len-1;i>=0;i--)
{
snake.push({
x:i,
y:0
})
}
for(i=len-1;i>=0;i--)
{
drawSnake(i,0)
}



//control dir
let dir=' ';
document.addEventListener("keydown",dirControl)
function dirControl(e){
if(e.keyCode==37 && dir!="right"){
dir="left";
isPaused = false;
}else if(e.keyCode==38 && dir!="down"){
dir="up";
 isPaused = false;
}else if(e.keyCode==39 && dir!="left"){
dir="right";
 isPaused = false;
}else if(e.keyCode==40 && dir!="up"){
dir="down"; 
 isPaused = false;
}else if (e.keyCode == 80) {
	isPaused = true;
}
else if (e.keyCode== 82) {
	isPaused = false;
}

}
//create food
var food={
 x:Math.round(Math.random()*(cvs.width/snakeW-4)+1),
 y:Math.round(Math.random()*(cvs.height/snakeH-4)+1)
}
//draw food
function drawFood(x,y){
//ctx.fillStyle="red";
ctx.drawImage(foodImg,x*snakeH,y*snakeH,22,22);
//ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)
}







function draw(){
	
	if(isPaused == false) {
		
		ctx.clearRect(0,0,cvs.width,cvs.height);
		for(var i=0;i<snake.length;i++)
		{
			var X=snake[i].x;
			var Y=snake[i].y;
			drawSnake(X,Y)
		}
		drawFood(food.x,food.y);
		var snakeX =snake[0].x;
		var snakeY =snake[0].y;
		if(snakeX<0||snakeY<0||snakeX>=cvs.width/snakeW||snakeY>=cvs.height/snakeH)
		{
			clearInterval(canvas);
			setTimeout(function () {
				alert("you hit the wall");
			}, 10);
			localStorage.clear();
			location.reload();
		}
		else if (checkBodyCollision()) {
			   clearInterval(canvas);
			   setTimeout(function () {
					alert("You ran into your body");
				}, 10);
				localStorage.clear();
			   location.reload();
			}
			function checkBodyCollision() {
			for (let i = 1; i < snake.length; i++) {
			   if (snakeX == snake[i].x && snakeY == snake[i].y) {
				   return true;
				}
			}
		   return false;
		}

		if(dir=="right"){snakeX++}
		else if(dir=="left"){snakeX--}
		else if(dir=="down"){snakeY++}
		else if(dir=="up"){snakeY--}

		if(snakeX==food.x && snakeY==food.y){
		score+=10;
		document.getElementById('score').textContent = 'Score: ' + `${+score}`;
		food={
		 x:Math.round(Math.random()*(cvs.width/snakeW-4)+1),
		 y:Math.round(Math.random()*(cvs.height/snakeH-4)+1)
		}
		var newHead= {
		x:snakeX,
		y:snakeY
		}
		}
		else{
		snake.pop();
		var newHead= {
		x:snakeX,
		y:snakeY
		}
		}


		snake.unshift(newHead);
	}
	
}
setInterval(draw,60)
draw();


