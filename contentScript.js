function applyBackgroundImage() {
    chrome.storage.local.get('mafiaBackground', function(data) {
      if (data.mafiaBackground) {
        document.body.style.backgroundImage = `url(${data.mafiaBackground})`;
        document.body.style.backgroundSize = 'cover';
      }
    });
  }
  
  // Apply the background image on initial load
  applyBackgroundImage();
  
  // Use MutationObserver to detect navigation changes and reapply the background
  const observer = new MutationObserver(() => {
    applyBackgroundImage();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Reapply the background on URL changes
  window.addEventListener('popstate', applyBackgroundImage);
  window.addEventListener('pushstate', applyBackgroundImage);
  window.addEventListener('replacestate', applyBackgroundImage);
  