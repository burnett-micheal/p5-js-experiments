import p5 from "p5";
import { drawLine, equallySpacedPointsAlongCircumferenceOfCircle, lengthOfLine, lineAlongLine, pointAlongCircle, pointAlongLine } from "../../../../../Utils/Maths/pointAlongGeometry.js";
import digital7Font from "../../../../../Styles/Fonts/digital-7.ttf";
import robotoRegularFont from "../../../../../Styles/Fonts/Roboto-Regular.ttf";

let defaultFont;
let clockFont;

const canvas = {
  size: {
    width: 800,
    height: 800
  }
};

const clock = {
  radius: 300,
  center: { x: canvas.size.width / 2, y: canvas.size.height / 2 },
  secondHand: {
    endPos: {
      x: undefined,
      y: undefined
    }
  },
  minuteHand: {
    endPos: {
      x: undefined,
      y: undefined
    }
  },
  hourHand: {
    endPos: {
      x: undefined,
      y: undefined
    }
  }
};
clock.diameter = clock.radius * 2;
clock.circumference = 2 * Math.PI * clock.radius;

const minutePoints = equallySpacedPointsAlongCircumferenceOfCircle(
  {x: clock.center.x, y: clock.center.y - clock.radius}, 
  clock.center, 
  clock.circumference, 
  clock.radius, 
  60
);

const setup = (p) => {
  p.createCanvas(canvas.size.width, canvas.size.height, p5.WEBGL);
  p.frameRate(60);
  clockFont = p.loadFont(digital7Font);
  defaultFont = p.loadFont(robotoRegularFont);
}

const dateToObj = (date) => {
	return {
  	year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    minute: date.getMinutes(),
    second: date.getSeconds(),
    ms: date.getMilliseconds(),
    amOrPm: date.getHours() > 12 ? "PM" : "AM"
  };
}

const draw = (p) => {
  p.background(80);
      
  p.fill(237, 237, 237);
  p.stroke(0, 0, 0);
  p.strokeWeight(5);
  p.circle(clock.center.x, clock.center.y, clock.diameter);

  p.strokeWeight(1);
  for(let i = 0; i < minutePoints.length; i++) {
    const lineLengthMult = i%5 === 0 ? 0.93 : 0.95;
    p.strokeWeight(i%5 === 0 ? 3 : 2);
    drawLine(p, lineAlongLine(clock.center, minutePoints[i], lineLengthMult, 0.97));
  }

  p.strokeWeight(2);
  p.textSize(39);
  p.fill(0,0,0);
  p.textFont(defaultFont);
  for(let i = 0; i < minutePoints.length; i += 5) {
    const textPoint = pointAlongLine(clock.center, minutePoints[i], lengthOfLine(clock.center, minutePoints[i]) * 0.85);
    p.textAlign("center", "center");
    p.text(`${ i === 0 ? 12 : i / 5 }`, textPoint.x, textPoint.y);
  }

  const dateObj = dateToObj(new Date());

  const boxTopY = clock.center.y + 0.2 * clock.radius;
  const boxBottomY = boxTopY + 0.3 * clock.radius;
  const boxRightX = clock.center.x + 0.3 * clock.radius;
  const boxLeftX = clock.center.x - 0.3 * clock.radius;

  p.strokeWeight(4);
  p.fill(222, 252, 233);
  p.rect(boxLeftX, boxTopY, boxRightX - boxLeftX, boxBottomY - boxTopY);

  const txtSpace = (boxBottomY - boxTopY) / 3;
  const months = [null, "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  p.strokeWeight(0);
  p.textFont(clockFont);
  p.fill(0, 0, 0);
  p.textAlign("center", "center");
  p.textSize(35);
  p.text(`${months[dateObj.month]} ${dateObj.day} ${dateObj.year}`, clock.center.x, boxTopY + txtSpace * 0.9);

  p.textAlign("center", "center");
  const padSD = (num) => num < 10 ? `0${num}` : num;
  p.text(`${dateObj.hour}:${padSD(dateObj.minute)}:${padSD(dateObj.second)} ${dateObj.amOrPm}`, clock.center.x, boxTopY + txtSpace * 2.1);
  
  const seconds = dateObj.second + (dateObj.ms / 1000);
  const secondHandMoveDistance = clock.circumference / 60 * seconds;
  clock.secondHand.endPos = pointAlongCircle({x: clock.center.x, y: clock.center.y - clock.radius}, secondHandMoveDistance, clock.center, clock.circumference, clock.radius);
  p.stroke(227, 58, 16);
  p.strokeWeight(2.5);
  drawLine(p, lineAlongLine(clock.center, clock.secondHand.endPos, -0.05, 0.6));

  const minutes = dateObj.minute + (seconds / 60);
  const minuteHandMoveDistance = clock.circumference / 60 * minutes;
  clock.minuteHand.endPos = pointAlongCircle({x: clock.center.x, y: clock.center.y - clock.radius}, minuteHandMoveDistance, clock.center, clock.circumference, clock.radius);
  p.stroke(0,0,0);
  p.strokeWeight(3);
  drawLine(p, lineAlongLine(clock.center, clock.minuteHand.endPos, -0.05, 0.7));

  const hours = dateObj.hour + (minutes / 60);
  const hourHandMoveDistance = clock.circumference / 12 * hours;
  clock.hourHand.endPos = pointAlongCircle({x: clock.center.x, y: clock.center.y - clock.radius}, hourHandMoveDistance, clock.center, clock.circumference, clock.radius);
  drawLine(p, lineAlongLine(clock.center, clock.hourHand.endPos, -0.05, 0.4));

  p.fill(46, 46, 46);
  p.strokeWeight(0.2);
  p.circle(clock.center.x, clock.center.y, clock.diameter * 0.015);
}

export { setup, draw };