// ==UserScript==
// @name         YouTube Ad Skipper PL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatyczne pomijanie i zamykanie reklam YouTube
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function closeOverlay() {
        const overlayClose = document.querySelector(
            '.ytp-ad-overlay-close-button'
        );
        if (overlayClose && overlayClose.offsetParent !== null) {
            overlayClose.click();
            console.log('✅ Zamknięto overlay reklamy');
        }
    }

    function clickSkipButton() {
        const selectors = [
            '.ytp-ad-skip-button',
            '.ytp-ad-skip-button-modern',
            'button[aria-label*="Pomiń reklamę"]',
            'button[aria-label*="Skip Ad"]'
        ];
        for (const sel of selectors) {
            const btn = document.querySelector(sel);
            if (btn && btn.offsetParent !== null) {
                btn.click();
                console.log('✅ Kliknięto przycisk Pomiń reklamę');
                return true;
            }
        }
        return false;
    }

    function endAdPlayback() {
        const adPlayer = document.querySelector('.html5-video-player.ad-showing');
        const video = document.querySelector('video');
        if (adPlayer && video && isFinite(video.duration) && video.duration > 0) {
            video.currentTime = video.duration;
            console.log('⏩ Przewinięto reklamę do końca');
        }
    }

    function trySkipAd() {
        closeOverlay();
        if (clickSkipButton()) return;
        endAdPlayback();
    }

    const observer = new MutationObserver(trySkipAd);
    observer.observe(document.body, {childList: true, subtree: true});

    setInterval(trySkipAd, 1000);

    console.log('🔧 Skrypt Ad Skipper PL aktywny');
})();
