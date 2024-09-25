//Lorenz attractor animation

let particles = [];
let numParticles = 1000; 

//Parameters:

let sigma = 10;
let rho = 28;
let beta = 8 / 3;

//Create new random particle and then run chaos on it:

function setup() {
  createCanvas(1000, 600);
  background(255); 
  for (let i = 0; i < numParticles; i++) {
    particles.push(new ChaoticParticle(random(width), random(height)));
  }
}

//Adding trails:

function draw() {
  fill(255, 30); 
  rect(0, 0, width, height);
  
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}


//Class for particles and chaotic behavior:
class ChaoticParticle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = this.pos.copy(); 
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    
    //Initial random pos of variables:
    this.x = random(1, 10);
    this.y = random(1, 10);
    this.z = random(1, 10);
    
    //360 degree angle => 2pi
    this.angle = random(TWO_PI); 
    this.amplitude = random(20, 50);
    this.oscillationSpeed = random(0.01, 0.05);
  }

  update() {
    //Change in x,y,z coordinate systems:
    
    let dx = sigma * (this.y - this.x);
    let dy = this.x * (rho - this.z) - this.y;
    let dz = this.x * this.y - beta * this.z;

    this.x += dx * 0.01;  
    this.y += dy * 0.01;
    this.z += dz * 0.01;
    
    //Harmonic oscialltions:
    this.angle += this.oscillationSpeed;
    let offsetX = this.amplitude * cos(this.angle);
    let offsetY = this.amplitude * sin(this.angle);
    
    //Update particle positions:
    
    this.pos.x = map(this.x, -20, 20, 0, width) + offsetX;
    this.pos.y = map(this.y, -30, 30, 0, height) + offsetY;
  }

  
//Strokes:
  
  display() {

    stroke(255, 105, 180); 
    strokeWeight(0.8); 
    
    //Connecting lines for effect
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y); 
    
    // Update previous position
    this.prevPos.set(this.pos);
  }
}