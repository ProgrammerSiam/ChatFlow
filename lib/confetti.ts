import confetti from 'canvas-confetti';

/**
 * Fires a lightweight celebration confetti burst on UI achievements & actions
 */
export function triggerCelebration(options?: confetti.Options) {
  try {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#8E7CFF', '#725CFF', '#B6A8FF', '#10B981', '#38BDF8'],
      disableForReducedMotion: true,
      ...options,
    });
  } catch (err) {
    // Gracefully ignore if canvas is not supported in environment
    console.debug('Confetti trigger skipped:', err);
  }
}

/**
 * Fireworks celebration for major milestones (Group created, Chat initialized)
 */
export function triggerMilestoneCelebration() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#8E7CFF', '#725CFF', '#C9C1FF', '#10B981', '#F59E0B'],
      disableForReducedMotion: true,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  } catch (err) {
    console.debug('Milestone confetti skipped:', err);
  }
}
