/* PHARPRO MACO calculator checkout.
 * Set CHECKOUT_URL to the Lemon Squeezy checkout link for the product
 * (Lemon Squeezy → Products → Share → copy checkout link). While it is empty,
 * buy buttons fall back to the contact form so a buyer can still order. */
(function () {
  "use strict";
  var CHECKOUT_URL = "";
  var ar = document.documentElement.lang === "ar";
  var fallback = (ar ? "/contact/ar/" : "/contact/") + "?service=qa";
  var buttons = document.querySelectorAll("[data-buy]");
  var live = /^https:\/\/[a-z0-9-]+\.lemonsqueezy\.com\//i.test(CHECKOUT_URL);

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
