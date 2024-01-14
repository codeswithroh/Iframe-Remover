document.addEventListener("DOMContentLoaded", function () {
  const removeIframesBtn = document.getElementById("removeIframesBtn");
  const statusText = document.getElementById("statusText");

  chrome.storage.sync.get({ isActive: false }, function (data) {
    updateButtonState(data.isActive);
  });

  removeIframesBtn.addEventListener("click", function () {
    chrome.storage.sync.get({ isActive: false }, function (data) {
      const newStatus = !data.isActive;
      chrome.storage.sync.set({ isActive: newStatus });
      updateButtonState(newStatus);
    });
  });

  function updateButtonState(isActive) {
    if (isActive) {
      removeIframesBtn.classList.add(
        "toggle-button--active",
        ".toggle-button__switch"
      );
      statusText.textContent = "Iframes are being removed.";
    } else {
      removeIframesBtn.classList.remove(
        "toggle-button--active",
        ".toggle-button__switch"
      );
      statusText.textContent = "Iframes are not being removed.";
    }
  }
});
