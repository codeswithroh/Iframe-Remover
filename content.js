chrome.storage.sync.get({ isActive: false, domains: [] }, function (data) {
  if (
    data.isActive &&
    data.domains.some((domain) => window.location.host.includes(domain))
  ) {
    removeIframes();
  }
});

function removeIframes() {
  setInterval(function () {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => iframe.remove());
  }, 1000);
}
