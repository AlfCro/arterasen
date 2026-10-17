// Remembers the visitor's language so the next QR code opens in the same language,
// and registers the offline cache. Everything is optional: pages work without it.
(function () {
  var body = document.body;
  if (body.getAttribute('data-savelang') === '1') {
    try {
      localStorage.setItem('lang', document.documentElement.lang);
    } catch (e) {}
  }
  var sw = body.getAttribute('data-sw');
  if (sw && 'serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(sw).catch(function () {});
    });
  }
})();
