const shoeDatabase = [
  { id: 1, name: "Kobe 5 Protro 'Eggplant'", releaseDate: "March 28, 2026 10:00:00", price: "$200", img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e4e04410-d9d1-4475-bed0-6e4a2c918e6c/kobe-5-protro-basketball-shoe-9J0v9T.png", tech: "Zoom Turbo", desc: "The return of a classic performance silhouette." },
  { id: 2, name: "KD 19 'Electric'", releaseDate: "April 05, 2026 10:00:00", price: "$160", img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/60f47c3f-c1f3-4d22-b258-30e7c6b98616/kd17-ep-basketball-shoes-v4V9L6.png", tech: "Full Zoom Strobel", desc: "Engineered for maximum energy return." },
  { id: 3, name: "LeBron 21 'Freshwater'", releaseDate: "March 20, 2026 10:00:00", price: "$210", img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/6e088732-2615-4604-807d-531063df4d8a/lebron-xxi-freshwater-basketball-shoes-1V9G5L.png", tech: "Cushlon 2.0", desc: "Lightweight containment for explosive power." }
];

function renderShoes(filter = "") {
  const futureGrid = document.getElementById('future-grid');
  const recentGrid = document.getElementById('recent-grid');
  futureGrid.innerHTML = ''; recentGrid.innerHTML = '';
  const now = new Date().getTime();

  shoeDatabase.filter(s => s.name.toLowerCase().includes(filter.toLowerCase())).forEach(shoe => {
    const isFuture = new Date(shoe.releaseDate).getTime() > now;
    const card = document.createElement('div');
    card.className = 'shoe-card';
    card.onclick = () => openModal(shoe);
    
    const tag = isFuture ? `<div id="t-${shoe.id}" class="timer-box">00:00:00</div>` : `<div class="status-label">RELEASED</div>`;
    
    card.innerHTML = `<div class="image-container"><img src="${shoe.img}"></div>${tag}<div class="shoe-name">${shoe.name}</div><div class="shoe-price">${shoe.price}</div>`;
    
    if (isFuture) { futureGrid.appendChild(card); startTimer(shoe.releaseDate, `t-${shoe.id}`); } 
    else { recentGrid.appendChild(card); }
  });
}

function startTimer(date, id) {
  const target = new Date(date).getTime();
  setInterval(() => {
    const diff = target - new Date().getTime();
    if (diff < 0) return;
    const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4), s = Math.floor((diff % 6e4) / 1000);
    const el = document.getElementById(id);
    if (el) el.innerText = `${d}D:${h}H:${m}M:${s}S`;
  }, 1000);
}

function openModal(shoe) {
  const m = document.getElementById('modal');
  document.getElementById('modal-body').innerHTML = `
    <img src="${shoe.img}" style="width:100%">
    <div class="modal-info"><h2>${shoe.name}</h2><p class="modal-desc">${shoe.desc}</p><p><strong>TECH:</strong> ${shoe.tech}</p><button class="notify-btn">SET NOTIFICATION</button></div>`;
  m.style.display = "block";
}

document.getElementById('theme-toggle').onclick = () => {
  document.body.classList.toggle('dark-theme');
  document.getElementById('theme-toggle').innerText = document.body.classList.contains('dark-theme') ? "LIGHT MODE" : "DARK MODE";
};

document.getElementById('search-bar').oninput = (e) => renderShoes(e.target.value);
document.querySelector('.modal-close').onclick = () => document.getElementById('modal').style.display = "none";

setInterval(() => { document.getElementById('live-clock').innerText = new Date().toLocaleTimeString(); }, 1000);

renderShoes();
