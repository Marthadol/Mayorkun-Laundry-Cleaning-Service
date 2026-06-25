console.log("Script is working!");

document.addEventListener("DOMContentLoaded", function () {

  // 👉 HAMBURGER MENU
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navMenu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // 👉 ELEMENTS
  const cards = document.querySelectorAll(".order-card");
  const serviceInput = document.getElementById("service");
  const form = document.getElementById("orderForm");

  const pickupDate = document.getElementById("pickupDate");
  const returnDate = document.getElementById("returnDate");

  let selectedService = "";

  // 👉 SERVICE SELECTION
  cards.forEach(card => {
  card.addEventListener("click", (e) => {

    const targetCard = e.currentTarget;

    cards.forEach(c => c.classList.remove("active"));
    targetCard.classList.add("active");

    selectedService = targetCard.getAttribute("data-service");
    serviceInput.value = selectedService;
  });
});

  // 👉 DATE LOGIC
  if (pickupDate && returnDate) {

    // prevent past dates
    const today = new Date().toISOString().split("T")[0];
    pickupDate.min = today;

    pickupDate.addEventListener("change", () => {
      returnDate.min = pickupDate.value;

      // auto suggest +2 days
      const date = new Date(pickupDate.value);
      date.setDate(date.getDate() + 2);
      returnDate.value = date.toISOString().split("T")[0];
    });
  }

  // 👉 FORM SUBMIT
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const pickup = pickupDate.value;
      const returnD = returnDate.value;
      const address = document.getElementById("address").value;

      if (!selectedService) {
        alert("Please select a service first");
        return;
      }

   if (!selectedService) {
  alert("Please select a service");
  return;
}

// Only require dates if it's NOT home cleaning
if (!selectedService.toLowerCase().includes("home")) {
  if (!pickupDate.value || !returnDate.value) {
    alert("Please select pickup and return date");
    return;
  }
}

      const message = `New Booking Request:
Name: ${name}
Phone: ${phone}
Service: ${selectedService}
Pickup Date: ${pickup}
Return Date: ${returnD}
Address: ${address}`;

      const whatsappNumber = "2349157737543";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.location.href = url;
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {

  let selectedService = "";

  const cards = document.querySelectorAll(".order-card");
  const serviceInput = document.getElementById("service");

  const pickupDate = document.getElementById("pickupDate");
  const returnDate = document.getElementById("returnDate");

  function handleServiceChange(service) {
    console.log("Selected:", service); // DEBUG

   if (service.toLowerCase().includes("home")) {
      pickupDate.disabled = true;
      returnDate.disabled = true;

      pickupDate.removeAttribute("required");
      returnDate.removeAttribute("required");

      pickupDate.value = "";
      returnDate.value = "";
    } else {
      pickupDate.disabled = false;
      returnDate.disabled = false;

      pickupDate.setAttribute("required", "true");
      returnDate.setAttribute("required", "true");
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedService = card.getAttribute("data-service");
      serviceInput.value = selectedService;

      handleServiceChange(selectedService); // 🔥 THIS IS THE KEY
    });
  });

});


document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const button = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        button.addEventListener("click", () => {

            // Close every other FAQ
            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".faq-answer").style.maxHeight = null;
                }

            });

            // Toggle current FAQ
            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }

        });

    });

});