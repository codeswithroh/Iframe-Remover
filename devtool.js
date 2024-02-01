document.addEventListener("DOMContentLoaded", function () {
  const removeIframesBtn = document.getElementById("removeIframesBtn");
  const statusText = document.getElementById("statusText");

  chrome.storage.sync.get({ isActive: false, domains: [] }, function (data) {
    updateButtonState(data.isActive);
    // Display the stored domains
    data.domains.forEach((domain) => displayDomain(domain));
  });

  removeIframesBtn.addEventListener("click", function () {
    chrome.storage.sync.get({ isActive: false }, function (data) {
      const newStatus = !data.isActive;
      chrome.storage.sync.set({ isActive: newStatus });
      updateButtonState(newStatus);
    });
  });

  document
    .getElementById("submitDomainBtn")
    .addEventListener("click", function () {
      var domain = document.getElementById("domainInput").value;
      var hostWithPort = new URL(domain).host;
      chrome.storage.sync.get({ domains: [] }, function (data) {
        data.domains.push(hostWithPort);
        chrome.storage.sync.set({ domains: data.domains }, function () {
          displayDomain(hostWithPort);
        });
      });
      domain = "";
    });

  function displayDomain(domain) {
    var submittedDomainsDiv = document.getElementById("submittedDomains");
    var domainDiv = document.createElement("div");
    domainDiv.textContent = domain;
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      chrome.storage.sync.get({ domains: [] }, function (data) {
        const index = data.domains.indexOf(domain);
        if (index > -1) {
          data.domains.splice(index, 1);
          chrome.storage.sync.set({ domains: data.domains });
        }
        submittedDomainsDiv.removeChild(domainDiv);
      });
    });
    domainDiv.appendChild(deleteBtn);
    submittedDomainsDiv.appendChild(domainDiv);
  }

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
