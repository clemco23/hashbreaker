// Nom de stockage
const STORAGE_KEY = "cluedoCyberDeck_v1";

// Deck initial
const INITIAL_DECK = [
  "Le joueur ayant la carte corde retourne sa carte face visible pour tout le monde.",
  "Le joueur ayant la carte revolver doit montrer une de ses cartes au joueur à sa gauche.",
  "Le joueur ayant la carte chandelier choisit un joueur qui doit révéler une carte.",
  "Le joueur ayant la carte clé doit révéler un lieu qu’il possède.",
  "Le joueur ayant la carte poison donne un indice à la personne de son choix.",
  "Le joueur ayant la carte bibliothèque doit montrer une carte lieu au joueur à sa droite.",
  "Le joueur ayant la carte laboratoire révèle une arme qu’il ne possède PAS.",
  "Le joueur ayant la carte serveur indique une carte qu’il possède et qui n’est PAS la solution.",
  "Le joueur ayant la carte caméra donne un indice sur un personnage.",
  "Le joueur ayant la carte coffre-fort doit mentir sur un indice."
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
    cardText.textContent = "Plus aucune carte disponible.";
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
  remainingCount.textContent = deck.length;

  cardText.textContent = drawn;
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
