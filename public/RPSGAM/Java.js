//Get the rock, paper, and scissor elements
// value of something
// when lose, the chance of losing is lower
var rockButton = document.getElementById("rockButton");
var paperButton = document.getElementById("paperButton");
var scissorButton = document.getElementById("scissorButton");
var playAgainButton = document.getElementById("playAgainButton");
var continueButton = document.getElementById("continueButton");

var resultScreen = document.getElementById("resultScreen");
var choiceScreen = document.getElementById("choiceScreen");
var resultText = document.getElementById("resultText");
var yourMoveImage = document.getElementById("yourMove");
var theirMoveImage = document.getElementById("theirMove");
var yourMoveText = document.getElementById("yourMoveText");
var theirMoveText = document.getElementById("theirMoveText");
var mistake = document.getElementById("Mistakes")

var userChoice = ""

//Add an event listener to the rock button
//Listens for click & then runs set of code
rockButton.addEventListener("click", function() {
  console.log("Rock button clicked!");
  userChoice = "Rock"
  playGame();
})

paperButton.addEventListener("click", function() {
  console.log("Paper button clicked!");
  userChoice = "Paper"
  playGame();
})


scissorButton.addEventListener("click", function() {
  console.log("Scissor button clicked!");
  userChoice = "Scissors";
  playGame();
})


function playGame() {
  var choices = ["Rock", "Paper", "Scissors"]

  var computerChoice = choices[Math.floor(Math.random() * 3)]

  console.log(computerChoice)

  yourMoveText.innerText = `Your Move: ${userChoice}`
  theirMoveText.innerText = `Their Move: ${computerChoice}`

  yourMoveImage.src = `./${userChoice}.jpg`
  theirMoveImage.src = `./${computerChoice}.jpg`

  if (computerChoice === userChoice) {
    tie();
  } else if (computerChoice === "Rock") {
    if (userChoice === "Paper") {
      win();
    } else if (userChoice === "Scissors") {
      loss();
    }
  } else if (computerChoice === "Paper") {
    if (userChoice === "Rock") {
      loss();
    } else if (userChoice === "Scissors") {
      win();
    }
  } else if (computerChoice === "Scissors") {
    if (userChoice === "Rock") {
      win();
    } else if (userChoice === "Paper") {
      loss();
    }
  }
}

function win() {
  gameEnd()
  resultText.innerHTML = "You Won"
  playAgainButton.style.display = "none";
  continueButton.style.display = "block";
}

function loss() {
  gameEnd()
  playAgainButton.style.display = "block";
  continueButton.style.display = "none";
  console.log("You Lose")
  resultText.innerHTML = "You Lose"

}

function tie() {
  gameEnd()

  console.log("You Tie")
  resultText.innerHTML = "You Tie"

}
function gameEnd() {
  choiceScreen.style.display = "none"
  resultScreen.style.display = "block"

}

function playAgain() {
  choiceScreen.style.display = "block"
  resultScreen.style.display = "none"

}
playAgainButton.addEventListener("click", function() {
  playAgain();
  console.log("Play Again Button is clicked")
})

continueButton.addEventListener("click", function() {
  console.log("Continue Button is clicked");
})

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

