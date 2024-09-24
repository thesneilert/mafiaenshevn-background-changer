document.getElementById('applyBtn').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput').files[0];
    const imageUrl = document.getElementById('imageUrl').value;
  
    let backgroundImage;
  
    if (imageInput) {
      const reader = new FileReader();
      reader.onloadend = function() {
        backgroundImage = reader.result;
        saveAndApplyBackground(backgroundImage);
      };
      reader.readAsDataURL(imageInput);
    } else if (imageUrl) {
      backgroundImage = imageUrl;
      saveAndApplyBackground(backgroundImage);
    } else {
      alert('Please select an image or enter a URL');
    }
  });
  
  async function saveAndApplyBackground(backgroundImage) {
    // Save the image in chrome storage
    chrome.storage.local.set({ mafiaBackground: backgroundImage }, function() {
      console.log('Background image saved.');
    });
  
    // Apply the background image immediately on the current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (image) => {
        document.body.style.backgroundImage = `url(${image})`;
        document.body.style.backgroundSize = 'cover';
      },
      args: [backgroundImage]
    });
  }
  