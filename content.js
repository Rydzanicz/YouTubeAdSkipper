//const indicator = document.createElement('div');
//indicator.textContent = '🚀 Ad Skipper działa';
//indicator.style.position = 'fixed';
//indicator.style.top = '0';
//indicator.style.left = '0';
//indicator.style.width = '100%';
//indicator.style.backgroundColor = '#27ae60';
//indicator.style.color = 'white';
//indicator.style.fontSize = '14px';
//indicator.style.fontWeight = 'bold';
//indicator.style.textAlign = 'center';
//indicator.style.zIndex = '9999';
//indicator.style.padding = '4px 0';
//document.body.appendChild(indicator);

function trySkipAd() {
  const skipButtons = document.querySelectorAll(
    '.ytp-ad-skip-button, .ytp-skip-ad-button, button[aria-label="Pomiń reklamę"], .ytp-ad-overlay-close-button'
  );

  for (const button of skipButtons) {
    if (button.offsetParent !== null) {
      button.click();
      console.log('✅ Kliknięto przycisk pomiń');
      return;
    }
  }

  const adContainer = document.querySelector('.ad-showing');
  if (adContainer) {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = video.duration;
      console.log('⏩ Reklama przewinięta');
    }
  }
}

const observer = new MutationObserver(() => {
  trySkipAd();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

setInterval(trySkipAd, 1500);

console.log('🔧 Skrypt Ad Skipper aktywny');
