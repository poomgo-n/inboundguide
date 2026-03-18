const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;

    navItems.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});
// ===== 상세보기 모달 =====
let currentDetailKey = null;
const detailOrder = ['packing1','packing2','packing3','packing4','packing5','packing6'];

const detailData = {
  packing1: {
    title: "1. 1박스에는 1개의 SKU만 구성해주세요",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>하나의 박스에는 동일한 상품(SKU)만 담아 입고해야 합니다.</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-1.png">
      </div>
    </div>`
  },
  packing2: {
    title: "2. 수량 확인 가능 포장",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>육안으로 수량 확인 가능해야 합니다.</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-2.png">
      </div>
    </div>`
  },
  packing3: {
    title: "3. LOT/소비기한 분리",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>LOT 다르면 분리 포장 필요</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-3.png">
      </div>
    </div>`
  },
  packing4: {
    title: "4. 잔량 박스",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>잔량 박스는 실셈 비용 발생</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-4.png">
      </div>
    </div>`
  },
  packing5: {
    title: "5. 출고 단위 포장",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>출고 단위 맞춰 포장</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-5.png">
      </div>
    </div>`
  },
  packing6: {
    title: "6. 아웃박스 표기",
    body: `<div class="detail-stack">
      <div class="detail-copy">
        <p>필수 정보 기재</p>
      </div>
      <div class="detail-visual">
        <img src="./assets/images/packaging-6.png">
      </div>
    </div>`
  }
};

const modal = document.getElementById("detailModal");
const titleEl = document.getElementById("detailTitle");
const bodyEl = document.getElementById("detailBody");

const prevBtn = document.getElementById("detailPrev");
const nextBtn = document.getElementById("detailNext");
const closeBtn = document.getElementById("detailClose");

document.querySelectorAll(".detail-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.detail);
  });
});

function openModal(key){
  currentDetailKey = key;
  const data = detailData[key];

  titleEl.innerHTML = data.title;
  bodyEl.innerHTML = data.body;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  updateNav();
}

function closeModal(){
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateNav(){
  const idx = detailOrder.indexOf(currentDetailKey);
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === detailOrder.length - 1;
}

function move(step){
  const idx = detailOrder.indexOf(currentDetailKey);
  openModal(detailOrder[idx + step]);
}

prevBtn.onclick = () => move(-1);
nextBtn.onclick = () => move(1);
closeBtn.onclick = closeModal;

modal.onclick = (e) => {
  if(e.target === modal) closeModal();
};

document.addEventListener("keydown", (e)=>{
  if(!modal.classList.contains("active")) return;
  if(e.key === "Escape") closeModal();
  if(e.key === "ArrowRight") move(1);
  if(e.key === "ArrowLeft") move(-1);
});
