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
var blueEat;
var redEat;
var reset;
var blueWin;
var redWin;
var intervarl;
var speed;
onload = function () {
	//The size of canvas should be modified in canvas.height, not canvas.style.height
	c.height = height * cellSize;
	c.width = width * cellSize;
	c.style.border = '1px solid #c3c3c3';
	redSnack = new Array;
	blueSnack = new Array;

	document.getElementById('startBtn').addEventListener('click', init);
	document.getElementById('htpBtn').addEventListener('click',function () {
		document.getElementById('readme').style.visibility="visible";
	})
	

};

function init() {	
	var select = document.getElementById('speed').selectedIndex;
	switch (select){
		case 0:speed = 200;break;
		case 1:speed = 500;break;
		case 2:speed = 800;break;
	}
	if (intervarl != undefined){
		window.clearInterval(intervarl);
	}
	resetPosition(5,5);
	intervarl = window.setInterval(gameStep, speed);
}
//A step in game
function gameStep() {

	move();
	draw();
}

function resetPosition(red, blue) {
	var redLength;
	var blueLength;
	if (red == undefined || blue == undefined){		
	 	redLength = redSnack.length;
		blueLength = blueSnack.length;
	} else {
		redLength = red;
		blueLength = blue;
	}
	tempRedDrt = redDrt = direction.Up;
	tempBlueDrt = blueDrt = direction.Down;
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
	draw();
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
	
	checkColl();
	checkWin();
	if (blueWin){
		window.alert("Blue win!");
		window.location.reload();
		blueWin = false;
	}
	if (redWin){
		window.alert("Red win!");
		window.location.reload();
		redWin = false;
	}
	if (blueEat){
		resetPosition(redSnack.length - 1, blueSnack.length + 1);
		blueEat = false;
	}
	if (redEat){
		resetPosition(redSnack.length + 1, blueSnack.length - 1);
		redEat = false;
	}
	if (reset){
		resetPosition();
		reset = false;
	}
		//Move red snack
	var redHead =redSnack[0].clone();
	switch(redDrt){
		case direction.Up: redHead.y -= 1;break;
		case direction.Down: redHead.y += 1;break;
		case direction.Left: redHead.x -= 1;break;
		case direction.Right: redHead.x += 1;break;
	}
	
	//Move blue snack;
	var blueHead =blueSnack[0].clone();
	switch(blueDrt){
		case direction.Up: blueHead.y -= 1;break;
		case direction.Down: blueHead.y += 1;break;
		case direction.Left: blueHead.x -= 1;break;
		case direction.Right: blueHead.x += 1;break;
	}
	
	redSnack.pop();
	redSnack.unshift(redHead);
	blueSnack.pop();
	blueSnack.unshift(blueHead);
	
}

//check if one has eaten other or crash onto the wall
function checkColl(params) {
	var blueHead = blueSnack[0];
	var redHead = redSnack[0];
	// check eat in normal situation
	if (blueSnack.length != 1 && redSnack.length != 1) {
		for (var i = 0; i < redSnack.length; i++) {
			if (blueHead.x == redSnack[i].x && blueHead.y == redSnack[i].y && blueHead != redHead) {
				blueEat = true;
			}
		}

		for (var i = 0; i < blueSnack.length; i++) {
			if (redHead.x == blueSnack[i].x && redHead.y == blueSnack[i].y && redHead != blueHead) {
				redEat = true;
			}
		}
	}
	
	//check eat while one is to die
	else{
		for (var i = 0; i < redSnack.length; i++) {
			if (blueHead.x == redSnack[i].x && blueHead.y == redSnack[i].y) {
				blueEat = true;
			}
		}

		for (var i = 0; i < blueSnack.length; i++) {
			if (redHead.x == blueSnack[i].x && redHead.y == blueSnack[i].y) {
				redEat = true;
			}
		}
		
	}
	
	//check blue wall
	if (blueHead.x == 0){
		if (blueDrt == direction.Left){
			redEat = true;
		}
	}
	if (blueHead.x == width - 1){
		if (blueDrt == direction.Right){
			redEat = true;
		}
	}
	if (blueHead.y == 0){
		if (blueDrt == direction.Up){
			redEat = true;
		}
	}
	if (blueHead.y == height - 1){
		if (blueDrt == direction.Down){
			redEat = true;
		}
	}
	//check red wall
	if (redHead.x == 0){
		if (redDrt == direction.Left){
			blueEat = true;
		}
	}
	if (redHead.x == width - 1){
		if (redDrt == direction.Right){
			blueEat = true;
		}
	}
	if (redHead.y == 0){
		if (redDrt == direction.Up){
			blueEat = true;
		}
	}
	if (redHead.y == height - 1){
		if (redDrt == direction.Down){
			blueEat = true;
		}
	}
	
	//check if they crash in heads
	if (blueHead == redHead){
		reset = true;
	}
}

//check if one has wined
function checkWin() {
	if (redSnack.length == 1 && blueEat){
		blueWin = true;
	}
	if (blueSnack.length == 1 && redEat){
		redWin = true;
	}
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
};

// Clone function for move
//Assigning in js is in reference
Object.prototype.clone = function () {
	var newObj = new Object();
	for (elements in this) {
		newObj[elements] = this[elements];
	}
	return newObj;
};