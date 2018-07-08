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
 rateContainer = document.querySelector("#total_rate");
 

 
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

///Timer items
let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = 0;
let timer = document.querySelector('.timer');
	
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
 }

//Click event
 
 function click(card) {
	// Card Click Event. Should be in the same loop so it's applied to all cards.
	card.addEventListener("click", function () {
		startTimer();
		// to make code shorter, add variables
		const currentCard = this;
		const previousCard = OpenCards[0];
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
		congratsPopup();
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

    // Display the modal
    popup.style.top = "0";

    // Add moves to the Modal
    const totalMoves = document.querySelector("#total_moves");
    totalMoves.innerHTML = moves;

    // Add Rate
    starsContainer.innerHTML = total_rate;

    // Stop Timer
    stopTimer();

    // Add time to the Modal
    const totalHours       = document.querySelector("#totalHours");
    const totalMinutes     = document.querySelector("#totalMinutes");
    const totalSeconds     = document.querySelector("#totalSeconds");
    totalHours.innerHTML   = hours;
    totalMinutes.innerHTML = minutes;
    totalSeconds.innerHTML = seconds;

	}


	
/// Restart button

const restartbutton = document.querySelector(".restart");
	restartbutton.addEventListener("click", function () {
	///Delete all cards
	CardsContainer.innerHTML = "";
	
	///Call init to create new cards
	init();						
	
	
	
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
