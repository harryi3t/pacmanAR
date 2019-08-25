// How to load in modules
const Animation = require('Animation');
const Time = require('Time');
const console = require('Diagnostics');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const myPlane = Scene.root.find('plane0');
const placer = Scene.root.find('placer');
const pacman = Scene.root.find('pacman');
const label = Scene.root.find('label');
const Patches = require('Patches');
const arrowUp = Scene.root.find('arrowUp');
const arrowDown = Scene.root.find('arrowDown');
const arrowRight = Scene.root.find('arrowRight');
const arrowLeft = Scene.root.find('arrowLeft');
const Audio = require('Audio');
const playbackController = Audio.getPlaybackController('moveSound');

const startTime = Date.now();

let direction = 'left',
    velocity = 0.025;

function paintNextFrame() {
  let lastX = pacman.transform.x.pinLastValue(),
      lastY = pacman.transform.y.pinLastValue(),
      newX = lastX,
      newY = lastY;

  switch (direction) {
    case 'left':
      newX = lastX - velocity;
      break;
    case 'right':
      newX = lastX + velocity;
      break;
    case 'top':
      newY = lastY + velocity;
      break;
    case 'down':
      newY = lastY - velocity;
      break;
  }

  // detect the boundary
  if (newX > 0.5 || newX < -0.5 || newY > 0.5 || newY < -0.5) {
    playbackController.setPlaying(false);
    playbackController.setLooping(false);
    return;
  }

  if (Date.now() - startTime >= 4000) {
    playbackController.setPlaying(true);
    playbackController.setLooping(true);
  }

  pacman.transform.x = newX;
  pacman.transform.y = newY;
}

TouchGestures.onTap(arrowLeft).subscribe(() => {
  console.log('left');
  direction = 'left';
});

TouchGestures.onTap(arrowRight).subscribe(() => {
  console.log('right');
  direction = 'right';
});

TouchGestures.onTap(arrowDown).subscribe(() => {
  console.log('down');
  direction = 'down';
});

TouchGestures.onTap(arrowUp).subscribe(() => {
  console.log('top');
  direction = 'top';
});


Time.setTimeout(() => {
  const intervalTimer = Time.setInterval(paintNextFrame, 125);

  // function stopIntervalTimer() {
  //   Time.clearInterval(intervalTimer);
  // }
}, 1000);

// TouchGestures.onTap(myPlane).subscribe(function (gesture) {
//   console.log(gesture)
// });

TouchGestures.onPinch(myPlane).subscribe(function (gesture) {

  // Store the last known x and y-axis scale values of the plane
  const lastScaleX = placer.transform.scale.x.pinLastValue();
  const lastScaleY = placer.transform.scale.y.pinLastValue();

  // Update the scale of the plane by multiplying the last known scale with the
  // scale returned by the gesture
  placer.transform.scaleX = gesture.scale.mul(lastScaleX);
  placer.transform.scaleY = gesture.scale.mul(lastScaleY);

});