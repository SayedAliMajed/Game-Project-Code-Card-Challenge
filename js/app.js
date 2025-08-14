/*-------------- Constants -------------*/
const startBtn = document.getElementById('playNow');
const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteContainer');
const shuffleBtn = document.getElementById('shuffleBtn');
const playingCardsEL= document.getElementsByClassName('playingCard');
const tableEl = document.getElementById('cardTable');




/*---------- Variables (state) ---------*/
let playingCard = ['card1','card2','card3'];
let shuffleDuration = 3000;
let shuffleSpeed = 200;


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


/*-------------- Event Listener -------------*/
 startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    monte.style.display = 'flex';
  });

  shuffleBtn.addEventListener('click', () => {
    playingCard = shuffle(playingCard);
    console.log("Shuffled order:", playingCard);
    renderCards(playingCard);
  });

