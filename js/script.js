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
      var name = form.querySelector('#cf-name').value.trim();
      var replyTo = form.querySelector('#cf-email').value.trim();
      var message = form.querySelector('#cf-message').value.trim();

      var subject = 'Message from ' + (name || 'your website') + ' via heidihostetter.com';
      var body = message + '\n\n---\nFrom: ' + name + ' (' + replyTo + ')';
      var mailto = 'mailto:' + authorEmail +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      var note = document.querySelector('#contact-form-note');
      if (note) {
        note.textContent = 'Opening your email app to send this to Heidi… if nothing happens, your device may not have one configured.';
      }
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
