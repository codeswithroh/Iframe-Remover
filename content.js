chrome.storage.sync.get({ isActive: false }, function (data) {
  if (data.isActive) {
    removeIframes();
  }
});

function removeIframes() {
  setInterval(function () {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => iframe.remove());
  }, 1000); // Adjust the interval as needed
}
