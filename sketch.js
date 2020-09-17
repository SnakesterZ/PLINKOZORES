const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var gameState = "play"
var particle

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
    var div = new Divisions(k, height-divisionHeight/2, 10, divisionHeight); 
    divisions.push(div);

     if(k > 300 && k < 600)
     {
       div.score = 100;
     }
     else if(k >= 600)
     {
       div.score = 200;
     }
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)

  text("Score : " + score, 50, 50)
  
 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }

   for (var i = 0; i < particles.length; i++) {
    particles[i].display();
     
    if (particles[i].body.position.x < 300 && particles[i].body.position.y>760) {
     score=score+500;
     particles.pop();
    }
   else if (particles[i].body.position.x < 600 && particles[i].body.position.x > 301 && particles[i].body.position.y > 760) {
     score = score + 100;
     particles.pop();
   }
   else if (particles[i].body.position.x < 900 && particles[i].body.position.x > 601 && particles[i].body.position.y > 760) {
     score = score + 200;
     particles.pop();
   }
  }

   for (var k = 0; k < divisions.length; k++) {
    var currentDiv = divisions[k];
    currentDiv.display();

     text(currentDiv.score, currentDiv.body.position.x + 25, 600);  
   }

   if(particle != null)
    {
      particle.display();

        if(particle.body.position.y>760)
        {
            if(particle.body.position.x<300)
            {
                score = score+500;
                
                particle = null;
                if(score >= 2500) gameState = 'end';
            }
        }
    }

    if(particle != null)
    {
      particle.display();

        if(particle.body.position.y>760)
        {
            if(particle.body.position.x>301 && particle.body.position.x<600)
            {
                score = score+100;
                
                particle = null;
                if(score >= 2500) gameState = 'end';
            }
        }
    }

    if(particle != null)
    {
      particle.display();

        if(particle.body.position.y>760)
        {
            if(particle.body.position.x>601 && particle.body.position.x<900)
            {
                score = score+200;
                
                particle = null;
                if(score >= 2500) gameState = 'end';
            }
        }
    }


}

function mouseReleased()
{
  if(gameState !== "end")
  {
    score++;
    particle = new Particle(mouseX, 10, 10, 10)
  }
}