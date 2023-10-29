var isDoingCountDown = false;
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");

    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
     }
}
var mistakes = getCookie("mistakes");

var startTime, endTime;
var nekoMusic = new Audio('MAZES/NekoMusic.mp3');

const c = document.getElementById("myCanvas");
const ctx = c.getContext('2d', { willReadFrequently: true });
const img = document.getElementById("scream");
console.log(mistakes)
if(mistakes > 2){
  img.src = "MAZES/mazeHard.png";
}
else if(mistakes >= 8){
  img.src = "MAZES/mazeIMPOSSIBLE.png";
}
img.style.display = "none";
ctx.drawImage(img, 10, 10);

//Booleans
var isInStartingArea;
var isAtFinished;
var isOB;
var hasfailed;
var isRunningRound = false;


c.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
  mistakes = getCookie("mistakes");
  const rect = c.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const [r, g, b] = pixelData; // RGB values of the pixel
  // Check if the pixel color matches your desired color range
  if (r === 19 && g === 56 && b === 233) {
      console.log('Cursor is on blue!');
      // You can change the cursor style here
      if(isRunningRound){
        console.log("jasfdsad")
        userFail();
      }
  }
  else if (r === 233 && g === 19 && b === 177) {
      console.log('Cursor is on red!');
      // You can change the cursor style here
    if(isRunningRound){
      userFinished();
    }
  }
  else if (r === 255 && g === 255 && b === 255) {
    isInStartingArea = true;
    console.log('Cursor is on white!');
    
      // You can change the cursor style here
    if(!isRunningRound){
      initGame();
    }
  }
  else if (!(r === 72 && g === 255 && b === 44)) {
    isOB = true;
    console.log('Cursor is NOT on green!');
    if(isRunningRound){
      outOfBounds();
    }
  }
  else if(isRunningRound && isDoingCountdown){
      console.log("not in white space")
      userFailWhite();
  }
}

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  return Math.round(timeDiff);
}

function countdown(seconds){
  isDoingCountDown = true;
  var proposedTime = new Date().getTime() + seconds * 1000;

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();



    // Find the distance between now and the count down date
    var distance = proposedTime - now;
    console.log(distance);
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if(document.getElementById("start") !== undefined){
      document.getElementById("start").innerHTML = `starting in ${seconds} seconds`;
      if (distance <= 0) {
        document.getElementById("start").innerHTML = `GO!`;
        isDoingCountDown = false;
        return;
      }
    }
  }, 1000);
}

function restartGame(){
  alert("go to starting area!");
  isRunningRound = false;
  document.getElementById("start").innerHTML = `Return back to the starting area.`
  console.log("Restarting...")
  
  
}

function initGame(){
  isRunningRound = true;
  console.log('RUNIG')
  countdown(5);
  nekoMusic.play();
}

function userFinished(){
  alert("You Finished!");
  isRunningRound = false;
  
}

function userFailWhite(){
  if(mistakes < 9){
    nekoMusic.pause();
    fetch('/user_did_mistake')
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data); // Log the response from the server
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    alert("You stepped out during a countdown!");
    restartGame();  
  }
  else{
    surprise();
  }
}

function userFail(){
  if(mistakes < 9){
    nekoMusic.pause();
    fetch('/user_did_mistake')
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data); // Log the response from the server
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    alert("You stepped on the blue!");
    restartGame();  
  }
  else{
    surprise();
  }
}
/*
  Image must be mapped first.
  Player starts in starting area at bottom of image, then moves from 
*/

function outOfBounds(){
  if(mistakes < 9){
    nekoMusic.pause();
    fetch('/user_did_mistake')
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data); // Log the response from the server
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    alert("You stepped out of the box!");
    restartGame(); 
  }
  else{
    // surprise();
  }
}

function surprise(){
  document.querySelector("body").innerHTML = "<img src='MAZES/CAT.png'>";
  // var audio = new Audio('MAZES/jumpscare.wav');
  // audio.play();
  countdown(8);
  // alert(`You Died!\nYou made ${document.cookie.mistakes} mistakes`);
}
// surprise();

restartGame();