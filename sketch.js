let checkbox;
let button;

const MAX_X = 50;
const MAX_Y = 50;
const N = MAX_X*MAX_Y;

const SIZE = 10;

let C_W = MAX_X*SIZE;
let C_H = MAX_Y*SIZE;

let TRAIL = 0.9;

let grid = [];
let temp_grid = [];

function mouseWheel(event){
    if(event.delta < 0){
        TRAIL *= 1.05;
    } else {
        TRAIL *= 0.95;
    }

    console.log(TRAIL);
}

function advance(){
    for(i=0; i < N; i+=1){
      x=i%MAX_X;
      y=floor(i/MAX_X);
      neighbors = floor(grid[(i-1)]) + floor(grid[(i+1)]) + floor(grid[(i-MAX_X+N)%N]) + floor(grid[(i+MAX_X)%N]) + floor(grid[(i-MAX_X-1+N)%N]) + floor(grid[(i-MAX_X+1+N)%N]) + floor(grid[(i+MAX_X-1)%N]) + floor(grid[(i+MAX_X+1)%N]);

      if(neighbors<2||neighbors>3){
        temp_grid[i]=grid[i]*TRAIL*0;
        fill(temp_grid[i]);
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
    checkbox = createCheckbox('Pause', false);
    checkbox.changed(myCheckedEvent);
    button = createButton('CLEAR');
    button.position(C_W/2, C_H);
    button.mousePressed(CLEAR);
    for(i=0; i<MAX_X*MAX_Y; i+=1){
        grid.push(floor(random(2)));
    }
}

function CLEAR() {
    fill(0);
    for(i=0; i<MAX_X*MAX_Y; i+=1){
        x=i%MAX_X;
        y=floor(i/MAX_X);
        grid[i]=0;
        rect(x*SIZE, y*SIZE, SIZE, SIZE);
    }
}

function myCheckedEvent() {
  if (this.checked()) {
    console.log('Checking!');
  } else {
    console.log('Unchecking!');
  }
}

function draw() {
  // put drawing code here
  if(mouseIsPressed){
    x=floor((mouseX/SIZE)%MAX_X);
    y=floor((mouseY/SIZE)%MAX_Y);
    i=x+MAX_X*y;
    grid[x+y*MAX_Y]=1;
  }
  if(mouseIsPressed||keyIsPressed){
    if(!checkbox.checked()){
        advance();
    }
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
