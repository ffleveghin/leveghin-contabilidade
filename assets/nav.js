document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var dropToggle = document.getElementById('servicosDropToggle');
  var dropPanel = document.getElementById('servicosDropPanel');
  if (dropToggle && dropPanel) {
    dropToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropPanel.classList.toggle('open');
      dropToggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function (e) {
      if (!dropPanel.contains(e.target) && e.target !== dropToggle) {
        dropPanel.classList.remove('open');
        dropToggle.setAttribute('aria-expanded', 'false');
      }
    });
    dropPanel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        dropPanel.classList.remove('open');
        dropToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
