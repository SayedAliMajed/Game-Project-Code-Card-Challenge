function showScreen(screenId) {
  const screens = ['introScreen', 'monteContainer', 'quizContainer', 'resultContainer'];
  screens.forEach(id => {
    document.getElementById(id).style.display = (id === screenId) ? 'flex' : 'none';
  });
}

// To show Intro Screen at start
showScreen('quizContainer');

/*-------------- Constants -------------*/
const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteContainer');
const quizScreen = document.getElementById('quizContainer');
const resultScreen = document.getElementById('resultScreen');

const playNowBtn = document.getElementById('playNow');
const shuffleBtn = document.getElementById('shuffleBtn');
const submitBtn = document.getElementById('submitBtn');

const playingCardsEL= document.getElementsByClassName('playingCard');
const tableEl = document.getElementById('cardTable');
const cardWrappers = document.getElementsByClassName('wholeCard');
const topicRadios = document.querySelectorAll('input [name ="quizTopic"]');
const scoreEl = Document.getElementById('scoreDisplay');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

const questions = require('./Data.js');



/*---------- Variables (state) ---------*/
let playingCard = ['card1','card2','card3'];
let shuffleDuration = 3000;
let shuffleSpeed = 200;
let elapsed = 0;
playNowBtn.disabled = true;

let gameState = {
  stage:1,
  score:0,
  topic: null,
  totalStages:5,
  pointsToWin:12
};

let currentQuestionIndex =0;



/*----- Cached Element References  -----*/


/*------------------------------ Functions -----------------------------------------------*/
/* ------------------------ Monte Screen ----------------------*/
// Fisher–Yates shuffle algorithm
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

function renderCards(order) {
  order.forEach(id => {
    const cardWrapper = document.getElementById(id).closest('.wholeCard'); 
    tableEl.appendChild(cardWrapper);
  });
}

function swapCardPositions(cards, i, j) {
  [cards[i], cards[j]] = [cards[j], cards[i]];
  renderCards(cards);
}

//Animation Shuffle cards, but the final shuffling will be from Fisher-Yates.

function animateShuffle(cards) {
    elapsed = 0;
    let itervalId = setInterval(() => {
    elapsed += shuffleSpeed;
    
    let i = Math.floor(Math.random() * cards.length);
    let j = Math.floor(Math.random() * cards.length);
    swapCardPositions(cards, i, j);

    if (elapsed >= shuffleDuration) {
      clearInterval(itervalId);

      cards = shuffle(cards);
      renderCards(cards);
    }
  }, shuffleSpeed);
}

function flipCardsBack() {
  playingCard.forEach((id, index) => {
    cardWrappers[index].classList.add('flipped');
  });
}

function flipCardsFront() {
  for (let i = 0; i < cardWrappers.length; i++) {
    cardWrappers[i].classList.remove('flipped');
  }
}
/* ------------------------ Quiz Screen ----------------------*/

function startQuiz() {
  questions.currentQuestionIndex =0;
  submitBtn.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  let currentQuestion = questions[questions.currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
  });
}

/*-------------- Event Listener -------------*/
 startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    monte.style.display = 'flex';
  });

shuffleBtn.addEventListener('click', () => {
  flipCardsBack(); // all face-down
  animateShuffle(playingCard);
  setTimeout(() => {
    flipCardsFront(); // reveal after shuffle finishes
  }, shuffleDuration + 100); // little buffer after animation
});

// Enable Play Now when a topic is selected
topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});

playNowBtn.addEventListener('click', () => {
  const selectedTopic = document.querySelector('input[name="quizTopic"]:checked');
  if (selectedTopic) {
    gameState.topic = selectedTopic.value;
  }

  gameState.score = 0;
  gameState.stage = 1;
})

