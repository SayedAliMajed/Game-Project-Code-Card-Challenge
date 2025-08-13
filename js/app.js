/*-------------- Constants -------------*/
const startBtn = document.getElementById('playNow');
const intro = document.getElementById('introScreen');
const monte = document.getElementById('monteContainer');
const shuffleBtn = document.getElementById('shuffleBtn');

const playingCardsEL= document.getElementsByClassName('playingCard');




/*---------- Variables (state) ---------*/
let array = ['card1','card2','card3'];

/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !==0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [[randomIndex], array[currentIndex]];
  }
  return array;
}

/*-------------- Event Listener -------------*/
 startBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    monte.style.display = 'flex';
  });

  shuffleBtn.addEventListener('click', () => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !==0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [[randomIndex], array[currentIndex]];
  }
  return array;
});