
async function unregisterServiceWorkers() {
  const registrations = await window.navigator.serviceWorker.getRegistrations()
  for (const registration of registrations) {
    registration.unregister();
  }
}

function isLoadFailed() {
  const titleEl = document.querySelector('.landing-title');
  return titleEl && titleEl.innerHTML.includes('Google Chrome');
}

window.onload = async () => {
  if (isLoadFailed()) {
    await unregisterServiceWorkers();
    window.location.reload();
  }
}