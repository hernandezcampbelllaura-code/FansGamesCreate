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
    likes: 124,
    likedBy: [],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    comments: [
      { id: 1, user: 'KiraFlux', text: 'Me encantó el estilo visual y la sensación de juego.' },
      { id: 2, user: 'Milo', text: 'La mecánica se ve super fluida.' },
    ],
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
    likes: 89,
    likedBy: [],
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    comments: [
      { id: 1, user: 'ZeroByte', text: 'El mundo abierto tiene muy buena pinta.' },
    ],
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
    likes: 205,
    likedBy: [],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    comments: [
      { id: 1, user: 'NovaForge', text: 'Lo que más me gusta es la tensión constante.' },
    ],
  },
];

const stats = [
  { value: '32K+', label: 'creadores activos' },
  { value: '7.8K', label: 'juegos publicados' },
  { value: '94%', label: 'contenido original' },
  { value: '24/7', label: 'comunidad viva' },
];

const categories = [
  { title: 'Juegos 2D', subtitle: 'Plataformas, RPG, puzzles y acción retro.', accent: 'violet', badge: 'pixel art' },
  { title: 'Juegos 3D', subtitle: 'Mundos inmersivos, shooters, simuladores y FPS.', accent: 'cyan', badge: 'immersive' },
  { title: 'Trailers', subtitle: 'Muestra tu juego con capturas, teasers y mecánicas.', accent: 'pink', badge: 'showcase' },
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

function getCurrentPath() {
  const path = window.location.pathname;
  return path && path !== '/' ? path : '/';
}

function normalizePath(path) {
  if (!path || path === '') return '/';
  const value = path.startsWith('/') ? path : `/${path}`;
  return value;
}

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

  const [route, setRoute] = useState(getCurrentPath);
  const [mode, setMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [draft, setDraft] = useState({
    title: '',
    genre: 'Juegos 2D',
    description: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');
  const [commentDraft, setCommentDraft] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user || null));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    const onPopState = () => setRoute(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setRoute(normalized);
  };

  const currentPath = route || '/';

  const routeInfo = useMemo(() => {
    if (currentPath === '/auth') return { type: 'auth' };
    if (currentPath === '/crear') return { type: 'create' };
    if (currentPath === '/ejemplos') return { type: 'examples' };
    if (currentPath === '/perfil') return { type: 'profile' };
    if (currentPath.startsWith('/juego/')) {
      const id = Number(currentPath.split('/juego/')[1]);
      return { type: 'game', id };
    }
    return { type: 'home' };
  }, [currentPath]);

  const selectedGame = useMemo(() => {
    if (routeInfo.type !== 'game') return null;
    return games.find((game) => game.id === routeInfo.id) || null;
  }, [games, routeInfo]);

  const filteredGames = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return games;
    return games.filter((game) =>
      `${game.name} ${game.description} ${game.type} ${game.creator}`.toLowerCase().includes(term),
    );
  }, [games, query]);

  const protectedRoutes = ['/crear', '/perfil'];

  useEffect(() => {
    if (!user && protectedRoutes.includes(currentPath)) {
      navigate('/auth');
    }
  }, [currentPath, user]);

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

    setUser({
      username: mode === 'register' ? username : email.split('@')[0],
      email,
    });
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthError('');
    setLoginForm({ username: '', email: '', password: '' });
    navigate('/');
  };

  const handleDraftChange = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDraft((prev) => ({ ...prev, imageUrl: String(reader.result) }));
    };
    reader.readAsDataURL(file);
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
                imageUrl: draft.imageUrl || game.imageUrl,
                tags: [draft.genre.toLowerCase(), 'editado', 'comunidad'],
              }
            : game,
        ),
      );
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
        likes: 0,
        likedBy: [],
        imageUrl: draft.imageUrl || 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
        comments: [],
      };

      setGames((prev) => [nextGame, ...prev]);
      navigate(`/juego/${nextGame.id}`);
    }

    setDraft({ title: '', genre: 'Juegos 2D', description: '', imageUrl: '' });
    setEditingId(null);
    if (!editingId) return;
    navigate('/ejemplos');
  };

  const startEditGame = (game) => {
    setEditingId(game.id);
    setDraft({
      title: game.name,
      genre: game.type,
      description: game.description,
      imageUrl: game.imageUrl || '',
    });
    navigate('/crear');
  };

  const deleteGame = (gameId) => {
    if (!window.confirm('¿Eliminar este juego?')) return;
    setGames((prev) => prev.filter((game) => game.id !== gameId));
    navigate('/ejemplos');
  };

  const toggleLike = (gameId) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setGames((prev) =>
      prev.map((game) => {
        if (game.id !== gameId) return game;

        const alreadyLiked = (game.likedBy || []).includes(user.email);
        const nextLikedBy = alreadyLiked
          ? (game.likedBy || []).filter((email) => email !== user.email)
          : [...(game.likedBy || []), user.email];

        return {
          ...game,
          likedBy: nextLikedBy,
          likes: nextLikedBy.length,
        };
      }),
    );
  };

  const handleAddComment = (gameId) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const value = (commentDraft[gameId] || '').trim();
    if (!value) return;

    setGames((prev) =>
      prev.map((game) =>
        game.id === gameId
          ? {
              ...game,
              comments: [
                ...(game.comments || []),
                { id: Date.now(), user: user.username, text: value },
              ],
            }
          : game,
      ),
    );

    setCommentDraft((prev) => ({ ...prev, [gameId]: '' }));
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
          {mode === 'login' ? 'Bienvenido de vuelta a la comunidad' : 'Únete para crear, publicar y descubrir grandes ideas'}
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
          <button className="menu-btn" onClick={() => navigate('/')}>Descubre</button>
          <button className="menu-btn" onClick={() => navigate('/crear')}>Crear</button>
          <button className="menu-btn" onClick={() => navigate('/')}>IA</button>
          <button className="menu-btn" onClick={() => navigate('/ejemplos')}>Comunidad</button>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <button className="menu-btn user-pill" onClick={() => navigate('/perfil')}>
                👤 {user.username}
              </button>
              <button className="ghost-btn" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <button className="ghost-btn" onClick={() => navigate('/auth')}>
              Entrar
            </button>
          )}
          <button className="primary-btn" onClick={() => navigate('/crear')}>
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
              <button className="primary-btn large" onClick={() => navigate('/crear')}>
                Empezar ahora
              </button>
              <button className="ghost-btn large" onClick={() => navigate('/ejemplos')}>
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
              <div
                className="project-preview preview-one"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, rgba(94,230,255,0.2), rgba(140,123,255,0.18)), url(https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
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
                <button onClick={() => navigate('/ejemplos')}>Ver más</button>
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
            <button className="ghost-btn" onClick={() => navigate('/ejemplos')}>
              Explorar comunidad
            </button>
          </div>

          <div className="featured-grid">
            {games.map((game) => (
              <article key={game.id} className={`game-card ${game.accent}`} onClick={() => navigate(`/juego/${game.id}`)}>
                <div
                  className="game-visual"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(94,230,255,0.12), rgba(140,123,255,0.15)), url(${game.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
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
          <button className="primary-btn large" onClick={() => navigate('/crear')}>
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
        <button className="ghost-btn" onClick={() => navigate('/')}>
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

        <label className="upload-box">
          <span>Portada del juego</span>
          <input type="file" accept="image/*" onChange={handleUploadImage} />
          {draft.imageUrl && (
            <div className="image-preview">
              <img src={draft.imageUrl} alt="Preview del juego" />
            </div>
          )}
        </label>

        <div className="form-actions">
          <button type="button" className="ghost-btn" onClick={() => navigate('/')}>
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
        <button className="ghost-btn" onClick={() => navigate('/')}>
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
          <article key={game.id} className={`example-card ${game.accent}`}>
            <div
              className="mini-visual"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(94,230,255,0.12), rgba(140,123,255,0.15)), url(${game.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
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
              <div className="example-actions">
                <button className="ghost-btn small-btn" onClick={() => navigate(`/juego/${game.id}`)}>
                  Ver detalle
                </button>
                {user && game.creator === user.username && (
                  <>
                    <button className="ghost-btn small-btn" onClick={() => startEditGame(game)}>
                      Editar
                    </button>
                    <button className="danger-btn small-btn" onClick={() => deleteGame(game.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => {
    const userGames = games.filter(
      (game) => game.creator === user?.username || game.creator === user?.email?.split('@')[0],
    );
    const totalLikes = userGames.reduce((sum, game) => sum + (game.likes || 0), 0);

    return (
      <div className="page-shell">
        <header className="page-header">
          <button className="ghost-btn" onClick={() => navigate('/')}>
            ← Volver
          </button>
          <h2>Mi perfil</h2>
        </header>

        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-large">{user?.username?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div>
              <h3>{user?.username}</h3>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="profile-stats">
            <div>
              <strong>{userGames.length}</strong>
              <span>juegos</span>
            </div>
            <div>
              <strong>{totalLikes}</strong>
              <span>likes</span>
            </div>
            <div>
              <strong>{games.reduce((count, game) => count + (game.comments?.length || 0), 0)}</strong>
              <span>comentarios</span>
            </div>
          </div>
        </div>

        <div className="profile-games">
          <h3>Mis publicaciones</h3>
          {userGames.length === 0 ? (
            <p className="empty-state">Todavía no has publicado ningún juego.</p>
          ) : (
            <div className="profile-list">
              {userGames.map((game) => (
                <div key={game.id} className="profile-game-item">
                  <div
                    className="profile-thumb"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(94,230,255,0.08), rgba(140,123,255,0.12)), url(${game.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div>
                    <strong>{game.name}</strong>
                    <p>{game.type}</p>
                    <div className="tiny-actions">
                      <button className="ghost-btn small-btn" onClick={() => navigate(`/juego/${game.id}`)}>
                        Ver
                      </button>
                      <button className="ghost-btn small-btn" onClick={() => startEditGame(game)}>
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGameDetail = () => {
    if (!selectedGame) return null;

    const currentUserLiked = user ? (selectedGame.likedBy || []).includes(user.email) : false;

    return (
      <div className="page-shell">
        <header className="page-header">
          <button className="ghost-btn" onClick={() => navigate('/ejemplos')}>
            ← Volver
          </button>
          <h2>{selectedGame.name}</h2>
        </header>

        <div className="detail-layout">
          <div
            className="detail-visual"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(94,230,255,0.12), rgba(140,123,255,0.15)), url(${selectedGame.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="detail-copy">
            <div className="game-topline">
              <span>{selectedGame.type}</span>
              <span>{selectedGame.progress}</span>
            </div>

            <h3>{selectedGame.name}</h3>
            <p>{selectedGame.description}</p>

            <div className="tag-list">
              {(selectedGame.tags || []).map((tag) => (
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
              <div>
                <strong>Likes</strong>
                <span>{selectedGame.likes || 0}</span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="primary-btn" onClick={() => navigate('/crear')}>
                Crear tu versión
              </button>
              <button className={`ghost-btn ${currentUserLiked ? 'liked' : ''}`} onClick={() => toggleLike(selectedGame.id)}>
                {currentUserLiked ? '❤ Te gusta' : '♡ Me gusta'}
              </button>
            </div>

            {user && selectedGame.creator === user.username && (
              <div className="owner-actions">
                <button className="ghost-btn small-btn" onClick={() => startEditGame(selectedGame)}>
                  Editar
                </button>
                <button className="danger-btn small-btn" onClick={() => deleteGame(selectedGame.id)}>
                  Eliminar
                </button>
              </div>
            )}

            <div className="comments-box">
              <h4>Comentarios</h4>
              <div className="comments-list">
                {(selectedGame.comments || []).length === 0 ? (
                  <p className="empty-state">Sé el primero en comentar.</p>
                ) : (
                  (selectedGame.comments || []).map((comment) => (
                    <div key={comment.id} className="comment-inline">
                      <strong>{comment.user}</strong>
                      <p>{comment.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="comment-form">
                <textarea
                  value={commentDraft[selectedGame.id] || ''}
                  onChange={(event) =>
                    setCommentDraft((prev) => ({
                      ...prev,
                      [selectedGame.id]: event.target.value,
                    }))
                  }
                  placeholder="Escribe un comentario..."
                />
                <button className="primary-btn" onClick={() => handleAddComment(selectedGame.id)}>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    if (routeInfo.type === 'auth') return renderAuth();
    if (routeInfo.type === 'create') return renderCreate();
    if (routeInfo.type === 'examples') return renderExamples();
    if (routeInfo.type === 'profile') return user ? renderProfile() : renderAuth();
    if (routeInfo.type === 'game') return renderGameDetail();
    return renderHome();
  };

  return <>{renderCurrentView()}</>;
}

export default App;
