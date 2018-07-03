/*
 * Create a list that holds all of your cards
 */
 // Establish the array which acts as a data source for the list
 const icons = ["fa fa-diamond", "fa fa-anchor", "fa fa-paper-plane-o", "fa fa-bicycle", "fa fa-leaf", "fa fa-cube", "fa fa-bolt", "fa fa-bomb", "fa fa-diamond", "fa fa-anchor", "fa fa-paper-plane-o", "fa fa-bicycle", "fa fa-leaf", "fa fa-cube", "fa fa-bolt", "fa fa-bomb"];

/*
 * Display the cards on the page/Create the cards
 *   - shuffl e the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 
 const CardsContainer = document.querySelector(".deck");
 let OpenCards = [];
//need to create a new array, because OpenCards is always reset.
 let matchedCards = [];  

 
 /// Popups
 
 //Defining total time for popup//
 let totalTime = document.getElementById("totalTime");

 //Defining modal by id//
 // Get the modal
 let popup = document.getElementById("popup");

 
 
// Create the cards. Initialize the game
  function init () {
	 for (let i =0; i < icons.length; i++) {
	const card = document.createElement("li");
	card.classList.add("card"); 

	// Add icons. //another way to do this: <i class = '" + icons[i] + "'</i>";
	card.innerHTML = `<i class="${icons[i]}"> </i>`;
    
	CardsContainer.appendChild(card);
		
	//Add click event to each card.
	click(card);
	popup.style.visibility = 'hidden'; 
	}
}

////Timer items

let minutes = 0;
let seconds = 0;
let interval = 0;
let timer = document.querySelector('.timer');
timer.innerHTML = minutes + " mins : " + seconds + " secs";	
	
///Timer function

 function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minutes + " mins : " + seconds + " secs";
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
 }

	/// Stop timer function
 function stopTimer() {
  clearInterval(interval);
  popup.style.visibility = 'hidden';
 }
 
 
//Click event
 
 function click(card) {
	// Card Click Event. Should be in the same loop so it's applied to all cards.
	card.addEventListener("click", function () {
		// to make code shorter, add variables
		const currentCard = this;
		const previousCard = OpenCards[0];
		startTimer();
		//Here we have an existing opened card.
		if (OpenCards.length === 1) {
			//it needs to show icon, but to check if cards show : console.log(card.innerHTML); //"this" refers to "card"
			card.classList.add("open", "show", "disabled");
			OpenCards.push(this);
				//Here we compare the two opened cards. PreviousCard[0]/OpenCards[0] is the first opened card. "This"/CurrentCard still refers to "card".
				compare(currentCard, previousCard);				
				

		//Here we don't have any opened cards. (same as if there is an opened card.)
		} else {
		currentCard.classList.add("open", "show", "disabled");
		OpenCards.push(this);
		}
	});
	}
 
//// Compare the 2 cards.

function compare(currentCard, previousCard) {
	
		//The matcher
		if (currentCard.innerHTML === previousCard.innerHTML) {
		//Matched
		currentCard.classList.add("match");
		previousCard.classList.add("match");
			
		matchedCards.push(currentCard, previousCard);
		OpenCards = [];
		
		// Is the game over? Check!
		isOver();
								
		} else {
		//delay action so first card stays open until second.
				setTimeout(function() {
				// We could say: console.log("Doesn't match!") but we have to remove open and show classes
				currentCard.classList.remove("open", "show", "disabled");
				previousCard.classList.remove("open", "show", "disabled");
				}, 500); //-> wait 500 miliseconds then do it.
		
				OpenCards = [];				
				
		}
		//Add new move
		addMove();
}
 
 
 
 ///To check if the game is over
	 
function isOver() {
	if(matchedCards.length === icons.length) {
		alert("GAME OVER!");
		congratsPopup();
		 /*
         * Display your popup here, the `alert` is for explanation only!
         * 
         * In your popup, you should create a button, 
         * To let the user play a new game
         * 
         * After clicking on that button, you should:
         *  - Call the `init` function to re-create the cards
         *  - Call the `reset` function to reset all variables
         */
		
		stopTimer();
		}
}	 

 /// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
	
//// Add moves

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
	function addMove() {
		moves++;
		movesContainer.innerHTML = moves;	
	
	//Set the rating
	rating();

	}


////Rating

	
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>
							<li><i class="fa fa-star"></i></li>`;
							
function rating() {
	if (5 < moves) {
		starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li> 
									<li><i class="fa fa-star"></i></li>`;
		stars = 2; //star count will be 2 stars//
		
} else if (moves > 10) {`<li><i class="fa fa-star"></i></li>`;
		 stars = 1; //star count will be 2 stars//	
	}
}	
	
///congrats Popup function
 
  function congratsPopup() {

  popup.style.visibility = 'visible'; //popup will display with game details//
  //display moves taken on the popup//
  document.getElementById("totalMoves").innerHTML = moves;
  //display the time taken on the popup//
  finishTime = timer.innerHTML;
  document.getElementById("totalTime").innerHTML = finishTime;
  //display the star rating on the popup//
  document.getElementById("starRating").innerHTML = stars;
  console.log("Modal should show"); //testing comment for console//

 }
 
	
	
	
/// Restart button

const restartbutton = document.querySelector(".restart");
	restartbutton.addEventListener("click", function () {
	///Delete all cards
	CardsContainer.innerHTML = "";
	
	///Call init to create new cards
	init();						
	startTimer();
	
	//Randomize cards
	shuffle(icons);
	
	
	//Reset any related variables
	matchedCards = [];
	moves = 0;
	movesContainer.innerHTML = moves;	
	starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
	
	//reset the timer
	seconds = 0;
	minutes = 0;
	timer.innerHTML = minutes + " mins : " + seconds + " secs";

	stopTimer(); //reset timer
});
	 
	 
	 
/// Start the game for the first time.
init();	 
	 	 
	 

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 