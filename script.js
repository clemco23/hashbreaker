// Nom de stockage
const STORAGE_KEY = "cluedoCyberDeck_v1";

// Deck initial
const INITIAL_DECK = [
  { type: "text", content: "<strong>A draft comes from under a door.</strong> The player with Terrace must reveal this card." },

  // ⭐ Carte spéciale IMAGE
  { type: "image", src: "img/tick-tack.png" },

  { type: "text", content: "<strong>A loud noise comes from a locked room.</strong> The player with Server Room reveals the card." },
  { type: "text", content: "<strong>A strong smell of coffee fills the hallway.</strong> The player with Teachers’ Lounge puts their card face up." },
  { type: "text", content: "<strong>A light is on when it shouldn’t be.</strong> The player with Room 0 reveals this card." },
  { type: "text", content: "<strong>A forgotten badge is found near a computer.</strong> The player with Pedagogy Office reveals the card." },
  { type: "text", content: "<strong>A post-it is seen on a messy desk.</strong> The player with Fab Lab puts the card face up." },
  { type: "text", content: "<strong>A window is open even though it should be closed.</strong> The player with Library reveals their card." },
  { type: "text", content: "<strong>An emergency call was made from a closed room.</strong> The player with Meeting Room puts the card up." },
  { type: "text", content: "<strong>A security beep comes from the ground floor.</strong> The player with Director’s Office reveals the card." },
  { type: "text", content: "<strong>A metallic sound suddenly echoes.</strong> The player with Server Room must reveal the card." },
  { type: "text", content: "<strong>A USB cable is lying in a strange place.</strong> The player with Trapped USB key reveals it." },
  { type: "text", content: "<strong>A line of code is still running on a screen.</strong> The player with Python script must reveal this card." },
  { type: "text", content: "<strong>A strange message appears in an inbox.</strong> The player with Phishing email reveals it." },
  { type: "text", content: "<strong>A small electronic device is found under a table.</strong> The player with Hidden Raspberry Pi shows their card." },
  { type: "text", content: "<strong>An unknown Wi-Fi signal is detected.</strong> The player with Wi-Fi pineapple reveals the card." },
  { type: "text", content: "<strong>A sticky note with a password is found wrinkled.</strong>The player with Password on a post-it reveals this card." },
  { type: "text", content: "<strong>A hacking tool seems to have been moved recently.</strong>The player with Hidden Raspberry Pi reveals their card." },
  { type: "text", content: "<strong>An infected file was opened by mistake.</strong> The player with Python script shows their card." },
  { type: "text", content: "<strong>A phishing alert popped up on a screen.</strong> The player with Phishing email must reveal it." },
  { type: "text", content: "<strong>A USB port looks like it has been forced.</strong>The player with Trapped USB key reveals the card." },
  { type: "text", content: "<strong>Someone was seen running in the hallway.</strong> The player with Kevin reveals this card." },
  { type: "text", content: "<strong>A perfume scent lingers near the stairs.</strong> The player with Sonia puts the card face up." },
  { type: "text", content: "<strong>A forgotten scarf is found in a room.</strong> The player with Caroline reveals their card." },
  { type: "text", content: "<strong>An open notebook shows notes about cybersecurity.</strong> The player with Cécile puts the card up." },
  { type: "text", content: "<strong>A mug with a name on it was left on a table.</strong> The player with Emmanuelle reveals their card." },
  { type: "text", content: "<strong>Keys were found in a locker room.</strong> The player with Farida shows their card." },
  { type: "text", content: "<strong>A witness says they heard someone talking alone.</strong>The player with Kevin reveals their card." },
  { type: "text", content: "<strong>A badge still smells like a specific perfume.</strong>The player with Sonia must reveal it." },
  { type: "text", content: "<strong>A file carries the name of a suspect.</strong> The player with Caroline reveals this card." },
  { type: "text", content: "<strong>A personalized pen was left on a desk.</strong>The player with Emmanuelle reveals the card." }
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
const cardContent = document.getElementById("cardContent");

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

  // Toujours réinitialiser la carte arrière AVANT affichage
  const back = document.querySelector(".card-back");
  back.classList.remove("image-mode");
  back.style.backgroundImage = "none";

  // Tirage
  const i = Math.floor(Math.random() * deck.length);
  const drawn = deck[i];

  deck.splice(i, 1);
  saveDeck(deck);
  remainingCount.innerHTML = deck.length;

  if (drawn.type === "text") {
    cardText.innerHTML = drawn.content;
} 
if (drawn.type === "image") {

    // active le mode image sur la carte arrière
    const back = document.querySelector(".card-back");

    back.classList.add("image-mode");
    back.style.backgroundImage = `url('${drawn.src}')`;

    triggerGameOverEffect();
}



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

resetButton.addEventListener("click", async () => {
     const ok = await customConfirm("Reset the deck?");
    if (!ok) return;

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

function triggerGameOverEffect() {

    // 1) Tremblement de l'écran
    document.body.classList.add("shake-screen");

    // 2) Flash rouge
    const flash = document.createElement("div");
    flash.className = "screen-flash";
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 400);

    // 3) Glitch overlay
    const glitch = document.createElement("div");
    glitch.className = "glitch-overlay";
    glitch.textContent = "ELIMINATED";
    document.body.appendChild(glitch);

    setTimeout(() => glitch.remove(), 2500);

    // 4) Vibration si disponible
    if ("vibrate" in navigator) {
        navigator.vibrate([60, 40, 80]);
    }

    // 5) Retirer le shake après 500ms
    setTimeout(() => {
        document.body.classList.remove("shake-screen");
    }, 500);
}


function customConfirm(message) {
    return new Promise(resolve => {
        const overlay = document.getElementById("confirmOverlay");
        const msg = document.getElementById("confirmMessage");
        const yesBtn = document.getElementById("confirmYes");
        const noBtn = document.getElementById("confirmNo");

        msg.textContent = message;
        overlay.classList.remove("hidden");

        yesBtn.onclick = () => {
            overlay.classList.add("hidden");
            resolve(true);
        };

        noBtn.onclick = () => {
            overlay.classList.add("hidden");
            resolve(false);
        };
    });
}


