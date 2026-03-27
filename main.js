// Tab Logic
function switchTab(tabName) {
  // Hide all contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden");
    content.classList.remove("block");
  });
  // Deactivate all buttons
  document.querySelectorAll(".service-tab").forEach((btn) => {
    btn.classList.remove("active", "bg-pink-400", "text-white");
    btn.classList.add("text-slate-600");
    if (btn.id.includes("pastries")) btn.classList.remove("text-white"); // specific reset
  });

  // Show selected content
  const selectedContent = document.getElementById(`content-${tabName}`);
  selectedContent.classList.remove("hidden");
  selectedContent.classList.add("block", "fade-in");

  // Activate button
  const activeBtn = document.getElementById(`tab-btn-${tabName}`);
  activeBtn.classList.add("active");
  activeBtn.classList.remove("text-slate-600");
}

// Price Calculator Logic Updated with Real Menu
function calculateTotal() {
  let total = 0;
  const breakdown = [];

  // By Dozen Items
  const ricePudding =
    parseInt(document.getElementById("qty-rice-pudding").value) || 0;
  if (ricePudding > 0) {
    total += ricePudding * 40;
    breakdown.push(`Rice Pudding (${ricePudding} doz): $${ricePudding * 40}`);
  }

  const cookies = parseInt(document.getElementById("qty-cookies").value) || 0;
  if (cookies > 0) {
    total += cookies * 45;
    breakdown.push(`Flan/Jello (${cookies} doz): $${cookies * 45}`);
  }

  const dessertCups =
    parseInt(document.getElementById("qty-dessert-cups").value) || 0;
  if (dessertCups > 0) {
    total += dessertCups * 50;
    breakdown.push(`Dessert Cups (${dessertCups} doz): $${dessertCups * 50}`);
  }

  const macarons = parseInt(document.getElementById("qty-macarons").value) || 0;
  if (macarons > 0) {
    total += macarons * 55;
    breakdown.push(
      `Choco Flan/Tres Leches (${macarons} doz): $${macarons * 55}`,
    );
  }

  // Single Order Items
  const fruitPlate =
    parseInt(document.getElementById("qty-fruit-plate").value) || 0;
  if (fruitPlate > 0) {
    total += fruitPlate * 10;
    breakdown.push(`Fruit Plate (×${fruitPlate}): $${fruitPlate * 10}`);
  }

  const pinaColada =
    parseInt(document.getElementById("qty-pina-colada").value) || 0;
  if (pinaColada > 0) {
    total += pinaColada * 55;
    breakdown.push(
      `Piña Colada/Gansito/Galleta (×${pinaColada}): $${pinaColada * 55}`,
    );
  }

  const wholeFlan =
    parseInt(document.getElementById("qty-whole-flan").value) || 0;
  if (wholeFlan > 0) {
    total += wholeFlan * 60;
    breakdown.push(`Whole Flan (×${wholeFlan}): $${wholeFlan * 60}`);
  }

  const wholeChocoFlan =
    parseInt(document.getElementById("qty-whole-choco-flan").value) || 0;
  if (wholeChocoFlan > 0) {
    total += wholeChocoFlan * 65;
    breakdown.push(
      `Whole Choco Flan (×${wholeChocoFlan}): $${wholeChocoFlan * 65}`,
    );
  }

  // Decor
  if (document.getElementById("decor-arch").checked) {
    total += 600;
    breakdown.push("Decoration Package: $600");
  }

  // Face Paint
  const hours = parseInt(document.getElementById("facepaint-hours").value) || 0;
  if (hours > 0) {
    const fpCost = 100 + hours * 75;
    total += fpCost;
    breakdown.push(`Face Painting (${hours} hrs): $${fpCost}`);
  }

  // Update UI
  const totalEl = document.getElementById("total-price");
  totalEl.innerText = "$" + total;

  const listEl = document.getElementById("breakdown-list");
  if (breakdown.length === 0) {
    listEl.innerHTML =
      '<p class="italic opacity-50">Select items to see breakdown...</p>';
  } else {
    listEl.innerHTML = breakdown
      .map((item) => {
        const parts = item.split(":");
        return `<div class="flex justify-between border-b border-slate-700 pb-1"><span>${parts[0]}</span><span>${parts[1]}</span></div>`;
      })
      .join("");
  }
}

// Mobile Menu Toggle
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Close mobile menu on link click
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
});

// Set minimum date to today for all event date fields
(function setEventDateMinToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  document
    .querySelectorAll('input[type="date"][name="event_date"]')
    .forEach((input) => {
      input.min = minDate;
    });
})();
