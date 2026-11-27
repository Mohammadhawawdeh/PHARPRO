/* PHARPRO CSV SOP Kit checkout.
 * Set CHECKOUT_URL to the Polar checkout link for the product
 * (Polar → Products → the product → Checkout link → copy). While it is empty,
 * buy buttons fall back to the contact form so a buyer can still order. */
(function () {
  "use strict";
  var CHECKOUT_URL = "";
  var ar = document.documentElement.lang === "ar";
  var fallback = (ar ? "/contact/ar/" : "/contact/") + "?service=csv";
  var buttons = document.querySelectorAll("[data-buy]");
  var live = /^https:\/\/([a-z0-9-]+\.)?polar\.sh\//i.test(CHECKOUT_URL);

  for (var i = 0; i < buttons.length; i++) {
    var b = buttons[i];
    b.setAttribute("href", live ? CHECKOUT_URL : fallback);
    if (live) { b.setAttribute("rel", "noopener"); }
    b.addEventListener("click", function () {
      if (typeof window.pharproTrack === "function") {
        window.pharproTrack(live ? "begin_checkout" : "cta_click", {
          placement: "csv_sop_kit", service: "csv_sop_kit",
          value: 1199, currency: "USD"
        });
      }
    });
  }

  var trust = document.querySelector(".trust");
  if (trust && !live) {
    trust.textContent = ar
      ? "اطلب عبر نموذج التواصل وسنرسل لك رابط الدفع والحزمة خلال يوم عمل واحد."
      : "Order through our contact form and we will send you a payment link and the kit within one business day.";
  }
})();
