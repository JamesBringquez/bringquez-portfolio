export default function ArkeHoloStyles() {
  return (
    <style>{`
      .arke-holo-text {
        background: linear-gradient(
          90deg,
          #0a0a0a 0%,
          #0a0a0a 30%,
          #f0abfc 40%,
          #c4b5fd 48%,
          #93c5fd 55%,
          #5eead4 62%,
          #0a0a0a 72%,
          #0a0a0a 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: arke-holo-shift 4s linear infinite;
      }
      .arke-holo-bar {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 182, 220, 0.9),
          rgba(196, 181, 253, 0.95),
          rgba(147, 197, 253, 0.95),
          rgba(94, 234, 212, 0.9),
          transparent
        );
        background-size: 200% 100%;
        animation: arke-holo-shift 3.5s linear infinite;
      }
      .arke-holo-surface {
        position: relative;
        background: #ffffff;
        overflow: hidden;
      }
      .arke-holo-surface::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          105deg,
          transparent 0%,
          transparent 35%,
          rgba(255, 182, 220, 0.22) 42%,
          rgba(196, 181, 253, 0.28) 48%,
          rgba(147, 197, 253, 0.26) 54%,
          rgba(94, 234, 212, 0.2) 60%,
          transparent 68%,
          transparent 100%
        );
        background-size: 250% 100%;
        animation: arke-holo-shift 6s ease-in-out infinite;
        pointer-events: none;
        mix-blend-mode: multiply;
      }
      .arke-holo-overlay {
        background: linear-gradient(
          135deg,
          rgba(255, 182, 220, 0.2),
          rgba(147, 197, 253, 0.25),
          rgba(94, 234, 212, 0.2)
        );
        background-size: 200% 200%;
        animation: arke-holo-shift 5s ease infinite;
      }
      .group:hover .arke-holo-surface::after {
        animation-duration: 3s;
      }
      .arke-holo-text-light {
        background: linear-gradient(
          90deg,
          #ffffff 0%,
          #ffffff 28%,
          #f0abfc 38%,
          #c4b5fd 46%,
          #93c5fd 54%,
          #5eead4 62%,
          #ffffff 72%,
          #ffffff 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: arke-holo-shift 4s linear infinite;
      }
      @keyframes arke-holo-shift {
        0%, 100% { background-position: 0% center; }
        50% { background-position: 100% center; }
      }
      .arke-reviews-track {
        animation: arke-reviews-marquee 45s linear infinite;
      }
      .arke-reviews-marquee:hover .arke-reviews-track {
        animation-play-state: paused;
      }
      @keyframes arke-reviews-marquee {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .arke-reviews-marquee {
          overflow-x: auto;
        }
        .arke-reviews-track {
          animation: none;
        }
      }
    `}</style>
  )
}
