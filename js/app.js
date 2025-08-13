/*-------------- Constants -------------*/
const playNowEl = document.getElementById('playNow');
console.log(playNowEl);

/*---------- Variables (state) ---------*/


/*----- Cached Element References  -----*/


/*-------------- Functions -------------*/
playNowEl.addEventListener('click', () => {
    document.getElementById('introScreen').style.display = 'none';
    document.getElementById('monteContainer') = 'block';
});


