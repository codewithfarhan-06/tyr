const modalTriggers = document.querySelectorAll("[data-modal-target]");
const closeButtons = document.querySelectorAll("[data-close]");
const modals = document.querySelectorAll(".modal");
const tiltCards = document.querySelectorAll("[data-tilt]");

const openModal = (name) => {
  const modal = document.getElementById(`modal-${name}`);
  if (modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }
};

const closeModal = (modal) => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

modalTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.modalTarget;
    if (target) {
      openModal(target);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modal = event.target.closest(".modal");
    if (modal) {
      closeModal(modal);
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("is-open")) {
        closeModal(modal);
      }
    });
  }
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * -6;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});
