import p5 from "p5";
import { v2, rgb, drawRect } from "../../../../../Utils/Maths/pointAlongGeometry.js";

const canvas = {
  size: {
    width: 800,
    height: 800
  }
};

const mazeTypesEnum = [
  "wall",
  "in",
  "frontier",
  "out"
];

const mazeTypes = {
  wall: {
    index: 0,
    color: rgb(0,0,0)
  },
  in: {
    index: 1,
    color: rgb(255,255,255)
  },
  frontier: {
    index: 2,
    color: rgb(66, 245, 209)
  },
  out: {
    index: 3,
    color: rgb(139, 140, 140)
  }
};

const maze = [];
const frontierCells = [];

const getFarNeighbors = (x, y) => {
  const n = [];
  if(x - 2 > 0) { n.push(v2(x-2, y)); }
  if(x + 2 < maze[0].length - 1) { n.push(v2(x+2, y)); }
  if(y - 2 > 0) { n.push(v2(x, y-2)); }
  if(y + 2 < maze.length - 1) { n.push(v2(x, y+2)); }
  return n;
}

const getFarNeighborsOfType = (x,y,type) => {
  const n = getFarNeighbors(x,y);
  const nOfType = [];
  for(let i = 0; i < n.length; i++) {
    const pos = n[i];
    if(maze[pos.x][pos.y] === mazeTypes[type].index) {
      nOfType.push(n[i]);
    }
  }
  return nOfType;
}

const newFrontierCell = (x, y) => {
  maze[x][y] = mazeTypes.frontier.index;
  frontierCells.push({x,y});
}

const makeFarNeighborsFrontierCells = (x,y) => {
  const n = getFarNeighborsOfType(x,y,"out");
  for(let i = 0; i < n.length; i++) {
    newFrontierCell(n[i].x, n[i].y);
  }
}

const removeWallBetweenTwoCells = (x1, y1, x2, y2) => {
  const x = x1 === x2 ? x1 : x1 > x2 ? x2 + 1 : x1 + 1;
  const y = y1 === y2 ? y1 : y1 > y2 ? y2 + 1 : y1 + 1;
  maze[x][y] = mazeTypes.in.index;
}

const removeWallFromFrontier = (x, y) => {
  const n = getFarNeighborsOfType(x,y,"in");
  const i = Math.floor(Math.random() * n.length);
  removeWallBetweenTwoCells(x,y,n[i].x,n[i].y);
}

const delFrontierCell = (x,y) => {
  removeWallFromFrontier(x,y);
  maze[x][y] = mazeTypes.in.index;
  makeFarNeighborsFrontierCells(x,y);
  for(let i = 0; i < frontierCells.length; i++) { 
    const cell = frontierCells[i];
    if(cell.x === x && cell.y === y) {
      frontierCells.splice(i, 1);
      break;
    }
  }
}

const mazeWidth = 40;
const mazeHeight = 40;
for(let h = 0; h < mazeHeight * 2 + 1; h++) {
  maze.push([]);
  for(let w = 0; w < mazeWidth * 2 + 1; w++) {
    maze[h].push(w%2 === 1 && h%2 === 1 ? mazeTypes.out.index : mazeTypes.wall.index);
  }
}
maze[1][1] = mazeTypes.in.index;
newFrontierCell(3,1);
newFrontierCell(1,3);

const setup = (p) => {
  p.createCanvas(canvas.size.width, canvas.size.height, p5.WEBGL);
  p.frameRate(60);
}

const draw = (p) => {
  p.background(80);
  
  for(let h = 0; h < maze.length; h++) {
    for(let w = 0; w < maze[h].length; w++){
      const color = mazeTypes[mazeTypesEnum[maze[h][w]]].color;
      p.strokeWeight(0);
      p.fill(color.r, color.g, color.b);
      drawRect(p, v2(w * 10, h * 10), 10, 10);
    }
  }

  if(frontierCells.length > 0) {
    // create the maze
    for(let i = 0; i < 25; i++) {
      if(frontierCells.length > 0) {
        const fc = frontierCells[Math.floor(Math.random() * frontierCells.length)];
        delFrontierCell(fc.x, fc.y);
      } else {
        break;
      }
    }
  } else {
    // solve the maze
  }
}

export { setup, draw };