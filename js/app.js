

/* -------------------------------------Screen Management -----------------------------*/

function showScreen(screenId) {
  const screens = ['introScreen', 'monteScreen','quizScreen','resultScreen'];
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

const cardWrappers = ['card1Wrapper', 'card2Wrapper', 'card3Wrapper'];
const positions = [0, 160, 320];  // Card left positions in pixels


/*------------------------------------- Variables (state) ---------------------------------*/

let gameState = {
  stage:1,
  score:0,
  topic: null,
  totalStages:5,
  pointsToWin:12
};

let isMonteTurn = true;

let currentOrder = [...cardWrappers];
let queenCard = 'card2Wrapper';
let winningCard = null;

let currentTopic = null;
let currentQuestionSet = [];
let currentQuestionIndex = 0;

// Track Monte and Quiz points per stage
let gameProgress = Array(gameState.totalStages).fill(null).map(() => ({ monte: 0, quiz: 0 }));



/*---------------------------------- Cached Element References  ---------------------------*/

const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteScreen');
const quiz = document.getElementById('quizScreen');
const results = document.getElementById('resultsScreen');

const playNowBtn = document.getElementById('playNow');
const shuffleBtn = document.getElementById('shuffleBtn');
const nextBtn = document.getElementById('nextBtn');

const topicRadios = document.querySelectorAll('input[name="quizTopic"]');

const messageEl = document.getElementById('gameMessage');
const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const messageElement = document.getElementById('guizMessage');



/*----------------------------------- Functions -------------------------------------------*/

// Show the active screen and hide others
function showScreen(screenId) {
  const screens = ['introScreen', 'monteScreen', 'quizScreen', 'resultsScreen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = (id === screenId) ? 'block' : 'none';
    }
  });
}

// Shuffle an array (Fisher-Yates)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Position cards by given order
function positionCards(order) {
  order.forEach((id, i) => {
    const card = document.getElementById(id);
    if (card) card.style.left = positions[i] + 'px';
  });
}

// Flip all cards face down (back side)
function flipAllCardsBack() {
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) card.classList.add('flipped');
  });
}

// Flip specific card face up (show)
function flipCardFaceUp(id) {
  const card = document.getElementById(id);
  if (card) card.classList.remove('flipped');
}

// Update winningCard by finding where the queenCard is in currentOrder after shuffle
function updateWinningCard() {
  winningCard = currentOrder.find(id => id === queenCard);
}

// Enable clicking on cards for guessing
function enableGuessing() {
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      card.onclick = () => {
        flipCardFaceUp(id);
        checkGuess(id);
      };
    }
  });
}

// Disable clicking on cards
function disableGuessing() {
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) {
      card.onclick = null;
    }
  });
}

// Check user’s guess and display result

function checkGuess(id) {
  if (id === winningCard) {
    messageEl.textContent = '✅ Correct! You found the Queen of Hearts! +2 Points';
    gameProgress[gameState.stage - 1].monte += 2;
    gameState.score += 2;
  } else {
    messageEl.textContent = '❌ Wrong card. No points this round.';
  }
  updateScoreStageDisplay();
  disableGuessing();

  isMonteTurn = false;

  setTimeout(() => {
    nextRound();
  }, 2500);
}


// Animate shuffling recursively
function animateShuffle(times = 5, delay = 400) {
  if (times === 0) {
    updateWinningCard();
    enableGuessing();
    return;
  }
  setTimeout(() => {
    currentOrder = shuffle([...currentOrder]);
    positionCards(currentOrder);
    animateShuffle(times - 1, delay);
  }, delay);
}

// Start a Monte round
function startMonteRound() {
  messageEl.textContent = '';
  disableGuessing();

  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) card.classList.remove('flipped'); // Face up
  });
  positionCards(currentOrder);

  // Memorization period then flip back and shuffle
  setTimeout(() => {
    flipAllCardsBack();

    setTimeout(() => {
      animateShuffle();
    }, 700);
  }, 3500); // Memorization duration
}

// Filter questions by selected topic
function filterQuestionsByTopic(selectedTopic) {
  return quizBank.filter(q => q.topic === selectedTopic);
}

// Shuffle questions array
function shuffleQuestions(questionArray) {
  return shuffle(questionArray);
}

// Called when player selects topic, load filtered and shuffled quiz questions
function onTopicSelected(topic) {
  currentTopic = topic;
  currentQuestionSet = shuffleQuestions(filterQuestionsByTopic(topic));
  currentQuestionIndex = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

// Reset quiz state UI
function resetState() {
  nextBtn.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  messageEl.textContent = '';
}

// Show current quiz question and answer buttons
function showQuestion() {
  resetState();

  if (currentQuestionIndex >= currentQuestionSet.length) {
    nextRound(); // Quiz finished, proceed
    return;
  }

  const currentQuestion = currentQuestionSet[currentQuestionIndex];
  questionEl.innerHTML = `<strong>Q${currentQuestionIndex + 1}:</strong> ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    gameProgress[gameState.stage - 1].quiz += 2;
    gameState.score += 2;
    messageElement.textContent = '✅ Correct! Your answer is right! +2 Points';
  } else {
    selectedBtn.classList.add('incorrect');
    messageElement.textContent = '❌ Wrong answer. No points this round.';
  }
  updateScoreStageDisplay();
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextBtn.style.display = 'block';
}

// Advance to next quiz question
function quizNextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

// Start quiz round (called in nextRound)
function startQuizRound() {
  if (!currentTopic) {
    messageEl.textContent = "Please select a topic before starting the quiz.";
    showScreen('introScreen');
    return;
  }
  currentQuestionIndex = 0;
  showQuestion();
}

// Display the final results screen
function displayResults() {
  // Clear quiz UI
  questionEl.innerHTML = "";
  answerButtons.innerHTML = "";
  messageEl.textContent = `Game Over! Your total score is ${gameState.score} points.`;
  nextBtn.style.display = 'none';
  showScreen('resultsScreen');
}

// Control game rounds and screen switching
function nextRound() {
  if (gameState.stage > gameState.totalStages) {
    displayResults();
    return;
  }

  if (isMonteTurn) {
    showScreen('monteScreen');
    positionCards(currentOrder);
    currentOrder.forEach(id => {
      const card = document.getElementById(id);
      if (card) card.classList.remove('flipped');
    });
    disableGuessing();

    
  } else {
    showScreen('quizScreen');
    if (!currentQuestionSet.length) {
      currentQuestionSet = shuffleQuestions(filterQuestionsByTopic(currentTopic));
    }
    startQuizRound();
    isMonteTurn = true;  
    gameState.stage++;
  }
}

/*------------------------------------ Event Listener -------------------------------------*/

topicRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    playNowBtn.disabled = false;
    onTopicSelected(radio.value);
  });
});

playNowBtn.addEventListener('click', () => {
  gameState.stage = 1;
  isMonteTurn = true;
  showScreen('monteScreen');
  positionCards(currentOrder);
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) card.classList.remove('flipped');
  });
  disableGuessing();

});


shuffleBtn.addEventListener('click', () => {
  messageEl.textContent = "";  
  startMonteRound();
  disableGuessing();
});

nextBtn.addEventListener('click', () => {
  if (!isMonteTurn) {
    quizNextQuestion();
  } else {
    nextRound();
  }
});

/* ------------------------------------Initial Setup on Page Load -------------------------------*/

window.onload = () => {
  showScreen('introScreen');
  positionCards(currentOrder);
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if (card) card.classList.remove('flipped');
  });
  disableGuessing();
};






