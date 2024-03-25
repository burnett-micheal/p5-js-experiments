
const lengthOfLine = (start, end) => {
  return Math.hypot(end.x - start.x, end.y - start.y)
}

const pointAlongLine = (start, end, distanceFromStart) => {
  const yDiff = end.y - start.y;
  const xDiff = end.x - start.x;
  const lineLength = Math.sqrt(yDiff * yDiff + xDiff * xDiff);
  const unitVectorX = xDiff / lineLength;
  const unitVectorY = yDiff / lineLength;


  return {
    x: start.x + unitVectorX * distanceFromStart, 
    y: start.y + unitVectorY * distanceFromStart 
  };
}

const lineAlongLine = (start, end, startMult, endMult) => {
  const len = lengthOfLine(start, end);
  const newStart = pointAlongLine(start, end, len * startMult);
  const newEnd = pointAlongLine(start, end, len * endMult);
  return {start: newStart, end: newEnd};
}

const isDisLongerThanLine = (start, end, disFromStart) => {
  const yDiff = Math.abs(start.y - end.y);
  const xDiff = Math.abs(start.x - end.x);
  const lineLength = Math.sqrt(yDiff * yDiff + xDiff * xDiff);

  return disFromStart > lineLength;
}

const pointAlongPolygon = (start, disFromStart, nextVerticeIndex, vertices) => {
  let nextVert = vertices[nextVerticeIndex];

  while(isDisLongerThanLine(start, nextVert, disFromStart)) {
    start = nextVert;
    nextVerticeIndex = (nextVerticeIndex + 1)%vertices.length;
    nextVert = vertices[nextVerticeIndex];
  }

  const response = pointAlongLine(start, nextVert, disFromStart);
  response.nextVerticeIndex = nextVerticeIndex;

  return response;
}

// const radiansToDegrees = (radians) => radians * (180 / Math.PI);

const getAngleBetween2Points = (anchor, point) => Math.atan2(point.y - anchor.y, point.x - anchor.x);

const pointAlongCircle = (start, disFromStart, center, circumference, radius) => {
  const startAngle = getAngleBetween2Points(center, start);
  const radiansInFullRotation = 2 * Math.PI;
  const numOfRotationsToTravel = (circumference / disFromStart);
  const angle = (radiansInFullRotation / numOfRotationsToTravel) + startAngle;
  
  const x = radius * Math.cos(angle) + center.x;
  const y = radius * Math.sin(angle) + center.y;
  
  return {x, y};
}

// const fractionalPointAlongCircumferenceOfCircle = (start, fraction, center, radius) => {
//   const startAngle = getAngleBetween2Points(center, start);
//   const radiansInFullRotation = 2 * Math.PI;
//   const numOfRotationsToTravel = fraction%1;
//   const angle = (radiansInFullRotation / numOfRotationsToTravel) + startAngle;
  
//   const x = radius * Math.cos(angle) + center.x;
//   const y = radius * Math.sin(angle) + center.y;
  
//   return {x, y};
// }

const equallySpacedPointsAlongCircumferenceOfCircle = (start, center, circumference, radius, numOfPoints) => {
  const arrOfPoints = [start];
  for(let i = 1; i < numOfPoints; i++) {
    arrOfPoints.push(
      pointAlongCircle(
        start, 
        (circumference / numOfPoints) * i, 
        center, 
        circumference, 
        radius
      )
    );
  }
  return arrOfPoints;
}

/*
public Point MovePointTowards(Point a, Point b, double distance)
{
    var vector = new Point(b.X - a.X, b.Y - a.Y);
    var length = Math.Sqrt(vector.X * vector.X + vector.Y * vector.Y);
    var unitVector = new Point(vector.X / length, vector.Y / length);
    return new Point(a.X + unitVector.X * distance, a.Y + unitVector.Y * distance);
}
*/

const drawLine = (p, lineCoords) => {
  p.line(lineCoords.start.x, lineCoords.start.y, lineCoords.end.x, lineCoords.end.y);
}

const drawRect = (p, topLeftPos, width, height) => {
  p.rect(topLeftPos.x, topLeftPos.y, width, height);
}

const v2 = (x,y) => ({x,y});

const rgb = (r,g,b) => ({r,g,b});

export { lengthOfLine, pointAlongLine, lineAlongLine, pointAlongPolygon, pointAlongCircle, equallySpacedPointsAlongCircumferenceOfCircle, drawLine, drawRect, v2, rgb };