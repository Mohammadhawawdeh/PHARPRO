/* PHARPRO DVS fit-check, progressive demo qualification, attribution and booking. */
(function () {
  'use strict';

  var CALENDLY_URL = 'https://calendly.com/mohammadhawawdeh7/pharpro-ai';
  var fitForm = document.getElementById('dvs-fit-form');
  var demoForm = document.getElementById('dvs-demo-form');
  if (!fitForm && !demoForm) return;

  function track(name, data) {
    if (typeof window.pharproTrack === 'function') window.pharproTrack(name, data || {});
  }

  function trackLead(method, placement, service, id) {
    if (typeof window.pharproTrackLead === 'function') {
      window.pharproTrackLead(method, placement, service, id);
    }
  }

  function slug(value) {
    return String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 100);
  }

  function leadId(prefix) {
    return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function captureAttribution(targetForm) {
    if (!targetForm) return;
    var params = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (name) {
      var storageKey = 'pharpro_' + name;
      var value = params.get(name);
      try {
        if (value) sessionStorage.setItem(storageKey, slug(value));
        value = sessionStorage.getItem(storageKey) || '';
      } catch (error) {
        value = value ? slug(value) : '';
      }
      var input = targetForm.querySelector('[name="' + name + '"]');
      if (input) input.value = value;
    });
  }

  function validFields(container) {
    var valid = true;
    container.querySelectorAll('input,select,textarea').forEach(function (field) {
      if (!field.checkValidity()) {
        if (valid) field.reportValidity();
        valid = false;
      }
    });
    return valid;
  }

  async function submitWeb3Form(data) {
    var response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    var result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
    return result;
  }

  function initFitCheck() {
    if (!fitForm) return;
    var button = document.getElementById('dvs-fit-submit');
    var message = document.getElementById('dvs-fit-msg');
    var started = false;

    fitForm.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('form_start', { form_id: 'dvs_fit_check', service: 'pharpro_dvs' });
    }, { once: true });

    fitForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!validFields(fitForm)) return;
      button.disabled = true;
      button.textContent = 'Sending…';
      message.hidden = true;
      var data = new FormData(fitForm);
      var id = leadId('dvs_fit');
      data.set('lead_id', id);
      try {
        await submitWeb3Form(data);
        message.hidden = false;
        message.className = 'dvs-form-message success';
        message.textContent = 'Request received. Mohammad or a PHARPRO consultant will contact you within one business day to arrange the 10-minute call.';
        button.textContent = 'Request received';
        trackLead('web_form', 'dvs_fit_check', 'pharpro_dvs', id);
      } catch (error) {
        message.hidden = false;
        message.className = 'dvs-form-message error';
        message.textContent = 'We could not submit the form. Please try again or email info@pharpro.co.';
        button.disabled = false;
        button.textContent = 'Request my fit check →';
        track('form_error', { form_id: 'dvs_fit_check', error_type: 'submission' });
      }
    });

    captureAttribution(fitForm);
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

  function initDemo() {
    if (!demoForm) return;
    var firstStep = demoForm.querySelector('[data-form-step="1"]');
    var secondStep = demoForm.querySelector('[data-form-step="2"]');
    var nextButton = demoForm.querySelector('[data-form-next]');
    var backButton = demoForm.querySelector('[data-form-back]');
    var submitButton = document.getElementById('dvs-submit-btn');
    var message = document.getElementById('dvs-form-msg');
    var calendar = document.getElementById('dvs-calendar');
    var frame = document.getElementById('dvs-calendar-frame');
    var started = false;

    function showStep(number) {
      firstStep.hidden = number !== 1;
      secondStep.hidden = number !== 2;
      demoForm.setAttribute('data-current-step', String(number));
      var focus = (number === 1 ? firstStep : secondStep).querySelector('input,select');
      if (focus) focus.focus();
    }

    nextButton.addEventListener('click', function () {
      if (!validFields(firstStep)) return;
      track('form_step_complete', { form_id: 'dvs_demo', step_number: 1 });
      showStep(2);
    });

    backButton.addEventListener('click', function () { showStep(1); });

    demoForm.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('form_start', { form_id: 'dvs_demo', service: 'pharpro_dvs' });
    }, { once: true });

    demoForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!validFields(secondStep)) return;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      message.hidden = true;
      var data = new FormData(demoForm);
      var id = data.get('lead_id') || leadId('dvs_demo');
      data.set('lead_id', id);
      data.set('lead_score', String(scoreLead(data)));
      try {
        await submitWeb3Form(data);
        message.hidden = false;
        message.className = 'dvs-form-message success';
        message.textContent = 'Request received. Choose an available time below to complete your booking.';
        trackLead('web_form', 'dvs_demo_progressive', 'pharpro_dvs', id);
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

    captureAttribution(demoForm);
    showStep(1);
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== 'https://calendly.com') return;
    if (event.data && event.data.event === 'calendly.event_scheduled') {
      track('appointment_scheduled', { service: 'pharpro_dvs', placement: 'embedded_calendar' });
    }
  });

  initFitCheck();
  initDemo();
  track('view_dvs_landing', { service: 'pharpro_dvs' });
})();
