var width = 72;
var height = 36;
var cellSize = 8;
onload = function () {
	var c = document.getElementById('gameCanvas');
	c.style.height = height * cellSize + 'px';
	c.style.width = width * cellSize + 'px';
	c.style.border = '1px solid #c3c3c3';
	var game = c.getContext('2d');
	
}