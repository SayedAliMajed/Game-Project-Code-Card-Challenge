function showScreen(screenId) {
  const screens = ['introScreen', 'monteContainer', 'quizContainer', 'resultScreen'];
  screens.forEach(id => {
    document.getElementById(id).style.display = (id === screenId) ? 'flex' : 'none';
  });
}

// To show Intro Screen at start
showScreen('introScreen');

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
const topicRadios = document.querySelectorAll('input[name="quizTopic"]');
const scoreEl = document.getElementById('scoreDisplay');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');

// Questions

const questions = [
    {
        question:'Which keyword is used to declare a variable in JavaScript that cannot be reassigned?',
        answers: [
            {text: 'Var', correct:false},
            {text: 'let', correct:false},
            {text: 'const', correct:true},
        ]
    },
    {
        question:'What is the purpose of the addEventListener() method in JavaScript?',
        answers: [
            {text: 'To create a new HTML element.', correct:false},
            {text: 'To attach an event handler to a specified element.', correct:true},
            {text: 'To remove an HTML element from the DOM.', correct:false},
        ]
    }
]



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
    let intervalId = setInterval(() => {
    elapsed += shuffleSpeed;
    
    let i = Math.floor(Math.random() * cards.length);
    let j = Math.floor(Math.random() * cards.length);
    swapCardPositions(cards, i, j);

    if (elapsed >= shuffleDuration) {
      clearInterval(intervalId);

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

function startMonteRound() {
  flipCardsFront();

  setTimeout(() => {
    flipCardsBack();
    animateShuffle(playingCard);

    setTimeout(() => {
      flipCardsFront();

      // After Monte round ends, move to quiz screen:
      showScreen('quizContainer');
      startQuiz();

    }, shuffleDuration + 100);
  }, 1500);
}

/* ------------------------ Quiz Screen ----------------------*/

function startQuiz() {
  currentQuestionIndex = 0;
  submitBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionEl.textContent = questionNo + ". " + currentQuestion.question;

  answerButtons.innerHTML = '';  // clear old buttons before adding new ones
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
  });
}

/*-------------- Event Listener -------------*/
 
playNowBtn.addEventListener('click', () => {

 const selectedTopic = document.querySelector('input[name="quizTopic"]:checked');
  if (selectedTopic) {
    gameState.topic = selectedTopic.value;
  }
  gameState.score = 0;
  gameState.stage = 1;

  showScreen('monteContainer');
  startMonteRound();
});

shuffleBtn.addEventListener('click', () => {
 
  flipCardsBack(); // all face-down
  animateShuffle(playingCard);
  setTimeout(() => {
    flipCardsFront(); // reveal after shuffle finishes
  }, shuffleDuration + 100); // little buffer after animation*/
});

// Enable Play Now when a topic is selected
topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
  });
});



