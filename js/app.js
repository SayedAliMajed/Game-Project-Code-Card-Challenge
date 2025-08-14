/*-------------- Constants -------------*/
const startBtn = document.getElementById('playNow');
const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteContainer');
const shuffleBtn = document.getElementById('shuffleBtn');
const playingCardsEL= document.getElementsByClassName('playingCard');
const tableEl = document.getElementById('cardTable');
const cardWrappers = document.getElementsByClassName('wholeCard');




/*---------- Variables (state) ---------*/
let playingCard = ['card1','card2','card3'];
let shuffleDuration = 3000;
let shuffleSpeed = 200;
let elapsed = 0;


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/
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

