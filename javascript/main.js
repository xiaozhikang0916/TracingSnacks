// Size of the game panel
var width = 72;
var height = 36;
var cellSize = 8;
var c = document.getElementById('gameCanvas');
// Direction
var direction = {'Up' : 1,
	'Down' : 2,
	'Left' : 3,
	'Right' : 4 };
// Info of the snacks
var snackSize = 5;
//Array of the snacks, head is the first element
var redSnack;
var blueSnack;
var redDrt = direction.Up;
var blueDrt = direction.Down;

onload = function () {
//	c.style.height = height * cellSize + 'px';
//	c.style.width = width * cellSize + 'px';
	c.style.height = 800 + 'px';
	c.style.width = 800 + 'px';
	c.style.border = '1px solid #c3c3c3';
	redSnack = new Array;
	blueSnack = new Array;
	resetPosition(5,5);
	draw();
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
		redSnack.push({ 'x' : x*cellSize, 
			'y' : y*cellSize});
			y += 1;
	}
	//Reset blue
	x = width;
	y = blueLength - 1;
	for (var i = 0; i < blueLength; i++){
		blueSnack.push({ 'x' : x*cellSize, 
			'y' : y*cellSize});
			y -= 1;
	}
}

//function to draw frame of the game
function draw() {
	var game = c.getContext('2d');
	//clear the canvas before a new frame
//	game.clearRect(0, 0, width * cellSize, height * cellSize);
	
	//draw red snack
	game.fillStyle = "#ff0000";
	//game.strokeStyle = "#ff0000";
	for (var i = 0; i < redSnack.length; i++){
		var point = redSnack[i];
		console.log(point.x + ' ' + point.y);
		game.fillRect(point.x, point.y, cellSize, cellSize);
		game.fillRect(20,100,5,5);
	}
	
	//draw blue snack
	game.fillStyle = "#0088ff";
	game.strokeStyle = "#0088ff";
	for (var i = 0; i < blueSnack.length; i++){
		game.fillRect(blueSnack[i]['x'], blueSnack[i]['y'], cellSize, cellSize);
	}
	
}