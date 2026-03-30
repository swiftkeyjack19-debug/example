const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
}

const faders = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

faders.forEach((item) => observer.observe(item));

const bookingForm = document.querySelector("#booking-form");
const successMessage = document.querySelector("#form-success");

if (bookingForm && successMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    bookingForm.reset();
    successMessage.hidden = false;
    setTimeout(() => {
      successMessage.hidden = true;
    }, 3500);
  });
}

const detailsModal = document.querySelector("#details-modal");
const detailsTitle = document.querySelector("#details-title");
const detailsDescription = document.querySelector("#details-description");
const detailsDuration = document.querySelector("#details-duration");
const detailsPrice = document.querySelector("#details-price");
const serviceDetailsButtons = document.querySelectorAll(".js-service-details");

function openDetailsModal(button) {
  detailsTitle.textContent = button.dataset.service || "";
  detailsDescription.textContent = button.dataset.description || "";
  detailsDuration.textContent = button.dataset.duration || "";
  detailsPrice.textContent = button.dataset.price || "";
  detailsModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDetailsModal() {
  detailsModal.hidden = true;
  document.body.style.overflow = "";
}

serviceDetailsButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openDetailsModal(button);
  });
});

if (detailsModal) {
  detailsModal.querySelectorAll("[data-close-details]").forEach((node) => {
    node.addEventListener("click", closeDetailsModal);
  });
}

const teamModal = document.querySelector("#team-modal");
const teamName = document.querySelector("#team-name");
const teamRole = document.querySelector("#team-role");
const teamAge = document.querySelector("#team-age");
const teamExp = document.querySelector("#team-exp");
const teamSpec = document.querySelector("#team-spec");
const teamAbout = document.querySelector("#team-about");
const teamCards = document.querySelectorAll(".js-team-card");

function openTeamModal(card) {
  teamName.textContent = card.dataset.name || "";
  teamRole.textContent = card.dataset.role || "";
  teamAge.textContent = card.dataset.age || "";
  teamExp.textContent = card.dataset.exp || "";
  teamSpec.textContent = card.dataset.spec || "";
  teamAbout.textContent = card.dataset.about || "";
  teamModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeTeamModal() {
  teamModal.hidden = true;
  document.body.style.overflow = "";
}

teamCards.forEach((card) => {
  card.addEventListener("click", () => {
    openTeamModal(card);
  });
});

if (teamModal) {
  teamModal.querySelectorAll("[data-close-team]").forEach((node) => {
    node.addEventListener("click", closeTeamModal);
  });
}

const expandTriggers = document.querySelectorAll(".js-expand-trigger");

expandTriggers.forEach((trigger) => {
  const targetSelector = trigger.dataset.target;
  const hiddenSelector = trigger.dataset.items;
  const defaultText = trigger.dataset.defaultText || "Показать";
  const target = document.querySelector(targetSelector);
  if (!target || !hiddenSelector) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const hiddenItems = target.querySelectorAll(hiddenSelector);
    const isExpanded = trigger.dataset.expanded === "true";

    hiddenItems.forEach((item) => {
      item.classList.toggle("is-visible", !isExpanded);
    });

    trigger.dataset.expanded = String(!isExpanded);
    trigger.textContent = !isExpanded ? "Скрыть" : defaultText;
    target.classList.add("team-grid--active");
    setTimeout(() => {
      target.classList.remove("team-grid--active");
    }, 900);
  });
});

const bookingModal = document.querySelector("#booking-modal");
const heroBookingForm = document.querySelector("#hero-booking-form");
const bookingModalSuccess = document.querySelector("#booking-modal-success");
const openBookingButtons = document.querySelectorAll(".js-open-booking");

function closeBookingModal() {
  if (bookingModal) {
    bookingModal.hidden = true;
    document.body.style.overflow = "";
  }
}

function openBookingModal() {
  if (detailsModal && !detailsModal.hidden) {
    closeDetailsModal();
  }
  if (teamModal && !teamModal.hidden) {
    closeTeamModal();
  }
  if (bookingModal) {
    bookingModal.hidden = false;
    document.body.style.overflow = "hidden";
  }
}

openBookingButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openBookingModal();
  });
});

if (bookingModal) {
  bookingModal.querySelectorAll("[data-close-booking]").forEach((node) => {
    node.addEventListener("click", closeBookingModal);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && bookingModal && !bookingModal.hidden) {
    closeBookingModal();
  }
});

if (heroBookingForm && bookingModalSuccess) {
  heroBookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    heroBookingForm.reset();
    bookingModalSuccess.hidden = false;
    setTimeout(() => {
      bookingModalSuccess.hidden = true;
    }, 4500);
  });
}

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const base = `${window.location.pathname}${window.location.search}`;
    if (history.replaceState) {
      history.replaceState(null, "", `${base}#top`);
    }
  });
});
