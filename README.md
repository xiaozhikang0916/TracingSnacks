# TracingSnacks
It is a douple players game with 2 snacks tracing and trying to eat each other.
Implemented in Javascript.

You can play this game [here](http://xiaozhikang0916.github.io/TracingSnacks/).
[GitHub page](https://github.com/xiaozhikang0916/TracingSnacks).

## How to play
* Select a game speed below you want, and click `Start` button to start the game.
* Player1 should use `W` `S` `A` `D` buttons to control the red snack.
* Player2 should use `Arrow buttons` to control the blue snack.

## Game rules
1. Each snack has the length of 5 at the beginning.
2. If one snack eat the other at the body **but not the head**, it's length will grow by 1.
3. You can eat the other snack at the head only when he has the length of 1.
4. If one snack crash onto the wall, if would be the same as that it's eaten by the other.
5. One snack with it's length decreased to 0 will lose.

## Implementation details
The game would be started by the function `inti()`, which will set the speed of the game and set a interval to call the function `gameStep()` periodically to make the game move on.

Funtion `gameStep()` would call 2 functions `move()` and `draw()`.

In the function `move()`, the game will first check if the players have changed the moving direction of the snacks.
And then check if one snack has ate another or crash onto the wall and if one has already won.

* If one of the players won 1 points, `move()` would call the function `resetPosition()` to reset the position of 2 snacks and change their lengths.
* If one of the players has already won, this function will show a dialog window to show the result and reload the page.

Funtion `draw()` is called to draw each frame of the game. It would firstly clear all the pixels in the canvas and the draw every cells of the tow snacks.

Function `checkColl()` will check if one snack was eating another or crash onto the wall.

Function `checkWin()` will check if one snack was already won and change the flag.
