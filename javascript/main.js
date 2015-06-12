// Size of the game panel
var width = 72;
var height = 36;
var cellSize = 8;
var c = document.getElementById('gameCanvas');
// Direction
var direction = {'Left' : 1,
	'Up' : 2,
	'Right' : 3,
	'Down' : 4 };
// Info of the snacks
var snackSize = 5;
//Array of the snacks, head is the first element
var redSnack;
var blueSnack;
var redDrt = direction.Up;
var tempRedDrt = direction.Up;
var blueDrt = direction.Down;
var tempBlueDrt = direction.Down;

onload = function () {
	//The size of canvas should be modified in canvas.height, not canvas.style.height
	c.height = height * cellSize;
	c.width = width * cellSize;
	c.style.border = '1px solid #c3c3c3';
	redSnack = new Array;
	blueSnack = new Array;
	resetPosition(5,5);
	var intervarl = window.setInterval(gameStep, 500);

}

//A step in game
function gameStep() {
	draw();
	move();
}

function resetPosition(length1, length2) {
	var redLength;
	var blueLength;
	if (length1 == undefined || length2 == undefined){		
	 	redLength = redSnack.length;
		blueLength = blueSnack.length;
	} else {
		redLength = length1;
		blueLength = length2;
	}
	redDrt = direction.Up;
	blueDrt = direction.Down;
	redSnack = new Array;
	blueSnack = new Array;
	var x;
	var y;
	//Reset the position of the red snack
	//x and y is in cell
	x = 0;
	y = height - redLength;
	for (var i = 0; i < redLength; i++){
		redSnack.push({ 'x' : x, 
			'y' : y});
			y += 1;
	}
	//Reset blue
	x = width - 1;
	y = blueLength - 1;
	for (var i = 0; i < blueLength; i++){
		blueSnack.push({ 'x' : x, 
			'y' : y});
			y -= 1;
	}
}

//function to draw frame of the game
function draw() {
	var game = c.getContext('2d');
	//clear the canvas before a new frame
	game.clearRect(0, 0, width * cellSize, height * cellSize);
	
	//draw red snack
	game.fillStyle = "#ff0000";
	//game.strokeStyle = "#ff0000";
	for (var i = 0; i < redSnack.length; i++){
		var point = redSnack[i];
//		console.log(point.x + ' ' + point.y);
		game.fillRect(point.x * cellSize, point.y * cellSize, cellSize, cellSize);
	}
	
	//draw blue snack
	game.fillStyle = "#0088ff";
	game.strokeStyle = "#0088ff";
	for (var i = 0; i < blueSnack.length; i++){
		var point = blueSnack[i];
		console.log(point.x + ' ' + point.y);
		game.fillRect(point.x * cellSize, point.y * cellSize, cellSize, cellSize);
	}
	
}

function move() {
	//chack if the direction is changed and legal
	if (Math.abs(tempBlueDrt - blueDrt) != 2){
		blueDrt = tempBlueDrt;
	}
	if (Math.abs(tempRedDrt - redDrt) != 2){
		redDrt = tempRedDrt;
	}
	//Move red snack
	var redHead =redSnack[0].clone();
	switch(redDrt){
		case direction.Up: redHead.y -= 1;break;
		case direction.Down: redHead.y += 1;break;
		case direction.Left: redHead.x -= 1;break;
		case direction.Right: redHead.x += 1;break;
	}
	redSnack.pop();
	redSnack.unshift(redHead);
	
	//Move blue snack;
	var blueHead =blueSnack[0].clone();
	switch(blueDrt){
		case direction.Up: blueHead.y -= 1;break;
		case direction.Down: blueHead.y += 1;break;
		case direction.Left: blueHead.x -= 1;break;
		case direction.Right: blueHead.x += 1;break;
	}
	blueSnack.pop();
	blueSnack.unshift(blueHead);
	
}

//Key listener
document.onkeydown = function (e) {
	var key = window.event ? e.keyCode : e.which;
	if (key <= 40) {
		switch (key) {
			case 37: tempBlueDrt = direction.Left; break;
			case 38: tempBlueDrt = direction.Up; break;
			case 39: tempBlueDrt = direction.Right; break;
			case 40: tempBlueDrt = direction.Down; break;
		}
	}

	else {
		var keychar = String.fromCharCode(key);
		switch (keychar) {
			case 'A': tempRedDrt = direction.Left; break;
			case 'W': tempRedDrt = direction.Up; break;
			case 'D': tempRedDrt = direction.Right; break;
			case 'S': tempRedDrt = direction.Down; break;
		}

	}
}

// Clone function for move
//Assigning in js is in reference
Object.prototype.clone=function(){
var newObj = new Object();
for(elements in this){
newObj[elements] = this[elements];
}
return newObj;
}