
/*--------------------------------------- Constants --------------------------------------*/
const cardWrappers = ['card1Wrapper','card2Wrapper','card3Wrapper'];
const positions = [0,160,320];
const TOTAL_STAGES = 5;
const POINTS_TO_WIN = 12;

/*------------------------------------- State --------------------------------------------*/
let gameState = {
  stage: 1,
  score: 0,
  topic: null,
  totalStages: TOTAL_STAGES,
  pointsToWin: POINTS_TO_WIN
};

let isMonteTurn = true;
let currentOrder = [...cardWrappers];
let queenCard = 'card2Wrapper';
let winningCard = null;

let currentTopic = null;
let currentQuestionSet = [];
let currentQuestionIndex = 0;

let gameProgress = Array(TOTAL_STAGES).fill(null).map(() => ({ monte: 0, quiz: 0 }));

/*----------------------------------- Utility Functions ---------------------------------*/
function showScreen(screenId) {
  const screens = ['introScreen', 'monteScreen', 'quizScreen', 'resultsScreen'];
  
  screens.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.remove('active');
      element.style.display = 'none';
    }
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    targetScreen.style.display = 'block';
  }
}

function shuffle(array) {
  let arr = [...array];
  for(let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function positionCards(order) {
  order.forEach((id, index) => {
    const card = document.getElementById(id);
    if(card) card.style.left = positions[index] + 'px';
  });
}

function updateHUD() {
  const stageDisplay = document.getElementById('stageDisplay');
  const scoreDisplay = document.getElementById('scoreDisplay');
  if(stageDisplay) stageDisplay.textContent = gameState.stage;
  if(scoreDisplay) scoreDisplay.textContent = gameState.score;
}

/*------------------------------------ Monte Functions -----------------------------------*/
function updateWinningCard() {
  winningCard = currentOrder.find(id => id === queenCard);
}

function enableGuessing() {
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if(card) {
      card.onclick = () => {
        // Show the front of the card
        const cardBack = card.querySelector('.cardBack');
        const cardFront = card.querySelector('.cardFront');
        if(cardBack) cardBack.style.display = 'none';
        if(cardFront) cardFront.style.display = 'block';
        checkGuess(id);
      }
    }
  });
}

function disableGuessing() {
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if(card) card.onclick = null;
  });
}

function checkGuess(id) {
  console.log("Card guessed:", id, "Winning card:", winningCard);
  
  const monteMessage = document.getElementById('gameMessage');
  
  if(id === winningCard) {
    gameProgress[gameState.stage - 1].monte += 2;
    gameState.score += 2;
    if(monteMessage) monteMessage.textContent = '✅ Correct! You found the Queen of Hearts! +2 Points';
  } else {
    if(monteMessage) monteMessage.textContent = '❌ Wrong card. No points this round.';
  }
  
  updateHUD();
  disableGuessing();
  
  isMonteTurn = false;
  setTimeout(() => {
    nextRound();
  }, 1500);
}

function animateShuffle(times = 5, delay = 400) {
  if(times === 0) {
    updateWinningCard();
    enableGuessing();
    const monteMessage = document.getElementById('gameMessage');
    if(monteMessage) monteMessage.textContent = 'Click a card to find the Queen of Hearts!';
    return;
  }
  setTimeout(() => {
    currentOrder = shuffle(currentOrder);
    positionCards(currentOrder);
    animateShuffle(times - 1, delay);
  }, delay);
}

function startMonteRound() {
  const monteMessage = document.getElementById('gameMessage');
  
  if(monteMessage) monteMessage.textContent = 'Memorize the Queen of Hearts position...';
  
  disableGuessing();
  
  currentOrder.forEach(id => {
    const card = document.getElementById(id);
    if(card) {
      const cardBack = card.querySelector('.cardBack');
      const cardFront = card.querySelector('.cardFront');
      if(cardBack) cardBack.style.display = 'none';
      if(cardFront) cardFront.style.display = 'block';
    }
  });
  positionCards(currentOrder);
  
  setTimeout(() => {
    if(monteMessage) monteMessage.textContent = 'Shuffling cards...';
    currentOrder.forEach(id => {
      const card = document.getElementById(id);
      if(card) {
        const cardBack = card.querySelector('.cardBack');
        const cardFront = card.querySelector('.cardFront');
        if(cardBack) cardBack.style.display = 'block';
        if(cardFront) cardFront.style.display = 'none';
      }
    });
    
    setTimeout(() => {
      animateShuffle();
    }, 700);
  }, 3000);
}

/*-------------------------------------- Quiz Functions -----------------------------------*/
function filterQuestionsByTopic(topic) {
  return quizBank.filter(q => q.topic === topic);
}

function onTopicSelected(topic) {
  currentTopic = topic;
  currentQuestionSet = shuffle(filterQuestionsByTopic(topic));
  currentQuestionIndex = 0;
  
  const playNowBtn = document.getElementById('playNow');
  if(playNowBtn) {
    playNowBtn.disabled = false;
    console.log("Play button enabled for topic:", topic);
  }
}

function resetQuizUI() {
  const quizMessage = document.getElementById('quizMessage');
  const answerButtons = document.getElementById('answer-buttons');
  const nextBtn = document.getElementById('nextBtn');
  
  if(quizMessage) quizMessage.textContent = '';
  if(answerButtons) answerButtons.innerHTML = '';
  if(nextBtn) nextBtn.style.display = 'none';
}

function showQuestion() {
  resetQuizUI();
  
  if(currentQuestionIndex >= currentQuestionSet.length) {
    currentQuestionIndex = 0;
  }
  
  const currentQuestion = currentQuestionSet[currentQuestionIndex];
  const questionEl = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  
  if(questionEl && currentQuestion) {
    questionEl.innerHTML = `<strong>Q${currentQuestionIndex + 1}:</strong> ${currentQuestion.question}`;
  }
  
  if(answerButtons && currentQuestion) {
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.classList.add('btn');
      button.onclick = () => selectAnswer(answer.correct);
      answerButtons.appendChild(button);
    });
  }
  
  console.log("Showing question:", currentQuestionIndex + 1, "isMonteTurn:", isMonteTurn);
}

function selectAnswer(correct) {
  console.log("Answer selected:", correct);
  
  const quizMessage = document.getElementById('quizMessage');
  const answerButtons = document.getElementById('answer-buttons');
  
  if(correct) {
    gameProgress[gameState.stage - 1].quiz += 2;
    gameState.score += 2;
    if(quizMessage) quizMessage.textContent = '✅ Correct! Your answer is right! +2 Points';
  } else {
    if(quizMessage) quizMessage.textContent = '❌ Wrong answer. No points this round.';
  }
  
  updateHUD();
  
  if(answerButtons) {
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if(btn.textContent === currentQuestionSet[currentQuestionIndex].answers.find(a => a.correct).text) {
        btn.classList.add('correct');
      }
    });
  }
  
  currentQuestionIndex++;
  isMonteTurn = true;
  
  setTimeout(() => {
    nextRound();
  }, 2000);
}

/*------------------------------- Game Controller --------------------------------------*/
function nextRound() {
 
  
  if(isMonteTurn) {
    gameState.stage++;
    if(gameState.stage > gameState.totalStages) {
      return displayResults();
    }
    
    showScreen('monteScreen');
    updateHUD();
    startMonteRound();
  } else {
    showScreen('quizScreen');
    showQuestion();
  }
}

function displayResults() {
  showScreen('resultsScreen');
  
  const finalScore = document.getElementById('final-score');
  const totalQuestions = document.getElementById('total-questions');
  const feedbackText = document.getElementById('feedback-text');
  const resultsTableContainer = document.getElementById('resultsTableContainer');
  
  if(finalScore) finalScore.textContent = gameState.score;
  if(totalQuestions) totalQuestions.textContent = gameState.totalStages * 2;
  if(feedbackText) {
    feedbackText.textContent = gameState.score >= gameState.pointsToWin ? 
      '🎉 Well done! You won the game!' : 
      '😅 Keep trying! You can beat the game next time.';
  }

  if(resultsTableContainer) {
    let html = `<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                  <thead><tr>
                    <th>Stage</th><th>Monte Points</th><th>Quiz Points</th><th>Total Points</th><th>Cumulative Score</th>
                  </tr></thead><tbody>`;

    let cumulative = 0;
    for(let i = 0; i < gameProgress.length; i++) {
      const montePts = gameProgress[i].monte;
      const quizPts = gameProgress[i].quiz;
      const totalPts = montePts + quizPts;
      cumulative += totalPts;

      html += `<tr>
                 <td>${i + 1}</td>
                 <td>${montePts}</td>
                 <td>${quizPts}</td>
                 <td>${totalPts}</td>
                 <td>${cumulative}</td>  
               </tr>`;
    }
    
    html += `<tr style="font-weight: bold;">
               <td>Total</td>
               <td>${gameProgress.reduce((sum, gp) => sum + gp.monte, 0)}</td>
               <td>${gameProgress.reduce((sum, gp) => sum + gp.quiz, 0)}</td>
               <td>${gameState.score}</td>
               <td>-</td>
             </tr>`;
    
    html += `</tbody></table>`;
    resultsTableContainer.innerHTML = html;
  }
}


/*---------------------------------- Event Listeners ------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, setting up event listeners");
  
  const topicRadios = document.querySelectorAll('input[name="quizTopic"]');
  const playNowBtn = document.getElementById('playNow');
  const restartBtn = document.getElementById('restartBtn');
  

  if(playNowBtn) {
    playNowBtn.disabled = false; 
  }
  

  topicRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      onTopicSelected(radio.value);
    });
  });

  
  playNowBtn.addEventListener('click', () => {
    if(!currentTopic) {
      currentTopic = "JS";
      currentQuestionSet = shuffle(filterQuestionsByTopic(currentTopic));
      currentQuestionIndex = 0;
    }
    
    gameState.stage = 1;
    gameState.score = 0;
    gameProgress = Array(TOTAL_STAGES).fill(null).map(() => ({ monte: 0, quiz: 0 }));
    currentQuestionIndex = 0;
    isMonteTurn = true;
    
    showScreen('monteScreen');
    updateHUD();
    startMonteRound();
  });

 
  restartBtn.addEventListener('click', () => {
    gameState.stage = 1;
    gameState.score = 0;
    gameProgress = Array(TOTAL_STAGES).fill(null).map(() => ({ monte: 0, quiz: 0 }));
    currentTopic = null;
    currentQuestionSet = [];
    currentQuestionIndex = 0;
    isMonteTurn = true;
    playNowBtn.disabled = false; 
    monteMessage.textContent = '';
    quizMessage.textContent = '';
    showScreen('introScreen');
  });
  
  // Initialize game
  showScreen('introScreen');
  updateHUD();
  positionCards(currentOrder);
  disableGuessing();
  
});
