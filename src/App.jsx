const stats = [
  { value: '32K+', label: 'creadores activos' },
  { value: '7.8K', label: 'juegos publicados' },
  { value: '94%', label: 'contenido original' },
  { value: '24/7', label: 'comunidad viva' },
];

const categories = [
  {
    title: 'Juegos 2D',
    subtitle: 'Plataformas, RPG, puzzles y acción retro.',
    accent: 'violet',
    badge: 'pixel art',
  },
  {
    title: 'Juegos 3D',
    subtitle: 'Mundos inmersivos, shooters, simuladores y FPS.',
    accent: 'cyan',
    badge: 'immersive',
  },
  {
    title: 'Trailers',
    subtitle: 'Muestra tu juego con capturas, teasers y mecánicas.',
    accent: 'pink',
    badge: 'showcase',
  },
];

const featured = [
  {
    name: 'Neon Forge',
    type: '2D / acción',
    creator: 'AstraNova',
    mood: 'cyberpunk',
    progress: '82%',
    accent: 'neon',
  },
  {
    name: 'Skybound Echo',
    type: '3D / aventura',
    creator: 'PixelWarden',
    mood: 'fantasía',
    progress: '64%',
    accent: 'ocean',
  },
  {
    name: 'Vault Runner',
    type: '2D / supervivencia',
    creator: 'MikaAr',
    mood: 'sci-fi',
    progress: '92%',
    accent: 'sun',
  },
];

const aiSteps = [
  'Crea una idea de juego basada en tu estilo y público.',
  'Genera personajes, mecánicas, balance y narrativa.',
  'Optimiza tu trailer, UI y estructura de lanzamiento.',
  'Revisa bugs, prototipos y mejora fluidez de gameplay.',
];

const comments = [
  {
    user: 'KiraFlux',
    text: 'La IA me ayudó a definir la historia del juego y me dio ideas increíbles para una demo 3D. ¡Muy útil!',
    tag: 'Diseñadora de mundos',
  },
  {
    user: 'ZeroByte',
    text: 'Pude mostrar mi trailer y recibir feedback real de la comunidad. El flujo es muy motivador y directo.',
    tag: 'Programador indie',
  },
  {
    user: 'NovaForge',
    text: 'Me encanta que pueda publicar proyectos 2D y 3D y obtener opiniones en una comunidad tan activa.',
    tag: 'Creador de experiencias',
  },
];

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>

        <nav className="menu">
          <a href="#descubre">Descubre</a>
          <a href="#crear">Crear</a>
          <a href="#ia">IA</a>
          <a href="#comunidad">Comunidad</a>
        </nav>

        <div className="nav-actions">
          <button className="ghost-btn">Entrar</button>
          <button className="primary-btn">Crear juego</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Plataforma gamer para crear sin límites</span>
            <h1>Publica, crea y comparte juegos 2D y 3D con IA gratis.</h1>
            <p>
              FansGamesCreate une dreamers, creadores e inventores. Muestra trailers,
              comparte proyectos, recibe feedback y deja que la IA te guíe en cada paso.
            </p>

            <div className="cta-row">
              <button className="primary-btn large">Empezar ahora</button>
              <button className="ghost-btn large">Ver ejemplos</button>
            </div>

            <div className="mini-pills">
              <span>🎮 2D & 3D</span>
              <span>✨ IA gratis</span>
              <span>💬 comentarios reales</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card main-card">
              <div className="card-top">
                <span className="live-dot" />
                <span>Live dev</span>
              </div>

              <div className="project-preview preview-one" />

              <div className="project-meta">
                <div>
                  <strong>Project Echo</strong>
                  <small>3D / aventura</small>
                </div>
                <span className="tag">90%</span>
              </div>
            </div>

            <div className="floating-card floating-mini mini-top">IA guía</div>
            <div className="floating-card floating-mini mini-bottom">Community +120</div>
          </div>
        </section>

        <section className="stats-bar">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="descubre" className="section-block">
          <div className="section-heading">
            <span className="eyebrow">Explora</span>
            <h2>Todo lo que necesitas para lanzar tu siguiente juego</h2>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <article key={cat.title} className={`category-card ${cat.accent}`}>
                <span className="category-badge">{cat.badge}</span>
                <h3>{cat.title}</h3>
                <p>{cat.subtitle}</p>
                <button>Ver más</button>
              </article>
            ))}
          </div>
        </section>

        <section id="crear" className="section-block featured-block">
          <div className="section-heading inline-heading">
            <div>
              <span className="eyebrow">Proyectos destacados</span>
              <h2>Juegos que están rompiendo el mercado</h2>
            </div>
            <button className="ghost-btn">Explorar comunidad</button>
          </div>

          <div className="featured-grid">
            {featured.map((game) => (
              <article key={game.name} className={`game-card ${game.accent}`}>
                <div className="game-visual" />
                <div className="game-body">
                  <div className="game-topline">
                    <span>{game.type}</span>
                    <span>{game.progress}</span>
                  </div>
                  <h3>{game.name}</h3>
                  <div className="creator-row">
                    <span>por {game.creator}</span>
                    <span className="mood">{game.mood}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="ia" className="section-block ai-section">
          <div className="ai-copy">
            <span className="eyebrow">Mentor IA</span>
            <h2>Tu asistente creativo disponible en todo momento</h2>
            <p>
              La IA de FansGamesCreate te ayuda a prototipar ideas, diseñar niveles,
              mejorar el flujo del juego, crear narrativas y revisar la experiencia del usuario
              sin costo extra.
            </p>

            <ul>
              {aiSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="ai-panel">
            <div className="ai-header">
              <span className="ai-chip">Asistente AI</span>
              <span className="status">online</span>
            </div>

            <div className="prompt-box">
              <span className="prompt-label">Prompt</span>
              <p>"Quiero una idea de juego de aventura con exploración, historia emotiva y un trailer épico para comunidad gamer."</p>
            </div>

            <div className="suggestion-list">
              <div>
                <strong>Idea principal</strong>
                <span>Ciudad bajo el mar</span>
              </div>
              <div>
                <strong>Estilo visual</strong>
                <span>Neón + fantasía retro</span>
              </div>
              <div>
                <strong>Trailer</strong>
                <span>Montaje con tensión emocional</span>
              </div>
            </div>
          </div>
        </section>

        <section id="comunidad" className="section-block community-block">
          <div className="section-heading">
            <span className="eyebrow">Comunidad</span>
            <h2>Comentarios, opinión y apoyo real</h2>
          </div>

          <div className="comments-grid">
            {comments.map((item) => (
              <article key={item.user} className="comment-card">
                <div className="comment-head">
                  <span className="avatar">{item.user.charAt(0)}</span>
                  <div>
                    <strong>{item.user}</strong>
                    <small>{item.tag}</small>
                  </div>
                </div>
                <p>“{item.text}”</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner">
          <div>
            <span className="eyebrow">Tu creatividad merece ser vista</span>
            <h2>Crear, publicar y crecer nunca fue tan fácil.</h2>
          </div>
          <button className="primary-btn large">Subir mi juego</button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>
        <p>© 2026 FansGamesCreate. Comunidad creativa para gamers y desarrolladores.</p>
      </footer>
    </div>
  );
}

export default App;
