const SPACES = [
  {id:"01", key:"game", title:"GAME SPACE", desc:"게임과 인터랙션의 공간을 발견했습니다.", color:"pink"},
  {id:"02", key:"3d", title:"3D SPACE", desc:"입체 그래픽과 새로운 세계를 발견했습니다.", color:"cyan"},
  {id:"03", key:"xr", title:"XR SPACE", desc:"현실과 가상의 경계를 발견했습니다.", color:"lime"},
  {id:"04", key:"dt", title:"DIGITAL TWIN", desc:"현실을 디지털로 확장한 공간을 발견했습니다.", color:"blue"}
];

const STORAGE_KEY = "metaSpaceCollection";
let collected = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const collectionEl = document.getElementById("collection");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("statusText");
const completeEl = document.getElementById("complete");
const modal = document.getElementById("discoverModal");

function alienHTML(){
  return `<div class="card-alien"></div>`;
}

function render(){
  collectionEl.innerHTML = SPACES.map(space => {
    const unlocked = collected.includes(space.id);
    return `
      <article class="card ${unlocked ? "" : "locked"}">
        <div class="card-top"><span>SPACE ${space.id}</span><span>${unlocked ? "DISCOVERED" : "LOCKED"}</span></div>
        <div class="card-art">${alienHTML()}</div>
        <h3>${space.title}</h3>
        <p>${unlocked ? space.desc : "부스의 QR을 스캔해 해금하세요."}</p>
        ${unlocked ? '<div class="stamp">★ COLLECTED</div>' : ""}
      </article>`;
  }).join("");

  const count = collected.length;
  progressText.textContent = `${count} / ${SPACES.length}`;
  statusText.textContent = `MISSION ${count} / ${SPACES.length}`;
  progressBar.style.width = `${count / SPACES.length * 100}%`;
  completeEl.classList.toggle("hidden", count !== SPACES.length);
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collected));
  render();
}

function discover(id){
  const space = SPACES.find(s => s.id === id);
  if(!space) return;
  if(!collected.includes(id)){
    document.getElementById("modalSpaceNo").textContent = `SPACE ${space.id}`;
    document.getElementById("modalTitle").textContent = space.title;
    document.getElementById("modalDesc").textContent = space.desc;
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

document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");
document.getElementById("resetButton").onclick = () => {
  if(confirm("모든 수집 기록을 초기화할까요?")){
    collected = [];
    save();
    window.scrollTo({top:0, behavior:"smooth"});
  }
};

// QR links should use: https://YOUR-DOMAIN/?booth=01
const params = new URLSearchParams(location.search);
const booth = params.get("booth");
if(booth){
  setTimeout(() => discover(booth.padStart(2,"0")), 500);
}

render();
