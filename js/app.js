
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

/*------------------------------------- Variables (state) ---------------------------------*/

let gameState = {
  stage:1,
  score:0,
  topic: null,
  totalStages:5,
  pointsToWin:12
};



/*---------------------------------- Cached Element References  ---------------------------*/





/*----------------------------------- Functions -------------------------------------------*/
playNowBtn.disabled = true;
topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});

function startMonteRound() {
  console.log("startMonteRound called - implement game logic here.");
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
  console.log('Shuffle started');
});

