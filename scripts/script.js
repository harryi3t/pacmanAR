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

let velocityX = -0.1,
    velocityY = 0;

function paintNextFrame() {
  let lastX = pacman.transform.x.pinLastValue(),
      lastY = pacman.transform.y.pinLastValue(),

      newX = lastX + velocityX,
      newY = lastY + velocityY;

  // detect the boundary
  if (newX > 0.5 || newX < -0.5 || newY > 0.5 || newY < -0.5) {
    return;
  }

  pacman.transform.x = newX;
  pacman.transform.y = newY;
}

Time.setTimeout(() => {
  const intervalTimer = Time.setInterval(paintNextFrame, 500);

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

TouchGestures.onPan(myPlane).subscribe(function (gesture) {
  let x = gesture.location.x.pinLastValue(),
        y = gesture.location.y.pinLastValue();

    const gestureTransform = Scene.unprojectToFocalPlane(gesture.location),
          x2 = gestureTransform.x.pinLastValue(),
          y2 = gestureTransform.y.pinLastValue();

    // console.log(`pan 0 (${x},${y}) (${x2},${y2})`)

    const offset = Patches.getVectorValue('offset'),
          offX = offset.x.pinLastValue(),
          offY = offset.y.pinLastValue(),
          pos = Patches.getVectorValue('pos'),
          posX = pos.x.pinLastValue(),
          posY = pos.y.pinLastValue()

console.log(`offset 0ms (${offX},${offY})`)
console.log(`pos 0ms (${posX},${posY})`)

  Time.setTimeout(() => {
    let x = gesture.location.x.pinLastValue(),
        y = gesture.location.y.pinLastValue();

    const gestureTransform = Scene.unprojectToFocalPlane(gesture.location),
          x2 = gestureTransform.x.pinLastValue(),
          y2 = gestureTransform.y.pinLastValue();

    const offset = Pa
          offX = offset.x.pinLastValue(),
          offY = offset.y.pinLastValue(),
          pos = Patches.getVectorValue('pos'),
          posX = pos.x.pinLastValue(),
          posY = pos.y.pinLastValue()

    console.log(`offset 1000ms (${offX},${offY})`)
    console.log(`pos 1000ms (${posX},${posY})`)
  }, 1000);
});