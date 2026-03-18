const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");

function activatePanel(target) {
  navItems.forEach((item) => item.classList.remove("active"));
  panels.forEach((panel) => panel.classList.remove("active"));

  const targetBtn = document.querySelector(`.nav-item[data-target="${target}"]`);
  const targetPanel = document.getElementById(target);

  if (targetBtn) targetBtn.classList.add("active");
  if (targetPanel) targetPanel.classList.add("active");
}

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    activatePanel(button.dataset.target);
  });
});


// ===== 상세보기 모달 =====
let currentDetailKey = null;
const detailOrder = ["packing1", "packing2", "packing3", "packing4", "packing5", "packing6"];

const detailData = {
  packing1: {
    title: "1. 1박스에는 1개의 SKU만 구성해주세요",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>하나의 박스에는 동일한 상품(SKU)만 담아 입고해야 하며, 단일 상품(SKU) 미준수 시 입고가 제한됩니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-1.png" alt="포장 기준 예시 1">
        </div>
      </div>
    `
  },
  packing2: {
    title: "2. 박스 내부는 수량 확인이 가능하도록 정형화하여 포장해주세요",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>박스 내에는 육안으로 수량 확인이 가능해야 합니다.</p>
          <p>육안으로 수량 확인이 불가한 경우 벌크 입고로 간주됩니다.</p>
          <p>벌크 입고는 실셈 여부에 따라 재고 관리 방식이 달라집니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-2.png" alt="포장 기준 예시 2">
        </div>
      </div>
    `
  },
  packing3: {
    title: "3. 동일 상품(SKU)이라도 박스 단위로 구분하여 포장해주세요",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>동일 상품(SKU)이라도 소비기한 또는 제조LOT가 다를 경우 분리 포장이 필요합니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-3.png" alt="포장 기준 예시 3">
        </div>
      </div>
    `
  },
  packing4: {
    title: "4. 완카톤 수량이 아닌 잔량 박스 입고의 경우, 실셈 비용이 발생합니다",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>잔량 박스는 실셈 비용이 발생할 수 있습니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-4.png" alt="포장 기준 예시 4">
        </div>
      </div>
    `
  },
  packing5: {
    title: "5. 출고 단위에 맞는 포장 기준을 준수해주세요",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>출고 단위에 맞는 포장 기준을 준수해야 합니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-5.png" alt="포장 기준 예시 5">
        </div>
      </div>
    `
  },
  packing6: {
    title: "6. 아웃박스에는 필수 정보를 기재해주세요",
    body: `
      <div class="detail-stack">
        <div class="detail-copy">
          <h4>상세 설명</h4>
          <p>아웃박스에는 필수 정보를 기재해야 합니다.</p>
        </div>
        <div class="detail-visual">
          <h4>예시 이미지</h4>
          <img src="./assets/images/packaging-6.png" alt="포장 기준 예시 6">
        </div>
      </div>
    `
  }
};

const modal = document.getElementById("detailModal");
const titleEl = document.getElementById("detailTitle");
const bodyEl = document.getElementById("detailBody");
const prevBtn = document.getElementById("detailPrev");
const nextBtn = document.getElementById("detailNext");
const closeBtn = document.getElementById("detailClose");
const detailButtons = document.querySelectorAll(".detail-btn");

function updateNavButtons() {
  const idx = detailOrder.indexOf(currentDetailKey);
  prevBtn.disabled = idx <= 0;
  nextBtn.disabled = idx >= detailOrder.length - 1;
}

function openModal(key) {
  const data = detailData[key];
  if (!data) return;

  currentDetailKey = key;
  titleEl.innerHTML = data.title;
  bodyEl.innerHTML = data.body;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  updateNavButtons();
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function moveDetail(step) {
  const idx = detailOrder.indexOf(currentDetailKey);
  if (idx === -1) return;

  const nextIdx = idx + step;
  if (nextIdx < 0 || nextIdx >= detailOrder.length) return;

  openModal(detailOrder[nextIdx]);
}

detailButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.detail);
  });
});

if (prevBtn) {
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    moveDetail(-1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    moveDetail(1);
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeModal();
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (!modal || !modal.classList.contains("active")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") moveDetail(-1);
  if (e.key === "ArrowRight") moveDetail(1);
});
