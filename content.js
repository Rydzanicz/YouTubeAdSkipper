function clickSkipButton() {
  const skipButton = document.querySelector('.ytp-ad-skip-button');
  if (skipButton) {
    skipButton.click();
    console.log('🔁 Reklama pominięta');
  }
}

const observer = new MutationObserver(() => {
  clickSkipButton();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

setInterval(clickSkipButton, 2000);
