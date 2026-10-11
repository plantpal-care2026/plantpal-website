const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const plantSuggestions = {
  bright: {
    title: "Great choices for bright, indirect light",
    plants: ["Money Plant", "Peace Lily", "Monstera"],
    tip: "Keep plants away from harsh midday sun unless the species can tolerate it."
  },
  low: {
    title: "Plants to explore for lower-light spaces",
    plants: ["Snake Plant", "ZZ Plant", "Money Plant"],
    tip: "Low light does not mean no light. Growth may be slower, so check each plant's needs."
  },
  sunny: {
    title: "Plants to explore for brighter, sunny spots",
    plants: ["Aloe Vera", "Jade Plant", "Some succulents"],
    tip: "Introduce plants to stronger sunlight gradually to reduce the chance of leaf scorch."
  }
};

document.getElementById("findPlants").addEventListener("click", () => {
  const light = document.getElementById("lightSelect").value;
  const result = plantSuggestions[light];
  document.getElementById("finderResult").innerHTML =
    `<strong>${result.title}</strong><br>${result.plants.join(" • ")}<br><br>${result.tip}`;
});

const reminderDate = document.getElementById("reminderDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
reminderDate.min = localToday;

document.getElementById("reminderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const plant = document.getElementById("plantSelect").value;
  const date = reminderDate.value;
  if (!plant || !date) {
    document.getElementById("reminderMessage").textContent = "Please choose a plant and date.";
    return;
  }
  const readableDate = new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    day: "numeric", month: "long", year: "numeric"
  });
  document.getElementById("reminderMessage").textContent =
    `Reminder set for ${plant}: check its soil on ${readableDate}. This reminder lasts only while this page is open.`;
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const name = document.getElementById("name").value.trim();
  document.getElementById("contactMessage").textContent =
    `Thank you, ${name}! Your demo message has been checked successfully. This sample form does not send email.`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
