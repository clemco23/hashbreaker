// Nom de stockage
const STORAGE_KEY = "cluedoCyberDeck_v1";

// Deck initial
const INITIAL_DECK = [
  " <strong>A draft comes from under a door.</strong> The player with Terrace must reveal this card",
  " <strong> A loud noise comes from a locked room.</strong> The player with Server Room reveals the card.",
  " <strong>A strong smell of coffee fills the hallway.</strong> The player with Teachers’ Lounge puts their card face up.",
  " <strong>A light is on when it shouldn’t be.</strong> The player with Room 0 reveals this card.",
  " <strong>A forgotten badge is found near a computer.</strong> The player with Pedagogy Office reveals the card.",
  " <strong>A post-it is seen on a messy desk.</strong> The player with Fab Lab puts the card face up.",
  " <strong> A window is open even though it should be closed.</strong> The player with Library reveals their card.",
  " <strong>An emergency call was made from a closed room.</strong> The player with Meeting Room puts the card up.",
  " <strong> A security beep comes from the ground floor.</strong> The player with Director’s Office reveals the card.",
  " <strong> A metallic sound suddenly echoes.</strong> The player with Server Room must reveal the card.",
  " <strong> A USB cable is lying in a strange place.</strong> The player with Trapped USB key reveals it.",
  " <strong> A line of code is still running on a screen.</strong> The player with Python script must reveal this card.",
  " <strong> A strange message appears in an inbox.</strong> The player with Phishing email reveals it.",
  " <strong>  A small electronic device is found under a table.</strong> The player with Hidden Raspberry Pi shows their card.",
  " <strong> An unknown Wi-Fi signal is detected.</strong> The player with Wi-Fi pineapple reveals the card.",
  " <strong> A sticky note with a password is found wrinkled.</strong>The player with Password on a post-it reveals this card.",
  " <strong>A hacking tool seems to have been moved recently.</strong>The player with Hidden Raspberry Pi reveals their card.",
  " <strong> An infected file was opened by mistake.</strong> The player with Python script shows their card.",
  " <strong> A phishing alert popped up on a screen.</strong> The player with Phishing email must reveal it.",
  " <strong> A USB port looks like it has been forced.</strong>The player with Trapped USB key reveals the card.",
  " <strong>Someone was seen running in the hallway.</strong> The player with Kevin reveals this card.",
  " <strong>A perfume scent lingers near the stairs.</strong> The player with Sonia puts the card face up.",
  " <strong>A forgotten scarf is found in a room.</strong> The player with Caroline reveals their card.",
  " <strong> An open notebook shows notes about cybersecurity.</strong> The player with Cécile puts the card up.",
  " <strong>. A mug with a name on it was left on a table.</strong> The player with Emmanuelle reveals their card.",
  " <strong> Keys were found in a locker room.</strong>  The player with Farida shows their card.",
  " <strong>A witness says they heard someone talking alone.</strong>The player with Kevin reveals their card.",
  " <strong> A badge still smells like a specific perfume.</strong>The player with Sonia must reveal it.",
  " <strong>A file carries the name of a suspect.</strong> The player with Caroline reveals this card.",
  " <strong> A personalized pen was left on a desk.</strong>The player with Emmanuelle reveals the card."
];

// ---------------------
// FONCTIONS UTILITAIRES
// ---------------------

function loadDeck() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [...INITIAL_DECK];
}

function saveDeck(deck) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
}

function resetDeck() {
  const fresh = [...INITIAL_DECK];
  saveDeck(fresh);
  return fresh;
}

// ---------------------
// INIT
// ---------------------

let deck = loadDeck();

const cardInner = document.getElementById("cardInner");
const drawButton = document.getElementById("drawButton");
const resetButton = document.getElementById("resetButton");
const remainingCount = document.getElementById("remainingCount");
const warning = document.getElementById("warningArea");
const cardText = document.getElementById("cardText");
const statusLine = document.getElementById("statusLine");
const timerBar = document.getElementById("timerBar");

remainingCount.textContent = deck.length;

// Timer ID
let timerId = null;

// ---------------------
// RESET ANIMATION
// ---------------------

function showBackSide() {
  cardInner.classList.remove("flipped");
  void cardInner.offsetWidth;
}

// ---------------------
// PIOCHER UNE CARTE
// ---------------------

function drawCard() {
  warning.textContent = "";

  if (timerId) clearTimeout(timerId);

  if (deck.length === 0) {
    cardText.innerHTML = "Plus aucune carte disponible.";
    drawButton.disabled = true;
    showBackSide();
    cardInner.classList.add("flipped");
    return;
  }

  // Tirage
  const i = Math.floor(Math.random() * deck.length);
  const drawn = deck[i];

  deck.splice(i, 1);
  saveDeck(deck);
  remainingCount.innerHTML = deck.length;

  cardText.innerHTML = drawn;
  drawButton.disabled = true;
  resetButton.disabled = true;
  drawButton.style.opacity = 0.5;
  resetButton.style.opacity = 0.5;


  // Flip animation
  showBackSide();
  cardInner.classList.add("flipped");

typeWriter(statusLine, ">_ Card drawn. 10-second timer…");

  // --------------------------
  // TIMER 10s + barre
  // --------------------------

  timerBar.style.transition = "none";
  timerBar.style.width = "100%";
  void timerBar.offsetWidth;
  timerBar.style.transition = "width 10s linear";
  timerBar.style.width = "0%";

  timerId = setTimeout(() => {
    // typeWriter(statusLine, "Temps écoulé.");
    showBackSide();

    timerBar.style.transition = "none";
    timerBar.style.width = "100%";
    drawButton.disabled = false;
  resetButton.disabled = false;
  drawButton.style.opacity = 1;
  resetButton.style.opacity = 1;
  typeWriter(statusLine,  ">_ Deck reset.");


  }, 10000);
}

// ---------------------
// BOUTONS
// ---------------------

drawButton.addEventListener("click", drawCard);

resetButton.addEventListener("click", () => {
  if (!confirm("Réinitialiser le deck ?")) return;

  deck = resetDeck();
  remainingCount.textContent = deck.length;
  cardText.textContent = "Deck reset.";
  drawButton.disabled = false;

  showBackSide();

  timerBar.style.transition = "none";
  timerBar.style.width = "100%";

  typeWriter(statusLine,">_ Deck reset.");
});

function typeWriter(element, text, speed = 25) {
  element.textContent = "";
  let i = 0;

  function write() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(write, speed);
    }
  }

  write();
}
