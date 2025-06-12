//const indicator = document.createElement('div');
//indicator.textContent = '🚀 Ad Skipper działa';
//Object.assign(indicator.style, {
//  position: 'fixed',
//  top: '0',
//  left: '0',
//  width: '100%',
//  backgroundColor: '#27ae60',
//  color: 'white',
//  fontSize: '14px',
//  fontWeight: 'bold',
//  textAlign: 'center',
//  zIndex: '9999',
//  padding: '4px 0',
//  fontFamily: 'Arial, sans-serif'
//});
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
    if (video && isFinite(video.duration) && video.duration > 0) {
      video.currentTime = video.duration;
      console.log('⏩ Reklama przewinięta');
    } else {
      console.log('⚠️ Reklama się jeszcze nie załadowała (duration = NaN lub 0)');
    }
  }
}

const observer = new MutationObserver(() => {
  trySkipAd();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

setInterval(trySkipAd, 1000);

console.log('🔧 Skrypt Ad Skipper aktywny');
