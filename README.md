:root {
  font-family: 'Inter', sans-serif;
  color: #f5f7ff;
  background: #070b18;
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  --bg: #070b18;
  --bg-soft: #101937;
  --panel: rgba(15, 20, 39, 0.85);
  --panel-alt: rgba(18, 24, 48, 0.96);
  --line: rgba(164, 179, 255, 0.16);
  --text: #edf3ff;
  --muted: #a7b4d8;
  --cyan: #5ee6ff;
  --violet: #8c7bff;
  --pink: #ff69d9;
  --green: #7ef0b1;
  --yellow: #ffdd66;
  --shadow: 0 30px 80px rgba(53, 81, 176, 0.35);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(106, 92, 255, 0.28), transparent 28%),
    radial-gradient(circle at right, rgba(94, 230, 255, 0.18), transparent 20%),
    var(--bg);
  color: var(--text);
}

button,
a {
  font: inherit;
}

button {
  border: none;
  cursor: pointer;
}

img {
  max-width: 100%;
  display: block;
}

#root {
  width: 100%;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 48px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 24px;
  background: rgba(11, 16, 31, 0.7);
  border: 1px solid var(--line);
  border-radius: 22px;
  backdrop-filter: blur(16px);
  position: sticky;
  top: 16px;
  z-index: 10;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--cyan), var(--violet), var(--pink));
  color: #0a132d;
  font-weight: 900;
  letter-spacing: 0.08em;
  box-shadow: 0 12px 32px rgba(120, 116, 255, 0.4);
}

.brand-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
}

.menu {
  display: flex;
  align-items: center;
  gap: 22px;
}

.menu a {
  text-decoration: none;
  color: var(--muted);
  transition: color 0.2s ease;
}

.menu a:hover {
  color: var(--text);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.primary-btn,
.ghost-btn {
  border-radius: 999px;
  padding: 12px 20px;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn {
  color: #071c2f;
  background: linear-gradient(135deg, var(--cyan), #a7ffdb);
  box-shadow: 0 16px 28px rgba(94, 230, 255, 0.25);
}

.ghost-btn {
  color: var(--text);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
}

.primary-btn:hover,
.ghost-btn:hover {
  transform: translateY(-1px);
}

.large {
  padding: 14px 24px;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 32px;
  padding: 52px 0 26px;
}

.eyebrow {
  display: inline-flex;
  padding: 8px 12px;
  background: rgba(124, 111, 255, 0.12);
  border: 1px solid rgba(124, 111, 255, 0.25);
  border-radius: 999px;
  color: #d9d4ff;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero-copy h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.7rem, 4.5vw, 5rem);
  line-height: 1.03;
  letter-spacing: -0.06em;
  max-width: 650px;
}

.hero-copy p {
  max-width: 560px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 1.08rem;
}

.cta-row {
  display: flex;
  gap: 14px;
  margin-top: 28px;
}

.mini-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.mini-pills span {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 12px;
  color: var(--muted);
  font-size: 0.9rem;
}

.hero-visual {
  position: relative;
  min-height: 510px;
  display: grid;
  place-items: center;
}

.floating-card {
  background: rgba(17, 20, 39, 0.8);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  border-radius: 24px;
}

.main-card {
  width: min(420px, 90%);
  padding: 18px;
  position: relative;
  z-index: 2;
}

.card-top {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  padding: 4px 4px 12px;
  font-size: 0.82rem;
}

.live-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff5e7e;
  box-shadow: 0 0 18px rgba(255, 94, 126, 0.9);
}

.project-preview {
  height: 260px;
  border-radius: 18px;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.25), transparent 18%),
    linear-gradient(135deg, #040915, rgba(44, 56, 104, 0.9));
  position: relative;
  overflow: hidden;
}

.preview-one::before,
.preview-one::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(94, 230, 255, 0.26);
}

.preview-one::before {
  width: 220px;
  height: 220px;
  right: -56px;
  top: 20px;
}

.preview-one::after {
  width: 160px;
  height: 160px;
  left: -20px;
  bottom: -30px;
  background: rgba(255, 105, 217, 0.22);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.project-meta strong {
  display: block;
  font-size: 1.1rem;
}

.project-meta small {
  color: var(--muted);
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 52px;
  min-height: 32px;
  border-radius: 999px;
  background: rgba(126, 240, 177, 0.12);
  border: 1px solid rgba(126, 240, 177, 0.25);
  color: var(--green);
}

.floating-mini {
  position: absolute;
  padding: 12px 16px;
  color: white;
  font-weight: 700;
}

.mini-top {
  top: 40px;
  right: 20px;
  background: linear-gradient(135deg, rgba(94, 230, 255, 0.2), rgba(140, 123, 255, 0.25));
}

.mini-bottom {
  bottom: 36px;
  left: 16px;
  background: linear-gradient(135deg, rgba(255, 105, 217, 0.2), rgba(255, 221, 102, 0.17));
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background: rgba(17, 20, 39, 0.7);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 28px 18px;
  text-align: center;
}

.stat-item strong {
  display: block;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  margin-bottom: 6px;
}

.stat-item span {
  color: var(--muted);
}

.section-block {
  padding-top: 90px;
}

.section-heading {
  margin-bottom: 28px;
}

.section-heading h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
  max-width: 700px;
}

.inline-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
}

.category-grid,
.featured-grid,
.comments-grid {
  display: grid;
  gap: 22px;
}

.category-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.category-card,
.game-card,
.comment-card,
.ai-panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
}

.category-card {
  padding: 28px 22px;
  min-height: 220px;
  position: relative;
}

.category-card.violet {
  background: linear-gradient(180deg, rgba(125, 99, 255, 0.18), rgba(14, 18, 35, 0.9));
}

.category-card.cyan {
  background: linear-gradient(180deg, rgba(94, 230, 255, 0.15), rgba(14, 18, 35, 0.9));
}

.category-card.pink {
  background: linear-gradient(180deg, rgba(255, 105, 217, 0.14), rgba(14, 18, 35, 0.9));
}

.category-badge {
  display: inline-flex;
  border-radius: 999px;
  padding: 7px 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--muted);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.category-card h3 {
  margin-top: 20px;
  font-size: 1.8rem;
}

.category-card p {
  margin-top: 12px;
  color: var(--muted);
}

.category-card button {
  margin-top: 18px;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--line);
  padding: 9px 14px;
  border-radius: 999px;
}

.featured-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.game-card {
  background: rgba(16, 22, 42, 0.9);
}

.game-visual {
  height: 210px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2), transparent 15%),
    linear-gradient(135deg, rgba(38, 49, 90, 0.6), rgba(21, 18, 35, 0.92));
}

.game-card.neon .game-visual {
  background:
    radial-gradient(circle at 30% 20%, rgba(94, 230, 255, 0.25), transparent 18%),
    linear-gradient(135deg, rgba(47, 61, 122, 0.8), rgba(14, 11, 30, 0.95));
}

.game-card.ocean .game-visual {
  background:
    radial-gradient(circle at 70% 20%, rgba(94, 230, 255, 0.24), transparent 18%),
    linear-gradient(135deg, rgba(16, 56, 77, 0.9), rgba(9, 14, 31, 0.95));
}

.game-card.sun .game-visual {
  background:
    radial-gradient(circle at 50% 20%, rgba(255, 221, 102, 0.2), transparent 20%),
    linear-gradient(135deg, rgba(120, 55, 25, 0.8), rgba(16, 13, 29, 0.96));
}

.game-body {
  padding: 18px 18px 20px;
}

.game-topline,
.creator-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 0.8rem;
}

.game-body h3 {
  margin: 14px 0 10px;
  font-size: 1.7rem;
}

.mood {
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
}

.ai-section {
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 30px;
  align-items: center;
}

.ai-copy h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
}

.ai-copy p {
  margin-top: 18px;
  color: var(--muted);
  max-width: 560px;
}

.ai-copy ul {
  margin-top: 24px;
  list-style: none;
  display: grid;
  gap: 14px;
}

.ai-copy li {
  position: relative;
  padding-left: 28px;
  color: #dfe8ff;
}

.ai-copy li::before {
  content: '✦';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--cyan);
}

.ai-panel {
  padding: 22px;
  background: linear-gradient(180deg, rgba(19, 27, 53, 0.96), rgba(12, 16, 30, 0.96));
}

.ai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.ai-chip {
  display: inline-flex;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(94, 230, 255, 0.14);
  border: 1px solid rgba(94, 230, 255, 0.3);
  color: var(--cyan);
}

.status {
  color: var(--green);
  font-size: 0.85rem;
}

.prompt-box {
  background: linear-gradient(135deg, rgba(140, 123, 255, 0.12), rgba(94, 230, 255, 0.07));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.prompt-label {
  display: inline-block;
  margin-bottom: 10px;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.prompt-box p {
  line-height: 1.7;
  color: #edf5ff;
}

.suggestion-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.suggestion-list div {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--line);
}

.suggestion-list strong {
  color: var(--muted);
  font-weight: 600;
}

.suggestion-list span {
  text-align: right;
}

.comments-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.comment-card {
  padding: 24px;
}

.comment-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, var(--pink), var(--violet));
  border-radius: 50%;
  font-weight: 800;
  color: #120b1d;
}

.comment-head strong {
  display: block;
}

.comment-head small {
  color: var(--muted);
}

.comment-card p {
  color: #dde8ff;
  line-height: 1.8;
}

.cta-banner {
  margin-top: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 30px 28px;
  border-radius: 26px;
  border: 1px solid var(--line);
  background: linear-gradient(135deg, rgba(140, 123, 255, 0.18), rgba(94, 230, 255, 0.08));
}

.cta-banner h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

@media (max-width: 980px) {
  .hero,
  .ai-section,
  .category-grid,
  .featured-grid,
  .comments-grid,
  .stats-bar {
    grid-template-columns: 1fr;
  }

  .menu {
    display: none;
  }

  .topbar,
  .inline-heading,
  .cta-banner,
  .site-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-visual {
    min-height: 380px;
  }
}

@media (max-width: 620px) {
  .app-shell {
    padding-left: 14px;
    padding-right: 14px;
  }

  .topbar {
    padding: 16px 18px;
  }

  .nav-actions {
    width: 100%;
  }

  .nav-actions button {
    flex: 1;
  }

  .cta-row {
    flex-direction: column;
  }

  .mini-pills {
    gap: 8px;
  }
}
