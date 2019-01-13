var xBorder = 800;
var yBorder = 400;

var keyboardDirection=38;

var snakeColor=randomColor();

var audio = [new Audio('./sounds/eat.wav'),
             new Audio('./sounds/eatfive.wav'),
             new Audio('./sounds/gameover.wav'),
            ];
var highScore = 0;

//Starting the game
function start(){
    document.getElementById("startBtn").style.display="none";
    arrPnt.unshift(randomPoint());
    runprogram();
}

function runprogram(){
   var inter = setInterval(moveSnake,150);
   console.log("interval:" +inter);
}
//Point class
class InkPnt{
    constructor(x,y){
        this.x=x; 
        this.y=y;
    }
    location(dir){
        switch(dir){
            case 38:
            this.y-=20;
            break;
            case 39:
            this.x+=20;
            break;
            case 40:
            this.y+=20;
            break;
            case 37:
            this.x-=20;
            break;
            default:
            break;
        }
    }
    move(sig){
        this.x = sig.x;
        this.y = sig.y;
    }

    xAcess(){
        return this.x;
    }
    yAcsess(){
        return this.y;
    }

    print() {
    var node = document.createElement("div");
    node.style.boxSizing = "border-box";
    node.style.position = "absolute";
    node.style.width = 20+'px';
    node.style.height = 20+'px';
    node.style.backgroundColor=snakeColor;
    node.style.border="solid";
    node.style.top=this.y+'px';    
    node.style.left=this.x+'px';
    document.getElementById("displayWindow").appendChild(node);
    }  

    

    inBorder(x,y){
        if(this.x>x-19||this.x<0||this.y>y-19||this.y<0)
        return false;
        else
        return true;
    }
    
}

//Creates food for snake in a random place
function makeFood(){
     food = randomPoint();
}

//Checks if snake ate the food 
function snakeFoodColide(){
    let scoreNode = document.getElementById('score');
    let highScoreNode = document.getElementById('highScore');

    //When snake eats food 1.Play eat sound 2.Raise score 3.Display score
    if(arrPnt[0].x==food.x && arrPnt[0].y==food.y){
        //Play eat sound 
        audio[0].play();
        
        //Score 
        let scoreText = document.createElement("div");
        let highScoreText = document.createElement("div");
        scoreText.innerText ='Score: '+ (arrPnt.length*100);
        
        while(scoreNode.firstChild)
         scoreNode.removeChild(scoreNode.firstChild);
        scoreNode.appendChild(scoreText);
        
        //Raise High-score
        if(arrPnt.length>highScore){
            highScore=arrPnt.length;
            highScoreText.innerText ='High-Score: '+ (highScore*100);
            while(highScoreNode.firstChild)
            highScoreNode.removeChild(highScoreNode.firstChild);
            highScoreNode.appendChild(highScoreText);
        }

        //Change snake color and ring hurray
        if(arrPnt.length % 5 == 0){
            snakeColor = randomColor();
            audio[1].play();
        }
        
    }
    return(arrPnt[0].x==food.x && arrPnt[0].y==food.y);
}

//Checks if sanke colides with himself or the wall
function snakeSnakeColide(){
    if(arrPnt[0].x>780||arrPnt[0].y>380||arrPnt[0].x<0||arrPnt[0].y<0){  
            return true;
        }
    for(let i=arrPnt.length-1; i>=1; i--){
        if(arrPnt[i].x===arrPnt[0].x&&
        arrPnt[i].y===arrPnt[0].y)
        {
           return true;
        }
    }
    return false;
}

//Handles game over
function gameOver(){    
    arrPnt =[];
    arrPnt.unshift(randomPoint());
    audio[2].play();
    alert('Game Over!');            
}

//Moves snake
function moveSnake(){
    var nodes = document.getElementById("displayWindow");
   
    while (nodes.firstChild) {
         nodes.removeChild(nodes.firstChild);
    }
     
        for(let j=arrPnt.length-1; j>=1; j--){
            arrPnt[j].move(arrPnt[j-1]);
        }
        arrPnt[0].location(keyboardDirection);
        if(snakeSnakeColide()){
            gameOver();
        } 
        if(snakeFoodColide()){
            arrPnt.unshift(food);
            food = randomPoint();
        }
        

        food.print();
        for(let j=0; j<arrPnt.length; j++){
        arrPnt[j].print();    
        }
}

//Listen to arrow of key board
document.addEventListener("keydown", function(event) {
    let x = event.which;
    if(x == 37 || x == 38 || x == 39 || x == 40){
    keyboardDirection = x; 
    }              
})

//Returns Instance of InkPnt with random x and y values
function randomPoint(){
    let a =Math.round(((Math.random()*1000))%39)*20;
    let b =Math.round(((Math.random()*1000))%19)*20;
    console.log("a is:"+a+"  b is:"+b);
    return(new InkPnt(a,b));
}

function randomColor(){
    return ("#"+((1<<24)*Math.random()|0).toString(16));
}

var food = randomPoint();

//Array of point instances
var arrPnt = [];


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            keyboardDirection = 37;
        } else {
            keyboardDirection = 39;
        }                       
    } else {
        if ( yDiff > 0 ) {
            keyboardDirection = 38;
        } else { 
            keyboardDirection = 40;
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};