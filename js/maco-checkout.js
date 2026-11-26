/* PHARPRO MACO calculator checkout.
 * Set CHECKOUT_URL to the Polar checkout link for the product
 * (Polar → Products → the product → Checkout link → copy). While it is empty,
 * buy buttons fall back to the contact form so a buyer can still order. */
(function () {
  "use strict";
  // Polar checkout link (store still in test mode on 2026-11-26). Paste it into
  // CHECKOUT_URL once Polar approves the store for live payments:
  // https://buy.polar.sh/polar_cl_s1MDPViHlUOedaLQGutEFX7aooZDfZt04DHAV1fFLcR
  var CHECKOUT_URL = "";
  var ar = document.documentElement.lang === "ar";
  var fallback = (ar ? "/contact/ar/" : "/contact/") + "?service=qa";
  var buttons = document.querySelectorAll("[data-buy]");
  var live = /^https:\/\/([a-z0-9-]+\.)?polar\.sh\//i.test(CHECKOUT_URL);

  for (var i = 0; i < buttons.length; i++) {
    var b = buttons[i];
    b.setAttribute("href", live ? CHECKOUT_URL : fallback);
    if (live) { b.setAttribute("rel", "noopener"); }
    b.addEventListener("click", function () {
      if (typeof window.pharproTrack === "function") {
        window.pharproTrack(live ? "begin_checkout" : "cta_click", {
          placement: "maco_calculator", service: "maco_calculator",
          value: 79, currency: "USD"
        });
      }
    });
  }

  var trust = document.querySelector(".trust");
  if (trust && !live) {
    trust.textContent = ar
      ? "اطلب عبر نموذج التواصل وسنرسل لك رابط الدفع والملف خلال يوم عمل واحد."
      : "Order through our contact form and we will send you a payment link and the file within one business day.";
  }
})();
