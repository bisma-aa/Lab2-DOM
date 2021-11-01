function Bear() {
   this.dBear = 100; //The step of the bear in pixels when the user clicks the arrows on the keyboard
   this.htmlElement = document.getElementById("bear"); 
   this.id = this.htmlElement.id;
   this.x = this.htmlElement.offsetLeft; 
   this.y = this.htmlElement.offsetTop; 

   //Move the bear by dx and dy steps in the horiztonal axis and vertical directions
   this.move = function(xDir, yDir) {

       this.x += this.dBear * xDir; //Update the x position by xDir steps
       this.y += this.dBear * yDir; // Update the y position by yDir steps
       this.display(); //Update the display
   };

   //displaying the bear at the new position
   this.display = function() {
       this.fitBounds(); //keeps the bear within the bounds of the board
       this.htmlElement.style.left = this.x + "px"; 
       this.htmlElement.style.top = this.y + "px"; 
       this.htmlElement.style.display = "absolute"; 
   };

   //Ensuring the bear doesn't go outside the bounds of the board display
   this.fitBounds = function() {
       let parent = this.htmlElement.parentElement; 
       let iw = this.htmlElement.offsetWidth;
       let ih = this.htmlElement.offsetHeight;
       let l = parent.offsetLeft;
       let t = parent.offsetTop;
       let w = parent.offsetWidth;
       let h = parent.offsetHeight;

       //returns the bear to the edge horizontally if it goes out the bounds of the board
       if (this.x < 0) this.x = 0;
       if (this.x > w - iw) this.x = w - iw;

        //returns the bear to the edge vertically if it goes out the bounds of the board
       if (this.y < 0) this.y = 0;
       if (this.y > h - ih) this.y = h - ih;
   };
}


function start() {

   bear = new Bear(); //creating bear

   document.addEventListener("keydown", moveBear, false); //Add event listener to the document for key press event
   document.getElementById("speedBear").addEventListener("change", setSpeed) //Add event listener to the input field for changes of speed

   bees = new Array(); //Create a new bees array
   makeBees(); //Create bees
   updateBees(); //Moves the bees around 
}

//reinitialising the game
function restart() {
   total_score = 0; //setting the total score to 0
   hits.innerHTML = total_score; 
   duration.innerHTML = 0; //setting the duration to 0 as well
   updateTimer = clearTimeout(); //clearing the timer
   removeBees(); //clearing the bees array by removing the bees
   start(); //using the onclick to call start
}

//Handling keyboard events to move the bear
function moveBear(e) {
   if (start != true) {
       start = true;
       lastStingTime = new Date(); //taking start time
   }

   //Codes of the 4 arrow keys 
   const KEYUP = 38;
   const KEYDOWN = 40;
   const KEYLEFT = 37;
   const KEYRIGHT = 39;
   if (e.keyCode == KEYRIGHT) {
       bear.move(1, 0) //Moves the bear to the right
   }
   if (e.keyCode == KEYLEFT) {
       bear.move(-1, 0) //Moves the bear to the left
   }
   if (e.keyCode == KEYUP) {
       bear.move(0, -1) //Moves the bear up
   }
   if (e.keyCode == KEYDOWN) {
       bear.move(0, 1) //Moves the bear down
   }
}

function setSpeed() {
   //updating the value of speed from the input field
   bear.dBear = parseInt(document.getElementById("speedBear").value); 
}

class Bee {
   constructor(beeNumber) {
       
      //the HTML element corresponding to the IMG of the bee
       this.htmlElement = createBeeImg(beeNumber); 
       this.id = this.htmlElement.id; //HTML id
       this.x = this.htmlElement.offsetLeft; //The left position (x)
       this.y = this.htmlElement.offsetTop; //The top position (y)

       //Function used to move the bees around
       this.move = function(dx, dy) {
          //Moves the bees dx and dy
           this.x += dx; 
           this.y += dy; 
           this.display();
       };

       //adjusts the position of bees and displays it
       this.display = function() {
           this.fitBounds(); // adds this to adjust the bounds
           this.htmlElement.style.left = this.x + "px"; 
           this.htmlElement.style.top = this.y + "px"; 
           this.htmlElement.style.display = "block"; 
       };

       //checks and makes sure the bees stay in the board space
       this.fitBounds = function() {
           let parent = this.htmlElement.parentElement; 
           
           let iw = this.htmlElement.offsetWidth;
           let ih = this.htmlElement.offsetHeight;
           
           let l = parent.offsetLeft;
           let t = parent.offsetTop;
           let w = parent.offsetWidth;
           let h = parent.offsetHeight;

           
           if (this.x < 0) this.x = 0;
           if (this.x > w - iw) this.x = w - iw;

           
           if (this.y < 0) this.y = 0;
           if (this.y > h - ih) this.y = h - ih;
       };

   }
}

//Gets the dimension and position the board div
function createBeeImg(wNum) {
   
   let boardDiv = document.getElementById("board"); 
   let boardDivW = boardDiv.offsetWidth; 
   let boardDivH = boardDiv.offsetHeight; 
   let boardDivX = boardDiv.offsetLeft; 
   let boardDivY = boardDiv.offsetTop; 

   //Create the img element
   let img = document.createElement("img");
   img.setAttribute("src", "images/bee.gif") 
   img.setAttribute("width", "100"); 
   img.setAttribute("alt", "A bee!"); 
   img.setAttribute("id", "bee" + wNum);
   img.setAttribute("class", "bee"); //Set class of html tag img

   //Add the image element to the DOM as a child of the board div
   img.style.position = "absolute";
   boardDiv.appendChild(img);

   //Setting the inital position of the bee
   let x = getRandomInt(boardDivW);
   let y = getRandomInt(boardDivW);
   img.style.left = (boardDivX + x) + "px";
   img.style.top = (y) + "px";

   //Return the img object
   return img;
}

function getRandomInt(max) {
   return Math.floor(Math.random() * max); //Generates a random number between 0 and max
}

function makeBees() {

   let nbBees = document.getElementById("nbBees").value; //Get the number of bees specified by the user
   nbBees = Number(nbBees); //Convert the content of the input to a number

   if (isNaN(nbBees)) { //Check that the input field contains a valid number
       window.alert("Invalid number of bees");
       return;
   }

   //Create bees
   let i = 1;
   while (i <= nbBees) {
       var num = i;
       var bee = new Bee(num); //Create object and its IMG element
       bee.display(); //Display the bee 
       bees.push(bee); //Add the bee object to the bees array
       i++;
   }

}

//adds one to the number of bees, create a new bee, 
//display it and add it to the array of bees
function addBee() {
   let nbBees = document.getElementById("nbBees").value; //Get the number of bees specified by the user
   nbBees = Number(nbBees); //Convert the content of the input to a number
   nbBees++;
   var bee = new Bee(nbBees); //Creating a bee
   bee.display(); //Displaying the bee 
   bees.push(bee); //Add the bee to the bees array
}

function removeBees() {
   beesArray = document.getElementsByClassName("bee");
   beesArray.forEach(e => e.remove()); //removing the bees
}

function moveBees() {
   let speed = document.getElementById("speedBees").value; //Get the speed from the input field

   for (let i = 0; i < bees.length; i++) {
       //Move the bees randomly 
       let dx = getRandomInt(2 * speed) - speed;
       let dy = getRandomInt(2 * speed) - speed;
       bees[i].move(dx, dy); 
       isHit(bees[i], bear); //adding this to count the stings
   }
}

//update loop for game
function updateBees() {
   //move the bees randomly
   moveBees();
   //use a fixed update period
   let period = document.getElementById("periodTimer").value; //using the input field periodTimer instead of the fixed period(10)

   let score = hits.innerHTML;
   if (Number(score) < 1000) {
       updateTimer = setTimeout('updateBees()', period); //Update the timer for the next move
       // stop the game and display “Game over!”, when the number of stings 
       //reaches 1000.
   } else {
       score = "Game Over"
       hits.innerHTML = score;
       updateTimer = clearTimeout();
   }
}

function isHit(defender, offender) {

   if (overlap(defender, offender)) { //Check if the two images overlapped
       let score = hits.innerHTML;
       score = Number(score) + 1; //Increment the score
       hits.innerHTML = score; //display the new score

       //Calculate longest duration
       let newStingTime = new Date();
       let thisDuration = newStingTime - lastStingTime;
       lastStingTime = newStingTime;
       let longestDuration = Number(duration.innerHTML);

       
       if (longestDuration === 0 || isNaN(longestDuration)) {
           longestDuration = thisDuration;
       } else {
           if (longestDuration < thisDuration) longestDuration = thisDuration;
       }

       
       document.getElementById("duration").innerHTML = longestDuration;
   }
}

function overlap(element1, element2) {

   //rectangle around the first element
   left1 = element1.htmlElement.offsetLeft;
   top1 = element1.htmlElement.offsetTop;
   right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
   bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;

   //rectangle around the second element
   left2 = element2.htmlElement.offsetLeft;
   top2 = element2.htmlElement.offsetTop;
   right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
   bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;

   //Calculate the intersection of the two rectangles
   x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
   y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
   intersectArea = x_intersect * y_intersect;

   //If intersection is null then no hit
   if (intersectArea == 0 || isNaN(intersectArea)) {
       return false;
   }

   return true;
}