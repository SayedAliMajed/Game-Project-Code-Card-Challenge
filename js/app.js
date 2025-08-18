
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

/*---------------------------------- Cached Element References  ---------------------------*/





/*----------------------------------- Functions -------------------------------------------*/

topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});

/*function startMonteRound() {
  console.log("startMonteRound called - implement game logic here.");
}*/

// shuffle cards

function shuffle(cards) {
  let currentIndex = cards.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [cards[currentIndex], cards[randomIndex]] =
      [cards[randomIndex], cards[currentIndex]];
  }
  return cards;
}

function flipCardsBack() {
  // Add 'flipped' class to flip cards back
 wholeCard.forEach(card => {
    card.classList.add('flipped');
  });
}


/*------------------------------------ Event Listener -------------------------------------*/
playNowBtn.addEventListener('click', () => {
  const selectedTopic = document.querySelector('input[name="quizTopic"]:checked');
  if (selectedTopic) {
    gameState.topic = selectedTopic.value;
  }
  gameState.score = 0;
  gameState.stage = 1;
 
  showScreen('monteScreen');
  startMonteRound();

});

shuffleBtn.addEventListener('click', () => {
  
});

document.getElementById('shuffleBtn').addEventListener('click', function() {
  flipCardsBack();               // All cards face off

});
