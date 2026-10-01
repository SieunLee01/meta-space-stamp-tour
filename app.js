const GAMES = [
  {id:"01", key:"shhh", title:"SHhh", team:"00(공공) TEAM", desc:"게임 설명을 입력해주세요.", color:"pink"},
  {id:"02", key:"serenity", title:"세레니티 아일랜드", team:"세레니티 TEAM", desc:"게임 설명을 입력해주세요.", color:"cyan"},
  {id:"03", key:"yowol", title:"요월", team:"TEAM NAME TBD", desc:"게임 설명을 입력해주세요.", color:"lime"}
];

const STORAGE_KEY = "metaSpaceCollection";
let collected = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const collectionEl = document.getElementById("collection");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("statusText");
const completeEl = document.getElementById("complete");
const modal = document.getElementById("discoverModal");

function alienHTML(){ return '<div class="card-alien"></div>'; }

function render(){
  collectionEl.innerHTML = GAMES.map(game => {
    const unlocked = collected.includes(game.id);
    return `
      <article class="card ${unlocked ? "" : "locked"}">
        <div class="card-top"><span>GAME ${game.id}</span><span>${unlocked ? "STAMPED" : "LOCKED"}</span></div>
        <div class="card-art">${alienHTML()}</div>
        <h3>${game.title}</h3>
        <p>${unlocked ? game.team : "부스의 QR을 스캔해 스탬프를 등록하세요."}</p>
        ${unlocked ? '<div class="stamp">★ COLLECTED</div>' : ""}
      </article>`;
  }).join("");

  const count = collected.length;
  progressText.textContent = `${count} / ${GAMES.length}`;
  statusText.textContent = `STAMP ${count} / ${GAMES.length}`;
  progressBar.style.width = `${count / GAMES.length * 100}%`;
  completeEl.classList.toggle("hidden", count !== GAMES.length);

  document.querySelectorAll(".stamp-button").forEach(button => {
    const id = button.dataset.stamp;
    if(collected.includes(id)){
      button.textContent = "STAMP COLLECTED ✓";
      button.classList.add("collected");
    }
    button.onclick = () => discover(id);
  });
}

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(collected)); render(); }

function discover(id){
  const game = GAMES.find(g => g.id === id);
  if(!game) return;
  if(!collected.includes(id)){
    document.getElementById("modalSpaceNo").textContent = `GAME ${game.id} · ${game.team}`;
    document.getElementById("modalTitle").textContent = game.title;
    document.getElementById("modalDesc").textContent = "현재는 테스트용 스탬프 등록 화면입니다. 추후 카메라 QR 스캔으로 연결됩니다.";
    document.getElementById("modalAlien").innerHTML = alienHTML();
    modal.classList.remove("hidden");
    document.getElementById("modalContinue").onclick = () => {
      collected.push(id);
      save();
      modal.classList.add("hidden");
      location.hash = "mission";
    };
  } else {
    location.hash = "mission";
  }
}

const gameDetailPanel = document.getElementById("gameDetailPanel");
let openGameCard = null;

function closeGame(){
  if(!openGameCard) return;
  const detail = gameDetailPanel.querySelector(".game-detail");
  if(detail) openGameCard.appendChild(detail);
  gameDetailPanel.innerHTML = "";
  gameDetailPanel.classList.remove("active");
  const imageButton = openGameCard.querySelector(".game-image-button");
  if(imageButton) imageButton.setAttribute("aria-expanded","false");
  openGameCard.classList.remove("open");
  openGameCard = null;
}

function toggleGame(card){
  if(openGameCard === card){
    closeGame();
    return;
  }
  if(openGameCard) closeGame();
  const detail = card.querySelector(".game-detail");
  if(!detail) return;
  gameDetailPanel.appendChild(detail);
  gameDetailPanel.classList.add("active");
  openGameCard = card;
  card.classList.remove("open");
  const imageButton = card.querySelector(".game-image-button");
  if(imageButton) imageButton.setAttribute("aria-expanded","true");
  setTimeout(() => gameDetailPanel.scrollIntoView({behavior:"smooth",block:"start"}), 50);
}

document.querySelectorAll(".game-image-button").forEach(button => {
  button.addEventListener("click", () => toggleGame(button.closest(".game-card")));
});
document.querySelectorAll(".game-caption h3").forEach(title => {
  title.style.cursor = "pointer";
  title.addEventListener("click", () => toggleGame(title.closest(".game-card")));
});

