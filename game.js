const body = document.querySelector('body');
const buttons = document.querySelectorAll('.btn');
const levelTitle = document.querySelector('#level-title');
const buttonStart = document.querySelector('.btn-start');

const buttonColors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
let started = false;

buttonStart.addEventListener('click', () => {
  if (!started) {
    started = true;
    buttonStart.classList.add('hidden');
    nextQuestion();
  }
});

const nextQuestion = () => {
  level++;
  levelTitle.textContent = `Level ${level}`;
  console.log(level);
  const randomNumber = Math.floor(Math.random() * 4);
  const buttonName = buttons[randomNumber].id;

  gamePattern.push(buttonName);

  buttons[randomNumber].classList.add('pressed');
  setTimeout(() => {
    buttons[randomNumber].classList.remove('pressed');
  }, 100);

  playAudio(buttonName);
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    buttons[i].classList.add('pressed');
    setTimeout(() => {
      buttons[i].classList.remove('pressed');
    }, 100);

    const buttonName = buttons[i].id;
    playAudio(buttonName);
    userClickPattern.push(buttonName);

    roleGame(userClickPattern.length - 1);
  });
}

const startOver = () => {
  started = false;
  level = 0;
  gamePattern = [];
  userClickPattern = [];
  buttonStart.classList.remove('hidden');
};

const playAudio = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const roleGame = (currentLevel) => {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(() => {
        userClickPattern = [];
        nextQuestion();
      }, 1000);
    }
  } else {
    body.classList.add('game-over');
    setTimeout(() => {
      body.classList.remove('game-over');
    }, 300);
    playAudio('wrong');
    levelTitle.innerHTML = 'Game Over, Press Start to Restart';
    startOver();
  }
};
