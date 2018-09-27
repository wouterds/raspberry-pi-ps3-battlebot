const joystick = require('joystick');
const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');

const ps3Controller = new joystick(0);

raspi.init(() => {
  const motor1F = new pwm.SoftPWM('P1-16');
  const motor1B = new pwm.SoftPWM('P1-15');
  const motor2F = new pwm.SoftPWM('P1-11');
  const motor2B = new pwm.SoftPWM('P1-12');

  ps3Controller.on('button', button => {
    switch (button.number) {
      case 0: // cross
        break;
      case 1: // circle
        break;
      case 2: // triangle
        break;
      case 3: // square
        break;
      case 14: // arrow down
        motor1F.write(button.value);
        motor2F.write(button.value);
        break;
      case 13: // arrow up
        motor1B.write(button.value);
        motor2B.write(button.value);
        break;
      case 16: // arrow right
        motor1B.write(button.value);
        motor2F.write(button.value);
        break;
      case 15: // arrow left
        motor1F.write(button.value);
        motor2B.write(button.value);
        break;
    }
  });

  ps3Controller.on('axis', axis => {
    const max = 32767;

    const value = axis.value / max;;

    switch (axis.number) {
      case 1: // left y-axis
        if (value === 0) {
          motor1F.write(0);
          motor1B.write(0);
        } else if (value > 0) {
          motor1F.write(value);
        } else {
          motor1B.write(value * -1);
        }
        break;
      case 4: // right y-axis
        if (value === 0) {
          motor2F.write(0);
          motor2B.write(0);
        } else if (value > 0) {
          motor2F.write(value);
        } else {
          motor2B.write(value * -1);
        }
        break;
    }
  });
});
