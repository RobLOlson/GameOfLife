let C_W = 800;
let C_H = 800;

const MAX_X = 50;
const MAX_Y = 50;
const N = MAX_X*MAX_Y;

const SIZE = 10;

let grid = [];
let temp_grid = [];

function mouseWheel(){
    for(i=0; i < N; i+=1){
      x=i%MAX_X;
      y=floor(i/MAX_X);
      neighbors = floor(grid[(i-1)]) + floor(grid[(i+1)]) + floor(grid[(i-MAX_X+N)%N]) + floor(grid[(i+MAX_X)%N]) + floor(grid[(i-MAX_X-1+N)%N]) + floor(grid[(i-MAX_X+1+N)%N]) + floor(grid[(i+MAX_X-1)%N]) + floor(grid[(i+MAX_X+1)%N]);

      if(neighbors<2||neighbors>3){
        temp_grid[i]=grid[i]*.99;
        fill("black");
        rect(x*SIZE, y*SIZE, SIZE, SIZE);
      } else if(neighbors==3){
        temp_grid[i]=1;
      } else {
        temp_grid[i] = grid[i];
      }
    }
    for(i=0; i < N; i+=1){
        grid[i] = temp_grid[i];
        if(grid[i]>0){
            rect(x*SIZE, y*SIZE, SIZE, SIZE);
    }
  }

}

function setup() {
    createCanvas(C_W, C_H);
    background("black");
    for(i=0; i<MAX_X*MAX_Y; i+=1){
        grid.push(floor(random(2)));
        // grid.push(0);
    }
  // put setup code here
}

function draw() {
  // put drawing code here
  if(keyIsPressed){
    mouseWheel();
  }
  if(mouseIsPressed){
    x=floor((mouseX/SIZE)%MAX_X);
    y=floor((mouseY/SIZE)%MAX_Y);
    i=x+MAX_X*y;
    grid[x+y*MAX_Y]=1;
    console.log(`${mouseX},${mouseY}=>${x},${y}`);
  }
  for(i=0; i < MAX_X*MAX_Y; i+=1){
    x=i%MAX_X;
    y=floor(i/MAX_X);

    if(grid[i]>0.5){
        fill(255*grid[i]);
        rect(x*SIZE, y*SIZE, SIZE, SIZE);
    }
  }
}
