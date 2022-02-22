const cards = document.querySelectorAll(".block_image");
const text = document.querySelector(".text");
let myStorage = window.localStorage;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let win = 0;
let score = 0;
let steps = 0;

function flipCard(e) {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  console.log(firstCard.dataset.imgs);
  let isMatch = firstCard.dataset.imgs === secondCard.dataset.imgs;
  if (isMatch) {
    disableCards();
    win++;
    score += 5;
    localStorage.setItem("Score", score);
    text.textContent = `Score: ${score}`;
    console.log(win);
  } else {
    unflipCards();
    steps += 1;
  }

  if (win === 9) {
    setTimeout(() => {
      cards.forEach((elem) => elem.classList.remove("flip"));
      text.textContent = `Score: ${score}, Steps: ${steps + win} - YOU WIN!!!`;
      setTimeout(() => {
        text.textContent = "Score: ";
      }, 5000);
    }, 1500);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

window.addEventListener("load", () => {
  localStorage.getItem("Score");
});

cards.forEach((card) => card.addEventListener("click", flipCard));
