/* PHARPRO DVS progressive demo form, attribution, qualification and booking. */
(function () {
  'use strict';

  var CALENDLY_URL = 'https://calendly.com/mohammadhawawdeh7/pharpro-ai';
  var form = document.getElementById('dvs-demo-form');
  if (!form) return;

  var firstStep = form.querySelector('[data-form-step="1"]');
  var secondStep = form.querySelector('[data-form-step="2"]');
  var nextButton = form.querySelector('[data-form-next]');
  var backButton = form.querySelector('[data-form-back]');
  var submitButton = document.getElementById('dvs-submit-btn');
  var message = document.getElementById('dvs-form-msg');
  var calendar = document.getElementById('dvs-calendar');
  var frame = document.getElementById('dvs-calendar-frame');
  var started = false;

  function track(name, data) {
    if (typeof window.pharproTrack === 'function') window.pharproTrack(name, data || {});
  }

  function slug(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 100);
  }

  function leadId() {
    return 'dvs_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function captureAttribution() {
    var params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (name) {
      var storageKey = 'pharpro_' + name;
      var value = params.get(name);
      if (value) sessionStorage.setItem(storageKey, slug(value));
      var input = form.querySelector('[name="' + name + '"]');
      if (input) input.value = sessionStorage.getItem(storageKey) || '';
    });
  }

  function validStep(step) {
    var valid = true;
    step.querySelectorAll('input,select,textarea').forEach(function (field) {
      if (!field.checkValidity()) {
        field.reportValidity();
        valid = false;
      }
    });
    return valid;
  }

  function scoreLead(data) {
    var score = 0;
    if (/manufacturer|biotechnology|cdmo|cro/i.test(data.get('company_type') || '')) score += 15;
    if (/Validation|Quality Assurance|CQV|Manufacturing|IT/i.test(data.get('role') || '')) score += 15;
    if (data.get('decision_timeline') === '0-3_months') score += 15;
    else if (data.get('decision_timeline') === '3-6_months') score += 8;
    if (/^(6-10|11\+)$/.test(data.get('projects_12_months') || '')) score += 10;
    if (data.get('current_method') === 'Word and Excel') score += 10;
    return score;
  }

  function showStep(number) {
    firstStep.hidden = number !== 1;
    secondStep.hidden = number !== 2;
    form.setAttribute('data-current-step', String(number));
    var focus = (number === 1 ? firstStep : secondStep).querySelector('input,select');
    if (focus) focus.focus();
  }

  nextButton.addEventListener('click', function () {
    if (!validStep(firstStep)) return;
    track('form_step_complete', { form_id: 'dvs_demo', step_number: 1 });
    showStep(2);
  });

  backButton.addEventListener('click', function () { showStep(1); });

  form.addEventListener('input', function () {
    if (started) return;
    started = true;
    track('form_start', { form_id: 'dvs_demo', service: 'pharpro_dvs' });
  }, { once: true });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!validStep(secondStep)) return;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    message.hidden = true;
    var data = new FormData(form);
    var id = data.get('lead_id') || leadId();
    data.set('lead_id', id);
    data.set('lead_score', String(scoreLead(data)));
    try {
      var response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      var result = await response.json();
      if (!result.success) throw new Error(result.message || 'Submission failed');
      message.hidden = false;
      message.className = 'dvs-form-message success';
      message.textContent = 'Request received. Choose an available time below to complete your booking.';
      window.pharproTrackLead('web_form', 'dvs_demo_progressive', 'pharpro_dvs', id);
      var fullName = String(data.get('name') || '').trim().split(/\s+/);
      var url = new URL(CALENDLY_URL);
      url.searchParams.set('hide_gdpr_banner', '1');
      if (fullName[0]) url.searchParams.set('first_name', fullName.shift());
      if (fullName.length) url.searchParams.set('last_name', fullName.join(' '));
      if (data.get('email')) url.searchParams.set('email', data.get('email'));
      frame.src = url.toString();
      calendar.hidden = false;
      track('calendar_view', { placement: 'dvs_demo_success', lead_id: id });
      calendar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      message.hidden = false;
      message.className = 'dvs-form-message error';
      message.textContent = 'We could not submit the form. Please try again or email info@pharpro.co.';
      submitButton.disabled = false;
      submitButton.textContent = 'Submit and choose a time →';
      track('form_error', { form_id: 'dvs_demo', error_type: 'submission' });
    }
  });

  window.addEventListener('message', function (event) {
    if (event.origin !== 'https://calendly.com') return;
    if (event.data && event.data.event === 'calendly.event_scheduled') {
      track('appointment_scheduled', { service: 'pharpro_dvs', placement: 'embedded_calendar' });
    }
  });

  captureAttribution();
  showStep(1);
  track('view_dvs_landing', { service: 'pharpro_dvs' });
})();
