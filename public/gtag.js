// public/gtag.js
!(function (w, d, u, s) {
  function t(n) {
    s = d.getElementsByTagName("script")[0];
    u = d.createElement("script");
    u.async = 1;
    u.src = "https://www.googletagmanager.com/gtag/js?id=" + n;
    s.parentNode.insertBefore(u, s);
  }
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  t("G-649VNLTLLV"); // Replace G-XXXXXXXXXX with your Measurement ID
})(window, document);
