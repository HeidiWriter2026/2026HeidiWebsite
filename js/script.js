document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Email address is assembled here at runtime, not written as plain text
  // or a mailto: href anywhere in the HTML, so static scrapers can't harvest it.
  var addressParts = ['heidi', 'heidihostetter.com'];
  var authorEmail = addressParts[0] + '@' + addressParts[1];

  var revealLink = document.querySelector('[data-reveal-email]');
  if (revealLink) {
    revealLink.addEventListener('click', function (e) {
      e.preventDefault();
      this.href = 'mailto:' + authorEmail;
      this.textContent = authorEmail;
    });
  }

  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.querySelector('#contact-form-note');
      var submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) submitBtn.disabled = true;
      if (note) note.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (note) note.textContent = 'Thanks for reaching out — your message is on its way to Heidi.';
        } else {
          return response.json().then(function (data) {
            var detail = data && data.errors && data.errors.length
              ? data.errors.map(function (err) { return err.message; }).join(', ')
              : null;
            if (note) note.textContent = detail || 'Something went wrong sending your message. Please try again or email Heidi directly.';
          });
        }
      }).catch(function () {
        if (note) note.textContent = 'Something went wrong sending your message. Please try again or email Heidi directly.';
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // Buy Now widgets: opening one closes any others, and clicking
  // outside an open widget closes it.
  var buyWidgets = document.querySelectorAll('details.buy-widget');
  buyWidgets.forEach(function (widget) {
    widget.addEventListener('toggle', function () {
      if (widget.open) {
        buyWidgets.forEach(function (other) {
          if (other !== widget) other.removeAttribute('open');
        });
      }
    });
  });

  document.addEventListener('click', function (e) {
    buyWidgets.forEach(function (widget) {
      if (widget.open && !widget.contains(e.target)) {
        widget.removeAttribute('open');
      }
    });
  });
});
