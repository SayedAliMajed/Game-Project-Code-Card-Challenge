window.quizBank = [
 
  // JavaScript Questions
  {
    topic: 'JS',
    question: 'Which keyword should you use to declare a variable that can change during the game?',
    answers: [
      { text: 'const', correct: false },
      { text: 'let', correct: true },
      { text: 'static', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'Which JavaScript structure would best store multiple questions in your quiz?',
    answers: [
      { text: 'Object', correct: false },
      { text: 'Array', correct: true },
      { text: 'String', correct: false },
    ]
  }, // ← ADDED THIS COMMA!
  {
    topic: 'JS',
    question: 'Which method would you use to randomly shuffle cards in a JavaScript array?',
    answers: [
      { text: 'sort()', correct: false },
      { text: 'reverse()', correct: false },
      { text: 'A custom shuffle function using Math.random()', correct: true },
    ]
  },
  {
    topic: 'JS',
    question: 'Which statement correctly checks if a user selected the correct card?',
    answers: [
      { text: 'if (card === winningCard)', correct: true },
      { text: 'if (card = winningCard)', correct: false },
      { text: 'if card equal winningCard', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'What does addEventListener("click", ...) do in your game?',
    answers: [
      { text: 'It attaches a function that runs when the card is clicked.', correct: true },
      { text: 'It removes click events from the card.', correct: false },
      { text: 'It styles the card to look clicked.', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'Which function can be used to wait before shuffling cards?',
    answers: [
      { text: 'setTimeout()', correct: true },
      { text: 'delay()', correct: false },
      { text: 'waitFor()', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'What is the value of "score" after: let score = 8; score += 2;',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: false },
      { text: '10', correct: true },
    ]
  },
  {
    topic: 'JS',
    question: 'Which object property commonly stores the current quiz stage?',
    answers: [
      { text: 'gameState.stage', correct: true },
      { text: 'gameStatus.level', correct: false },
      { text: 'quiz.current', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'How do you stop showing more questions when all are answered?',
    answers: [
      { text: 'if (currentQuestionIndex >= questions.length)', correct: true },
      { text: 'if (currentQuestionIndex > questions.length)', correct: false },
      { text: 'questions.finished()', correct: false },
    ]
  },
  {
    topic: 'JS',
    question: 'Which keyword declares a variable that will NOT be reassigned?',
    answers: [
      { text: 'let', correct: false },
      { text: 'var', correct: false },
      { text: 'const', correct: true },
    ]
  },

  // CSS Questions
  {
    topic: 'CSS',
    question: 'Which CSS property is used to change the text color?',
    answers: [
      { text: 'background-color', correct: false },
      { text: 'color', correct: true },
      { text: 'font-style', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'How do you make the cards have rounded corners?',
    answers: [
      { text: 'border-radius', correct: true },
      { text: 'corner-style', correct: false },
      { text: 'card-style', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which property adds a shadow around the cards in your game?',
    answers: [
      { text: 'box-shadow', correct: true },
      { text: 'text-shadow', correct: false },
      { text: 'filter-shadow', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which property centers the "Quiz Game" box horizontally?',
    answers: [
      { text: 'margin: 0 auto;', correct: true },
      { text: 'text-align: center;', correct: false },
      { text: 'align-content: middle;', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'What CSS property controls the background color of the wrapper?',
    answers: [
      { text: 'color', correct: false },
      { text: 'background', correct: true },
      { text: 'background-fill', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which property is used to make the header text bold?',
    answers: [
      { text: 'font-weight', correct: true },
      { text: 'font-size', correct: false },
      { text: 'font-style', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which CSS property makes the button change when hovered?',
    answers: [
      { text: ':hover', correct: true },
      { text: 'opacity', correct: false },
      { text: 'border-style', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'How do you add spacing between multiple cards with flex layout?',
    answers: [
      { text: 'gap', correct: true },
      { text: 'border-spacing', correct: false },
      { text: 'margin-center', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which property do you use to animate card movements?',
    answers: [
      { text: 'transition', correct: true },
      { text: 'animation-speed', correct: false },
      { text: 'move-effect', correct: false },
    ]
  },
  {
    topic: 'CSS',
    question: 'Which value for display creates a flex container?',
    answers: [
      { text: 'display: grid', correct: false },
      { text: 'display: block', correct: false },
      { text: 'display: flex', correct: true },
    ]
  },

  // HTML Questions
  {
    topic: 'HTML',
    question: 'Which HTML tag is used to add images of cards in your game?',
    answers: [
      { text: '<div>', correct: false },
      { text: '<img>', correct: true },
      { text: '<card>', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'What tag wraps all the game screens together?',
    answers: [
      { text: '<section>', correct: false },
      { text: '<wrapper>', correct: false },
      { text: '<div>', correct: true },
    ]
  },
  {
    topic: 'HTML',
    question: 'Which attribute specifies the image source for a card?',
    answers: [
      { text: 'source', correct: false },
      { text: 'src', correct: true },
      { text: 'img', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'How do you group answer buttons under a question?',
    answers: [
      { text: '<ul>', correct: false },
      { text: '<div>', correct: true },
      { text: '<span>', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'Which tag creates a clickable button in your quiz?',
    answers: [
      { text: '<input>', correct: false },
      { text: '<button>', correct: true },
      { text: '<div>', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'What is the correct HTML to include a CSS file?',
    answers: [
      { text: '<link rel="stylesheet" href="style.css">', correct: true },
      { text: '<css src="style.css">', correct: false },
      { text: '<style src="style.css">', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'Which HTML tag is used for the game header?',
    answers: [
      { text: '<header>', correct: true },
      { text: '<main>', correct: false },
      { text: '<head>', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'Which attribute provides alternative text for a card image?',
    answers: [
      { text: 'alt', correct: true },
      { text: 'title', correct: false },
      { text: 'description', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'How do you create a numbered list for instructions?',
    answers: [
      { text: '<ul>', correct: false },
      { text: '<ol>', correct: true },
      { text: '<list>', correct: false },
    ]
  },
  {
    topic: 'HTML',
    question: 'What tag is used to group the HUD information?',
    answers: [
      { text: '<span>', correct: true },
      { text: '<bold>', correct: false },
      { text: '<hud>', correct: false },
    ]
  }
];
