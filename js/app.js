
function showScreen(screenId) {
  const screens = ['introScreen', 'monteScreen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === screenId) ? 'block' : 'none';
    }
  });
}

// Show Intro screen on page load
showScreen('introScreen');

/*--------------------------------------- Constants --------------------------------------*/
const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteScreen');

const playNowBtn = document.getElementById('playNow');
const shuffleBtn = document.getElementById('shuffleBtn');

const topicRadios = document.querySelectorAll('input[name="quizTopic"]');

const wholeCard = document.querySelectorAll('.wholeCard');
const cardTable = document.getElementById('cardTable');
const cardWrappers = ['card1Wrapper', 'card2Wrapper', 'card3Wrapper'];
const positions = [0, 160, 320];  // left px positions for cards
const messageEl = document.getElementById('gameMessage');


/*------------------------------------- Variables (state) ---------------------------------*/

let gameState = {
  stage:1,
  score:0,
  topic: null,
  totalStages:5,
  pointsToWin:12
};

let playingCard = ['card1','card2','card3'];
let shuffleDuration = 3000;
let shuffleSpeed = 200;
let elapsed = 0;
playNowBtn.disabled = true;


let currentOrder = [...cardWrappers];
let winningCard = null;


/*---------------------------------- Cached Element References  ---------------------------*/





/*----------------------------------- Functions -------------------------------------------*/

topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});

// shuffle cards

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] =
      [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function positionCards(order) {
  order.forEach((id, i) => {
    const card = document.getElementById(id);
    card.style.left = positions[i] + 'px';
  });
}

function flipAllCardsBack() {
  currentOrder.forEach(id => {
    document.getElementById(id).classList.add('flipped');
  });
}

function flipCardFaceUp(id) {
  document.getElementById(id).classList.remove('flipped');
}

function enableGuessing() {
  currentOrder.forEach(id => {
    document.getElementById(id).onclick = () => {
      flipCardFaceUp(id);
      checkGuess(id);
    };
  });
}

function disableGuessing() {
  currentOrder.forEach(id => {
    document.getElementById(id).onclick = null;
  });
}

function checkGuess(id) {
  if (id === winningCard) {
    messageEl.textContent= '✅Correct! You found the Queen of Hearts! + 2 Points';
    gameState.score+= 2;
  } else {
    messageEl.textContent = '❌ Wrong card. No points this round.';
  }
  disableGuessing();

  // move to quiz after a short delay
  setTimeout(() => {
    startQuizQuestion();
  }, 1500);
}


function animateShuffle(times = 5, delay = 400) {
  if (times === 0) {
    enableGuessing();
    return;
  }
  setTimeout(() => {
    currentOrder = shuffle([...currentOrder]);
    positionCards(currentOrder);
    animateShuffle(times - 1, delay);
  }, delay);
}

function startMonteRound() {
  disableGuessing();


  currentOrder.forEach(id => {
    document.getElementById(id).classList.remove('flipped');
  });
  positionCards(currentOrder);

  // After 3 seconds, flip cards back and shuffle
  setTimeout(() => {
    flipAllCardsBack();

    setTimeout(() => {
      animateShuffle();
    }, 700); // wait for flip animation to complete
  }, 5000); // memorization duration
}
function resetCardsFaceUp() {
  currentOrder.forEach(id => {
    let card = document.getElementById(id);
    card.classList.remove('flipped');
  });
}


/*------------------------------------ Event Listener -------------------------------------*/

// Enable play button when a quiz topic is selected
topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});

// Start game: show monte screen and start round
playNowBtn.addEventListener('click', () => {
  showScreen('monteScreen');
  positionCards(currentOrder);
  currentOrder.forEach(id => {
    document.getElementById(id).classList.remove('flipped');  // cards face up
  });
  disableGuessing();  // disable clicking until shuffle
});

// Shuffle button to repeat shuffling process inside monte screen
shuffleBtn.addEventListener('click', () => {
  startMonteRound();  // flips cards back, shuffle animation, enable guessing
  disableGuessing();
});
// Initial setup when page loads
window.onload = () => {
  showScreen('introScreen');
  positionCards(currentOrder);
  currentOrder.forEach(id => {
    document.getElementById(id).classList.remove('flipped');
  });
  disableGuessing();
};