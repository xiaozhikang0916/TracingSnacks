// Size of the game panel
var width = 72;
var height = 36;
var cellSize = 8;
var game;
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
	var c = document.getElementById('gameCanvas');
	c.style.height = height * cellSize + 'px';
	c.style.width = width * cellSize + 'px';
	c.style.border = '1px solid #c3c3c3';
	game = c.getContext('2d');
	redSnack = new Array;
	blueSnack = new Array;
}

function refreshPosition(length1 = 0, length2 = 0) {
	var redLength;
	var blueLength;
	if (length1 == 0 || length2 == 0){		
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