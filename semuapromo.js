(() => {
  "use strict";

  const WHATSAPP_NUMBER = "6285782329752";

  const createWhatsAppLink = (message) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", navMenu.classList.contains("open"));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const promoCards = document.querySelectorAll(".promo-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      promoCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === "all" || category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  const modal = document.getElementById("promoModal");
  const modalClose = document.getElementById("modalClose");
  const selectedPromo = document.getElementById("selectedPromo");
  const modalWhatsapp = document.getElementById("modalWhatsapp");
  const whatsappBtn = document.getElementById("whatsappBtn");

  const openPromoModal = (promoName) => {
    if (!modal || !selectedPromo || !modalWhatsapp) return;

    const message =
      `Halo Admin LEVEL UP PS RENTAL CINEMA 👋%0A%0A` +
      `Saya tertarik dengan promo: ${promoName}.%0A` +
      `Mohon info periode promo, harga, dan ketersediaannya.`;

    selectedPromo.textContent = `Kamu memilih promo "${promoName}".`;
    modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closePromoModal = () => {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".promo-btn").forEach((button) => {
    button.addEventListener("click", () => {
      openPromoModal(button.dataset.promo || "Promo");
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closePromoModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closePromoModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePromoModal();
  });

  if (whatsappBtn) {
    const message =
      "Halo Admin LEVEL UP PS RENTAL CINEMA 👋 Saya ingin bertanya tentang promo Rental PS dan Bioskop Mini.";
    whatsappBtn.href = createWhatsAppLink(message);
  }
})();
