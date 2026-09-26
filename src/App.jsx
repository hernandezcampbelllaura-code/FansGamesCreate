import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEYS = {
  user: 'fgc-user',
  games: 'fgc-games',
};

const defaultGames = [
  {
    id: 1,
    name: 'Neon Forge',
    type: 'Juegos 2D',
    creator: 'AstraNova',
    mood: 'cyberpunk',
    progress: '82%',
    accent: 'neon',
    description:
      'Un juego de plataformas con combates rápidos, retos de precisión y un mundo futurista lleno de secretos.',
    tags: ['acción', 'pixel-art', 'exploración'],
    players: '4.2K',
  },
  {
    id: 2,
    name: 'Skybound Echo',
    type: 'Juegos 3D',
    creator: 'PixelWarden',
    mood: 'fantasía',
    progress: '64%',
    accent: 'ocean',
    description:
      'Una aventura emocional con cielos abiertos, criaturas legendarias y decisiones que cambian el mundo.',
    tags: ['aventura', 'mundo abierto', 'historia'],
    players: '3.5K',
  },
  {
    id: 3,
    name: 'Vault Runner',
    type: 'Juegos 2D',
    creator: 'MikaAr',
    mood: 'sci-fi',
    progress: '92%',
    accent: 'sun',
    description:
      'Sobrevive en un futuro postapocalíptico con recursos limitados, peligro constante y decisiones críticas.',
    tags: ['supervivencia', 'simulación', 'sci-fi'],
    players: '6.1K',
  },
];

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
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.user);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.games);
      return saved ? JSON.parse(saved) : defaultGames;
    } catch {
      return defaultGames;
    }
  });

  const [view, setView] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState(defaultGames[0].id);
  const [mode, setMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [draft, setDraft] = useState({
    title: '',
    genre: 'Juegos 2D',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
  }, [games]);

  const selectedGame = useMemo(
    () => games.find((game) => game.id === selectedGameId) ?? games[0],
    [games, selectedGameId],
  );

  const filteredGames = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return games;
    return games.filter((game) =>
      `${game.name} ${game.description} ${game.type} ${game.creator}`
        .toLowerCase()
        .includes(term),
    );
  }, [games, query]);

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();
    setAuthError('');

    const email = loginForm.email.trim();
    const password = loginForm.password.trim();
    const username = loginForm.username.trim();

    if (!email || !password || (mode === 'register' && !username)) {
      setAuthError('Completa todos los campos.');
      return;
    }

    if (mode === 'register' && password.length < 6) {
      setAuthError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const nextUser = {
      username: mode === 'register' ? username : email.split('@')[0],
      email,
    };

    setUser(nextUser);
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    setAuthError('');
    setLoginForm({ username: '', email: '', password: '' });
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const openGameDetail = (gameId) => {
    setSelectedGameId(gameId);
    setView('game');
  };

  const handleCreateOrUpdate = (event) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.description.trim()) return;

    if (editingId) {
      setGames((prev) =>
        prev.map((game) =>
          game.id === editingId
            ? {
                ...game,
                name: draft.title.trim(),
                type: draft.genre,
                description: draft.description.trim(),
                tags: [draft.genre.toLowerCase(), 'editado', 'comunidad'],
              }
            : game,
        ),
      );
      setSelectedGameId(editingId);
    } else {
      const nextGame = {
        id: Date.now(),
        name: draft.title.trim(),
        type: draft.genre,
        creator: user?.username || 'Tú',
        mood: 'custom',
        progress: '12%',
        accent: 'neon',
        description: draft.description.trim(),
        tags: [draft.genre.toLowerCase(), 'nuevo', 'comunidad'],
        players: '0',
      };

      setGames((prev) => [nextGame, ...prev]);
      setSelectedGameId(nextGame.id);
    }

    setDraft({ title: '', genre: 'Juegos 2D', description: '' });
    setEditingId(null);
    setView('game');
  };

  const startEditGame = (game) => {
    setEditingId(game.id);
    setDraft({
      title: game.name,
      genre: game.type,
      description: game.description,
    });
    setView('create');
  };

  const deleteGame = (gameId) => {
    if (!window.confirm('¿Eliminar este juego?')) return;

    setGames((prev) => prev.filter((game) => game.id !== gameId));

    if (selectedGameId === gameId) {
      setSelectedGameId(games[0]?.id ?? null);
    }

    setView('examples');
  };

  const renderAuth = () => (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>

        <h1>{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Bienvenido de vuelta a la comunidad'
            : 'Únete para crear, publicar y descubrir grandes ideas'}
        </p>

        <form className="auth-form" onSubmit={handleAuthSubmit}>
          {mode === 'register' && (
            <label>
              <span>Nombre de usuario</span>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleAuthChange}
                placeholder="tu_usuario"
              />
            </label>
          )}

          <label>
            <span>Correo electrónico</span>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleAuthChange}
              placeholder="tu@correo.com"
            />
          </label>

          <label>
            <span>Contraseña</span>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleAuthChange}
              placeholder="••••••••"
            />
          </label>

          {authError && <div className="error-box">{authError}</div>}

          <button type="submit" className="primary-btn full-width">
            {mode === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <div className="switch-link">
          {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button type="button" className="text-link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <>
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>

        <nav className="menu">
          <button className="menu-btn" onClick={() => setView('home')}>Descubre</button>
          <button className="menu-btn" onClick={() => setView('create')}>Crear</button>
          <button className="menu-btn" onClick={() => setView('home')}>IA</button>
          <button className="menu-btn" onClick={() => setView('examples')}>Comunidad</button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-pill">👤 {user.username}</span>
              <button className="ghost-btn" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <button className="ghost-btn" onClick={() => setView('auth')}>
              Entrar
            </button>
          )}
          <button className="primary-btn" onClick={() => setView('create')}>
            Crear juego
          </button>
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
              <button className="primary-btn large" onClick={() => setView('create')}>
                Empezar ahora
              </button>
              <button className="ghost-btn large" onClick={() => setView('examples')}>
                Ver ejemplos
              </button>
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

        <section className="section-block">
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
                <button onClick={() => setView('examples')}>Ver más</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block featured-block">
          <div className="section-heading inline-heading">
            <div>
              <span className="eyebrow">Proyectos destacados</span>
              <h2>Juegos que están rompiendo el mercado</h2>
            </div>
            <button className="ghost-btn" onClick={() => setView('examples')}>
              Explorar comunidad
            </button>
          </div>

          <div className="featured-grid">
            {games.map((game) => (
              <article
                key={game.id}
                className={`game-card ${game.accent}`}
                onClick={() => openGameDetail(game.id)}
              >
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

        <section className="section-block ai-section">
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
              <p>
                “Quiero una idea de juego de aventura con exploración, historia emotiva y un trailer épico para comunidad gamer.”
              </p>
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

        <section className="section-block community-block">
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
          <button className="primary-btn large" onClick={() => setView('create')}>
            Subir mi juego
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>
        <p>© 2026 FansGamesCreate. Comunidad creativa para gamers y desarrolladores.</p>
      </footer>
    </>
  );

  const renderCreate = () => (
    <div className="page-shell">
      <header className="page-header">
        <button className="ghost-btn" onClick={() => setView('home')}>
          ← Volver
        </button>
        <h2>{editingId ? 'Editar juego' : 'Crear juego'}</h2>
      </header>

      <form className="create-form" onSubmit={handleCreateOrUpdate}>
        <div className="form-grid">
          <label>
            <span>Nombre del juego</span>
            <input
              type="text"
              name="title"
              value={draft.title}
              onChange={handleDraftChange}
              placeholder="Ej. Sky Raiders"
            />
          </label>

          <label>
            <span>Tipo</span>
            <select name="genre" value={draft.genre} onChange={handleDraftChange}>
              <option>Juegos 2D</option>
              <option>Juegos 3D</option>
              <option>Trailers</option>
            </select>
          </label>
        </div>

        <label>
          <span>Descripción</span>
          <textarea
            name="description"
            rows="6"
            value={draft.description}
            onChange={handleDraftChange}
            placeholder="Describe tu idea, mecánicas, estilo visual y objetivo del juego..."
          />
        </label>

        <div className="form-actions">
          <button type="button" className="ghost-btn" onClick={() => setView('home')}>
            Cancelar
          </button>
          <button type="submit" className="primary-btn">
            {editingId ? 'Guardar cambios' : 'Publicar juego'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderExamples = () => (
    <div className="page-shell">
      <header className="page-header">
        <button className="ghost-btn" onClick={() => setView('home')}>
          ← Volver
        </button>
        <h2>Ejemplos y comunidad</h2>
      </header>

      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="Buscar juegos, géneros, creadores..."
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="example-grid">
        {filteredGames.map((game) => (
          <article
            key={game.id}
            className={`example-card ${game.accent}`}
            onClick={() => openGameDetail(game.id)}
          >
            <div className="mini-visual" />
            <div className="example-body">
              <div className="game-topline">
                <span>{game.type}</span>
                <span>{game.progress}</span>
              </div>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <div className="creator-row">
                <span>por {game.creator}</span>
                <span className="mood">{game.mood}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderGameDetail = () => {
    if (!selectedGame) return null;

    return (
      <div className="page-shell">
        <header className="page-header">
          <button className="ghost-btn" onClick={() => setView('examples')}>
            ← Volver
          </button>
          <h2>{selectedGame.name}</h2>
        </header>

        <div className="detail-layout">
          <div className="detail-visual" />

          <div className="detail-copy">
            <div className="game-topline">
              <span>{selectedGame.type}</span>
              <span>{selectedGame.progress}</span>
            </div>

            <h3>{selectedGame.name}</h3>
            <p>{selectedGame.description}</p>

            <div className="tag-list">
              {selectedGame.tags.map((tag) => (
                <span key={tag} className="tag-item">
                  {tag}
                </span>
              ))}
            </div>

            <div className="detail-meta">
              <div>
                <strong>Creado por</strong>
                <span>{selectedGame.creator}</span>
              </div>
              <div>
                <strong>Jugadores</strong>
                <span>{selectedGame.players}</span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="primary-btn" onClick={() => setView('create')}>
                Crear tu versión
              </button>
              {user && selectedGame.creator === user.username && (
                <>
                  <button className="ghost-btn" onClick={() => startEditGame(selectedGame)}>
                    Editar
                  </button>
                  <button className="danger-btn" onClick={() => deleteGame(selectedGame.id)}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    if (!user && view !== 'auth') {
      return renderAuth();
    }

    if (view === 'auth') return renderAuth();
    if (view === 'create') return renderCreate();
    if (view === 'examples') return renderExamples();
    if (view === 'game') return renderGameDetail();
    return renderHome();
  };

  return <>{renderCurrentView()}</>;
}

export default App;
