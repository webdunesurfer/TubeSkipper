/**
 * TubeSkipper - High-Frequency Enforcement (2025 Bypass)
 */

const SKIP_SELECTORS = [
  '.ytp-ad-skip-button-modern',
  '.ytp-skip-ad-button',
  '.ytp-ad-skip-button',
  'button[aria-label*="Skip"]',
  '[id^="skip-button:"]',
  '.ytp-ad-skip-button-slot'
];

/**
 * Simulates a "real" human click sequence.
 */
function simulateHumanClick(element) {
  const opts = { bubbles: true, cancelable: true, view: window, buttons: 1 };
  element.dispatchEvent(new MouseEvent('mousedown', opts));
  element.dispatchEvent(new MouseEvent('mouseup', opts));
  element.dispatchEvent(new MouseEvent('click', opts));
}

/**
 * Main logic to terminate ads.
 * Runs at high frequency to override YouTube's reset attempts.
 */
function enforceSkip() {
  const player = document.querySelector('#movie_player');
  const video = document.querySelector('video.html5-main-video');
  const isAd = player?.classList.contains('ad-showing') || player?.classList.contains('ad-interrupting');
  
  if (!isAd) {
    // Ensure speed is reset to normal when ad is gone
    if (video && video.playbackRate > 2) {
      video.playbackRate = 1;
    }
    return;
  }

  // 1. High-Frequency Video Enforcement
  if (video) {
    video.muted = true;
    
    // Always keep it at 16x. YouTube tries to reset this to 1x.
    if (video.playbackRate < 16) {
      video.playbackRate = 16;
    }

    // Attempt to jump to the very end
    if (isFinite(video.duration) && video.currentTime < video.duration - 0.1) {
      video.currentTime = video.duration;
    }
  }

  // 2. Click detection & human simulation
  for (const selector of SKIP_SELECTORS) {
    const btn = document.querySelector(selector);
    if (btn && btn.offsetParent !== null) {
      simulateHumanClick(btn);
      // Optional: Log only if debugging, but high frequency logs can crash the tab
    }
  }

  // 3. Close overlay banners
  const overlay = document.querySelector('.ytp-ad-overlay-close-button');
  if (overlay) overlay.click();
}

/**
 * Initialization
 */
function init() {
  console.log('[TubeSkipper] High-Frequency Monitor Active (50ms).');

  // Run at 50ms interval to win the "race" against YouTube's reset scripts
  setInterval(enforceSkip, 50);

  // Still use MutationObserver for instant reaction to DOM changes
  new MutationObserver(enforceSkip).observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
