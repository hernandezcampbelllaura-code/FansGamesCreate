import React, { useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEYS = {
  appData: 'fgc-app-data-v1',
  session: 'fgc-session-v1',
};

const ADMIN_EMAIL = 'admin@fansgamescreate.com';
const ADMIN_PASSWORD = 'admin123';

const defaultUsers = [
  {
    id: 'admin-user',
    username: 'admin',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
    bio: 'Administrador general de la comunidad.',
    avatar: 'A',
    status: 'online',
    blocked: false,
    reports: 0,
  },
  {
    id: 'u-1',
    username: 'AstraNova',
    email: 'astra@fansgamescreate.com',
    password: '123456',
    role: 'user',
    bio: 'Diseñadora de mundos y juegos 2D.',
    avatar: 'A',
    status: 'online',
    blocked: false,
    reports: 0,
  },
  {
    id: 'u-2',
    username: 'PixelWarden',
    email: 'pixel@fansgamescreate.com',
    password: '123456',
    role: 'user',
    bio: 'Creador de aventuras 3D.',
    avatar: 'P',
    status: 'online',
    blocked: false,
    reports: 0,
  },
];

const defaultGames = [
  {
    id: 'g-1',
    title: 'Neon Forge',
    author: 'AstraNova',
    authorEmail: 'astra@fansgamescreate.com',
    type: '2D',
    description: 'Un juego de plataformas con combates rápidos, retos de precisión y un mundo futurista lleno de secretos.',
    tags: ['acción', 'pixel-art', 'exploración'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    likes: 124,
    likedBy: [],
    comments: [
      { id: 'c-1', user: 'KiraFlux', text: 'Me encantó el estilo visual.' },
      { id: 'c-2', user: 'Milo', text: 'La mecánica se ve muy fluida.' },
    ],
    playable: true,
    mode: 'mini',
    status: 'active',
  },
  {
    id: 'g-2',
    title: 'Skybound Echo',
    author: 'PixelWarden',
    authorEmail: 'pixel@fansgamescreate.com',
    type: '3D',
    description: 'Aventura emocional con cielos abiertos, criaturas legendarias y decisiones que cambian el mundo.',
    tags: ['aventura', 'mundo abierto', 'historia'],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    likes: 89,
    likedBy: [],
    comments: [{ id: 'c-3', user: 'ZeroByte', text: 'El mundo abierto tiene muy buena pinta.' }],
    playable: true,
    mode: 'mini',
    status: 'active',
  },
];

const defaultPosts = [
  {
    id: 'p-1',
    type: 'post',
    title: 'Mi nuevo trailer de juego',
    description: 'Acabo de terminar una escena del trailer de un juego de supervivencia futurista. ¡Comentad y votad!',
    author: 'AstraNova',
    authorEmail: 'astra@fansgamescreate.com',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    likes: 48,
    likedBy: [],
    comments: [{ id: 'cc-1', user: 'NovaForge', text: 'La vibra es brutal.' }],
    createdAt: '2026-09-26T10:00:00Z',
    tags: ['trailer', 'futurista'],
    reported: false,
  },
  {
    id: 'p-2',
    type: 'game',
    title: 'Neon Forge',
    description: 'Juego de plataformas con estilo cyberpunk y mecánicas muy rápidas.',
    author: 'AstraNova',
    authorEmail: 'astra@fansgamescreate.com',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    likes: 74,
    likedBy: [],
    comments: [{ id: 'cc-2', user: 'KiraFlux', text: 'La idea es super original.' }],
    createdAt: '2026-09-26T11:00:00Z',
    tags: ['2D', 'acción'],
    gameId: 'g-1',
    reported: false,
  },
];

const initialData = {
  users: defaultUsers,
  games: defaultGames,
  posts: defaultPosts,
  reports: {
    users: [],
    games: [],
  },
};

function getSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.appData);
    return raw ? JSON.parse(raw) : initialData;
  } catch {
    return initialData;
  }
}

function normalizePath(path) {
  const next = (path || '/').startsWith('/') ? path : `/${path}`;
  return next === '' ? '/' : next;
}

function getCurrentPath() {
  const path = window.location.pathname;
  return normalizePath(path === '/' ? '/' : path);
}

function App() {
  const [data, setData] = useState(getSavedData);
  const [sessionUser, setSessionUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.session);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [route, setRoute] = useState(getCurrentPath);
  const [authMode, setAuthMode] = useState('login');
  const [authError, setAuthError] = useState('');
  const [loginForm, setLoginForm] = useState({ username: '', email: '', password: '' });
  const [postDraft, setPostDraft] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image',
    category: 'general',
  });
  const [gameDraft, setGameDraft] = useState({
    title: '',
    description: '',
    type: '2D',
    mediaUrl: '',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.appData, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (sessionUser) {
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.session);
    }
  }, [sessionUser]);

  useEffect(() => {
    const handlePop = () => setRoute(getCurrentPath());
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized);
    }
    setRoute(normalized);
  };

  const currentUser = useMemo(
    () => data.users.find((user) => user.email === sessionUser?.email) || null,
    [data.users, sessionUser],
  );

  const routeInfo = useMemo(() => {
    if (route === '/login') return { type: 'login' };
    if (route === '/community') return { type: 'community' };
    if (route === '/crear') return { type: 'crear' };
    if (route === '/perfil') return { type: 'perfil' };
    if (route === '/admin') return { type: 'admin' };
    if (route.startsWith('/perfil/')) return { type: 'profile-user', username: route.split('/perfil/')[1] };
    if (route.startsWith('/play/')) return { type: 'play', gameId: route.split('/play/')[1] };
    if (route.startsWith('/juego/')) return { type: 'game-detail', gameId: route.split('/juego/')[1] };
    return { type: 'home' };
  }, [route]);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const protectedRoutes = ['/community', '/crear', '/perfil', '/admin'];
    if (!sessionUser && protectedRoutes.includes(route)) {
      navigate('/login');
    }
  }, [route, sessionUser]);

  const handleAuthInput = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    const username = loginForm.username.trim();
    const email = loginForm.email.trim();
    const password = loginForm.password.trim();

    if (!username || !email || !password) {
      setAuthError('Rellena todos los campos.');
      return;
    }

    if (password.length < 6) {
      setAuthError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const exists = data.users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setAuthError('Ya hay una cuenta con este correo.');
      return;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      username,
      email,
      password,
      role: 'user',
      bio: 'Nuevo miembro de la comunidad.',
      avatar: username.charAt(0).toUpperCase(),
      status: 'online',
      blocked: false,
      reports: 0,
    };

    setData((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
    setSessionUser({ email, username, role: 'user' });
    setLoginForm({ username: '', email: '', password: '' });
    setAuthError('');
    navigate('/community');
  };

  const handleLogin = () => {
    const email = loginForm.email.trim();
    const password = loginForm.password.trim();

    if (!email || !password) {
      setAuthError('Email y contraseña obligatorios.');
      return;
    }

    const user = data.users.find(
      (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
    );

    if (!user) {
      setAuthError('Credenciales incorrectas.');
      return;
    }

    if (user.blocked) {
      setAuthError('Tu cuenta está bloqueada. Contacta con el administrador.');
      return;
    }

    setSessionUser({ email: user.email, username: user.username, role: user.role });
    setAuthError('');
    setLoginForm({ username: '', email: '', password: '' });
    navigate('/community');
  };

  const logout = () => {
    setSessionUser(null);
    navigate('/login');
  };

  const handleCreatePost = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!postDraft.title.trim() || !postDraft.description.trim()) {
      return;
    }

    const newPost = {
      id: `p-${Date.now()}`,
      type: 'post',
      title: postDraft.title.trim(),
      description: postDraft.description.trim(),
      author: currentUser.username,
      authorEmail: currentUser.email,
      mediaType: postDraft.mediaType,
      mediaUrl:
        postDraft.mediaUrl ||
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      tags: [postDraft.category],
      reported: false,
    };

    setData((prev) => ({ ...prev, posts: [newPost, ...prev.posts] }));
    setPostDraft({ title: '', description: '', mediaUrl: '', mediaType: 'image', category: 'general' });
    navigate('/community');
  };

  const handleCreateGame = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (!gameDraft.title.trim() || !gameDraft.description.trim()) {
      return;
    }

    const newGame = {
      id: `g-${Date.now()}`,
      title: gameDraft.title.trim(),
      author: currentUser.username,
      authorEmail: currentUser.email,
      type: gameDraft.type,
      description: gameDraft.description.trim(),
      tags: [gameDraft.type.toLowerCase(), 'comunidad', 'nuevo'],
      mediaType: 'image',
      mediaUrl:
        gameDraft.mediaUrl ||
        'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
      likes: 0,
      likedBy: [],
      comments: [],
      playable: true,
      mode: 'mini',
      status: 'active',
    };

    setData((prev) => ({
      ...prev,
      games: [newGame, ...prev.games],
      posts: [
        {
          id: `p-${Date.now()}`,
          type: 'game',
          title: newGame.title,
          description: newGame.description,
          author: currentUser.username,
          authorEmail: currentUser.email,
          mediaType: 'image',
          mediaUrl: newGame.mediaUrl,
          likes: 0,
          likedBy: [],
          comments: [],
          createdAt: new Date().toISOString(),
          tags: [newGame.type.toLowerCase()],
          gameId: newGame.id,
          reported: false,
        },
        ...prev.posts,
      ],
    }));

    setGameDraft({ title: '', description: '', type: '2D', mediaUrl: '' });
    navigate('/community');
  };

  const toggleLike = (targetType, targetId) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (targetType === 'post') {
      setData((prev) => ({
        ...prev,
        posts: prev.posts.map((post) => {
          if (post.id !== targetId) return post;
          const liked = (post.likedBy || []).includes(currentUser.email);
          const nextLikedBy = liked
            ? (post.likedBy || []).filter((email) => email !== currentUser.email)
            : [...(post.likedBy || []), currentUser.email];
          return { ...post, likedBy: nextLikedBy, likes: nextLikedBy.length };
        }),
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      games: prev.games.map((game) => {
        if (game.id !== targetId) return game;
        const liked = (game.likedBy || []).includes(currentUser.email);
        const nextLikedBy = liked
          ? (game.likedBy || []).filter((email) => email !== currentUser.email)
          : [...(game.likedBy || []), currentUser.email];
        return { ...game, likedBy: nextLikedBy, likes: nextLikedBy.length };
      }),
    }));
  };

  const addComment = (targetType, targetId, value) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const text = value.trim();
    if (!text) return;

    if (targetType === 'post') {
      setData((prev) => ({
        ...prev,
        posts: prev.posts.map((post) =>
          post.id === targetId
            ? {
                ...post,
                comments: [...(post.comments || []), { id: `c-${Date.now()}`, user: currentUser.username, text }],
              }
            : post,
        ),
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      games: prev.games.map((game) =>
        game.id === targetId
          ? {
              ...game,
              comments: [...(game.comments || []), { id: `c-${Date.now()}`, user: currentUser.username, text }],
            }
          : game,
      ),
    }));
  };

  const reportItem = (type, id) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (type === 'user') {
      setData((prev) => ({
        ...prev,
        reports: {
          ...prev.reports,
          users: [...prev.reports.users, id],
        },
      }));
      return;
    }

    setData((prev) => ({
      ...prev,
      reports: {
        ...prev.reports,
        games: [...prev.reports.games, id],
      },
    }));
  };

  const blockUser = (userId) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId ? { ...user, blocked: true } : user,
      ),
    }));
  };

  const unblockUser = (userId) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.map((user) =>
        user.id === userId ? { ...user, blocked: false } : user,
      ),
    }));
  };

  const deleteGame = (gameId) => {
    setData((prev) => ({
      ...prev,
      games: prev.games.filter((game) => game.id !== gameId),
      posts: prev.posts.filter((post) => post.gameId !== gameId && post.title !== prev.games.find((game) => game.id === gameId)?.title),
    }));
  };

  const deleteUser = (userId) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.id !== userId),
    }));
  };

  const allReportedUsers = data.reports.users;
  const allReportedGames = data.reports.games;

  const renderLogin = () => (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="brand-wrap">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>

        <h1>{authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>
        <p className="auth-subtitle">
          {authMode === 'login'
            ? 'Accede a tu comunidad, perfil y juegos.'
            : 'Únete para publicar juegos, comunidad y contenido.'}
        </p>

        <div className="auth-form">
          {authMode === 'register' && (
            <label>
              <span>Nombre de usuario</span>
              <input name="username" value={loginForm.username} onChange={handleAuthInput} />
            </label>
          )}

          <label>
            <span>Email</span>
            <input type="email" name="email" value={loginForm.email} onChange={handleAuthInput} />
          </label>

          <label>
            <span>Contraseña</span>
            <input type="password" name="password" value={loginForm.password} onChange={handleAuthInput} />
          </label>

          {authError && <div className="error-box">{authError}</div>}

          <button
            className="primary-btn full-width"
            onClick={authMode === 'login' ? handleLogin : handleRegister}
          >
            {authMode === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </div>

        <div className="switch-link">
          {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button className="text-link" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </div>

        <div className="demo-login-box">
          <strong>Demo admin</strong>
          <span>Email: {ADMIN_EMAIL}</span>
          <span>Contraseña: {ADMIN_PASSWORD}</span>
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <header className="topbar">
      <div className="brand-wrap" onClick={() => navigate('/community')}>
        <div className="brand-mark">F</div>
        <div className="brand-text">FansGamesCreate</div>
      </div>

      <nav className="menu">
        <button className="menu-btn" onClick={() => navigate('/community')}>Comunidad</button>
        <button className="menu-btn" onClick={() => navigate('/crear')}>Crear juego</button>
        <button className="menu-btn" onClick={() => navigate('/perfil')}>Perfil</button>
        {isAdmin && <button className="menu-btn" onClick={() => navigate('/admin')}>Admin</button>}
      </nav>

      <div className="nav-actions">
        {currentUser ? (
          <>
            <button className="menu-btn user-pill" onClick={() => navigate(`/perfil/${currentUser.username}`)}>
              👤 {currentUser.username}
            </button>
            <button className="ghost-btn" onClick={logout}>Salir</button>
          </>
        ) : (
          <button className="ghost-btn" onClick={() => navigate('/login')}>Entrar</button>
        )}
      </div>
    </header>
  );

  const renderHome = () => (
    <div className="page-shell home-page">
      {renderHeader()}
      <main className="main-home">
        <section className="hero hero-alt">
          <div className="hero-copy">
            <span className="eyebrow">Comunidad de creadores</span>
            <h1>Comparte, juega y descubre juegos con una comunidad viva.</h1>
            <p>
              Publica tus juegos, sube fotos y vídeos, comenta, juega, comparte ideas y gestiona tu perfil con una experiencia social real.
            </p>
            <div className="cta-row">
              <button className="primary-btn large" onClick={() => navigate(currentUser ? '/community' : '/login')}>
                {currentUser ? 'Entrar a la comunidad' : 'Unirme'}
              </button>
              <button className="ghost-btn large" onClick={() => navigate('/crear')}>Crear mi juego</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card main-card">
              <div className="project-preview preview-one" />
              <div className="project-meta">
                <div>
                  <strong>Community Arena</strong>
                  <small>Juegos + feedback</small>
                </div>
                <span className="tag">Live</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-bar">
          <div className="stat-item"><strong>32K+</strong><span>creadores</span></div>
          <div className="stat-item"><strong>7.8K</strong><span>juegos</span></div>
          <div className="stat-item"><strong>24/7</strong><span>comunidad</span></div>
          <div className="stat-item"><strong>100%</strong><span>contenido real</span></div>
        </section>
      </main>
    </div>
  );

  const renderCommunity = () => (
    <div className="page-shell">
      {renderHeader()}
      <main className="community-layout">
        <aside className="sidebar-panel">
          <h3>Publicar</h3>
          <label>
            <span>Título</span>
            <input value={postDraft.title} onChange={(e) => setPostDraft((prev) => ({ ...prev, title: e.target.value }))} />
          </label>

          <label>
            <span>Descripción</span>
            <textarea value={postDraft.description} onChange={(e) => setPostDraft((prev) => ({ ...prev, description: e.target.value }))} rows="4" />
          </label>

          <label>
            <span>Tipo</span>
            <select value={postDraft.category} onChange={(e) => setPostDraft((prev) => ({ ...prev, category: e.target.value }))}>
              <option value="general">General</option>
              <option value="trailer">Trailer</option>
              <option value="captura">Captura</option>
              <option value="idea">Idea</option>
            </select>
          </label>

          <label>
            <span>URL de imagen o video</span>
            <input value={postDraft.mediaUrl} onChange={(e) => setPostDraft((prev) => ({ ...prev, mediaUrl: e.target.value }))} />
          </label>

          <button className="primary-btn" onClick={handleCreatePost}>Publicar en comunidad</button>

          <div className="mini-box">
            <strong>Juegos activos</strong>
            <span>{data.games.length} publicados</span>
          </div>
        </aside>

        <section className="feed-panel">
          <div className="section-heading inline-heading">
            <div>
              <span className="eyebrow">Comunidad</span>
              <h2>Últimas publicaciones</h2>
            </div>
            <button className="ghost-btn" onClick={() => navigate('/crear')}>Crear juego</button>
          </div>

          {data.posts.map((post) => {
            const isLiked = currentUser ? (post.likedBy || []).includes(currentUser.email) : false;

            return (
              <article key={post.id} className="feed-card">
                <div className="feed-head">
                  <div className="avatar-mini">{(post.author || 'U').charAt(0).toUpperCase()}</div>
                  <div>
                    <strong>{post.author}</strong>
                    <small>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</small>
                  </div>
                </div>

                <h3>{post.title}</h3>
                <p>{post.description}</p>

                {post.mediaUrl && (
                  <div className="post-media">
                    {post.mediaType === 'video' ? (
                      <video controls src={post.mediaUrl} />
                    ) : (
                      <img src={post.mediaUrl} alt={post.title} />
                    )}
                  </div>
                )}

                <div className="tag-row">
                  {(post.tags || []).map((tag) => (
                    <span key={`${post.id}-${tag}`} className="tag-item">#{tag}</span>
                  ))}
                </div>

                <div className="feed-actions">
                  <button className="ghost-btn small-btn" onClick={() => toggleLike('post', post.id)}>
                    {isLiked ? '❤ Me gusta' : '♡ Me gusta'} ({post.likes || 0})
                  </button>
                  <button className="ghost-btn small-btn" onClick={() => reportItem('post', post.id)}>Denunciar</button>
                  {post.gameId && (
                    <button className="primary-btn small-btn" onClick={() => navigate(`/play/${post.gameId}`)}>Jugar</button>
                  )}
                </div>

                <div className="comment-list">
                  {(post.comments || []).map((comment) => (
                    <div key={comment.id} className="comment-box">
                      <strong>{comment.user}</strong>
                      <span>{comment.text}</span>
                    </div>
                  ))}
                </div>

                <div className="comment-input-row">
                  <input
                    placeholder="Escribe un comentario..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addComment('post', post.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );

  const renderCreate = () => (
    <div className="page-shell">
      {renderHeader()}
      <main className="form-page">
        <div className="form-card">
          <div className="section-heading inline-heading">
            <div>
              <span className="eyebrow">Crear</span>
              <h2>Publica un juego o proyecto</h2>
            </div>
          </div>

          <div className="creator-grid">
            <label>
              <span>Nombre del juego</span>
              <input value={gameDraft.title} onChange={(e) => setGameDraft((prev) => ({ ...prev, title: e.target.value }))} />
            </label>

            <label>
              <span>Tipo</span>
              <select value={gameDraft.type} onChange={(e) => setGameDraft((prev) => ({ ...prev, type: e.target.value }))}>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="RPG">RPG</option>
              </select>
            </label>
          </div>

          <label>
            <span>Descripción</span>
            <textarea rows="5" value={gameDraft.description} onChange={(e) => setGameDraft((prev) => ({ ...prev, description: e.target.value }))} />
          </label>

          <label>
            <span>URL de portada</span>
            <input value={gameDraft.mediaUrl} onChange={(e) => setGameDraft((prev) => ({ ...prev, mediaUrl: e.target.value }))} />
          </label>

          <div className="form-actions">
            <button className="ghost-btn" onClick={() => navigate('/community')}>Cancelar</button>
            <button className="primary-btn" onClick={handleCreateGame}>Crear juego</button>
          </div>
        </div>
      </main>
    </div>
  );

  const renderProfile = () => {
    const profileUser = routeInfo.type === 'profile-user'
      ? data.users.find((user) => user.username === routeInfo.username)
      : currentUser;

    if (!profileUser) return null;

    const userGames = data.games.filter((game) => game.authorEmail === profileUser.email);
    const userPosts = data.posts.filter((post) => post.authorEmail === profileUser.email);

    return (
      <div className="page-shell">
        {renderHeader()}
        <main className="profile-page">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-large">{profileUser.avatar || profileUser.username.charAt(0).toUpperCase()}</div>
              <div>
                <h2>{profileUser.username}</h2>
                <p>{profileUser.bio}</p>
                <small>{profileUser.role === 'admin' ? 'Administrador' : 'Usuario'}</small>
              </div>
            </div>

            <div className="profile-stats">
              <div><strong>{userGames.length}</strong><span>Juegos</span></div>
              <div><strong>{userPosts.length}</strong><span>Posts</span></div>
              <div><strong>{profileUser.blocked ? 'Bloqueado' : 'Activo'}</strong><span>Estado</span></div>
            </div>

            <div className="profile-actions">
              {currentUser && currentUser.role === 'admin' && profileUser.email !== ADMIN_EMAIL && (
                <>
                  {profileUser.blocked ? (
                    <button className="ghost-btn" onClick={() => unblockUser(profileUser.id)}>Desbloquear</button>
                  ) : (
                    <button className="ghost-btn" onClick={() => blockUser(profileUser.id)}>Bloquear</button>
                  )}
                  <button className="danger-btn" onClick={() => deleteUser(profileUser.id)}>Eliminar cuenta</button>
                </>
              )}
              {profileUser.email !== ADMIN_EMAIL && currentUser && currentUser.email !== profileUser.email && (
                <button className="ghost-btn" onClick={() => reportItem('user', profileUser.id)}>Denunciar usuario</button>
              )}
            </div>
          </div>

          <div className="profile-list-section">
            <h3>Lista de juegos</h3>
            <div className="games-grid compact-grid">
              {userGames.length ? userGames.map((game) => (
                <article key={game.id} className="game-card small-card">
                  <div className="game-visual" style={{ backgroundImage: `url(${game.mediaUrl})` }} />
                  <div className="game-body">
                    <h4>{game.title}</h4>
                    <p>{game.description}</p>
                    <div className="feed-actions">
                      <button className="ghost-btn small-btn" onClick={() => navigate(`/play/${game.id}`)}>Jugar</button>
                      {currentUser?.role === 'admin' && (
                        <button className="danger-btn small-btn" onClick={() => deleteGame(game.id)}>Eliminar</button>
                      )}
                    </div>
                  </div>
                </article>
              )) : <p className="empty-state">Este usuario aún no tiene juegos.</p>}
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderAdmin = () => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/community');
      return null;
    }

    const blockedUsers = data.users.filter((user) => user.blocked);
    const reportedUserIds = [...new Set(data.reports.users)];
    const reportedGameIds = [...new Set(data.reports.games)];

    return (
      <div className="page-shell">
        {renderHeader()}
        <main className="admin-page">
          <section className="admin-section">
            <h2>Panel de administración</h2>
            <div className="stats-bar small-stats">
              <div className="stat-item"><strong>{data.users.length}</strong><span>Cuentas</span></div>
              <div className="stat-item"><strong>{blockedUsers.length}</strong><span>Bloqueadas</span></div>
              <div className="stat-item"><strong>{reportedUserIds.length}</strong><span>Usuarios denunciados</span></div>
              <div className="stat-item"><strong>{reportedGameIds.length}</strong><span>Juegos denunciados</span></div>
            </div>
          </section>

          <section className="admin-grid">
            <div className="admin-panel">
              <h3>Usuarios</h3>
              {data.users.filter((user) => user.email !== ADMIN_EMAIL).map((user) => (
                <div key={user.id} className="admin-user-item">
                  <div>
                    <strong>{user.username}</strong>
                    <div className="muted">{user.email}</div>
                  </div>
                  <div className="feed-actions">
                    {user.blocked ? (
                      <button className="ghost-btn small-btn" onClick={() => unblockUser(user.id)}>Desbloquear</button>
                    ) : (
                      <button className="ghost-btn small-btn" onClick={() => blockUser(user.id)}>Bloquear</button>
                    )}
                    <button className="danger-btn small-btn" onClick={() => deleteUser(user.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-panel">
              <h3>Denuncias</h3>
              <div className="report-list">
                {reportedUserIds.length === 0 && reportedGameIds.length === 0 ? (
                  <p className="empty-state">No hay denuncias pendientes.</p>
                ) : (
                  <>
                    {reportedUserIds.map((id) => {
                      const user = data.users.find((entry) => entry.id === id);
                      return user ? <div className="report-item" key={`user-${id}`}>Usuario denunciado: {user.username}</div> : null;
                    })}
                    {reportedGameIds.map((id) => {
                      const game = data.games.find((entry) => entry.id === id);
                      return game ? <div className="report-item" key={`game-${id}`}>Juego denunciado: {game.title}</div> : null;
                    })}
                  </>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };

  const renderGameDetail = () => {
    const game = data.games.find((entry) => entry.id === routeInfo.gameId);
    if (!game) return null;

    return (
      <div className="page-shell">
        {renderHeader()}
        <main className="detail-page">
          <div className="detail-card">
            <div className="detail-visual" style={{ backgroundImage: `url(${game.mediaUrl})` }} />
            <div className="detail-copy">
              <div className="game-topline">
                <span>{game.type}</span>
                <span>{game.status}</span>
              </div>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <div className="tag-row">
                {(game.tags || []).map((tag) => (
                  <span key={tag} className="tag-item">#{tag}</span>
                ))}
              </div>

              <div className="detail-actions">
                <button className="primary-btn" onClick={() => navigate(`/play/${game.id}`)}>Jugar ahora</button>
                <button className="ghost-btn" onClick={() => toggleLike('game', game.id)}>
                  {currentUser && (game.likedBy || []).includes(currentUser.email) ? '❤ Te gusta' : '♡ Me gusta'}
                </button>
              </div>

              <div className="comment-list">
                {(game.comments || []).map((comment) => (
                  <div key={comment.id} className="comment-box">
                    <strong>{comment.user}</strong>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>

              <div className="comment-input-row">
                <input
                  placeholder="Añade un comentario..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addComment('game', game.id, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderPlayGame = () => {
    const game = data.games.find((entry) => entry.id === routeInfo.gameId);
    if (!game) return null;

    return <MiniGame game={game} />;
  };

  const renderCurrentView = () => {
    if (routeInfo.type === 'login') return renderLogin();
    if (routeInfo.type === 'community') return renderCommunity();
    if (routeInfo.type === 'crear') return currentUser ? renderCreate() : renderLogin();
    if (routeInfo.type === 'perfil') return currentUser ? renderProfile() : renderLogin();
    if (routeInfo.type === 'profile-user') return renderProfile();
    if (routeInfo.type === 'admin') return renderAdmin();
    if (routeInfo.type === 'game-detail') return renderGameDetail();
    if (routeInfo.type === 'play') return renderPlayGame();
    return renderHome();
  };

  return <>{renderCurrentView()}</>;
}

function MiniGame({ game }) {
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [coin, setCoin] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState('playing');
  const [bestScore, setBestScore] = useState(0);
  const boardSize = 8;

  const nextCoin = () => {
    setCoin({
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setStatus('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (score > bestScore) setBestScore(score);
  }, [score, bestScore]);

  useEffect(() => {
    const onKey = (event) => {
      if (status !== 'playing') return;
      const moves = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };

      const delta = moves[event.key];
      if (!delta) return;

      setPlayer((prev) => {
        const nextX = Math.max(0, Math.min(boardSize - 1, prev.x + delta.x));
        const nextY = Math.max(0, Math.min(boardSize - 1, prev.y + delta.y));
        const nextPos = { x: nextX, y: nextY };

        if (nextPos.x === coin.x && nextPos.y === coin.y) {
          setScore((current) => {
            const nextValue = current + 1;
            if (nextValue >= 5) {
              setStatus('won');
            }
            return nextValue;
          });
          nextCoin();
        }

        return nextPos;
      });
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [coin, status]);

  const resetGame = () => {
    setPlayer({ x: 0, y: 0 });
    setCoin({ x: 5, y: 5 });
    setScore(0);
    setTimeLeft(30);
    setStatus('playing');
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <button className="ghost-btn" onClick={() => window.history.back()}>
          ← Volver
        </button>
        <h2>{game.title}</h2>
      </header>

      <div className="mini-game-wrap">
        <div className="mini-game-card">
          <div className="game-stats">
            <span>Puntuación: {score}</span>
            <span>Tiempo: {timeLeft}s</span>
            <span>Mejor: {bestScore}</span>
          </div>

          <div className="board-grid">
            {Array.from({ length: boardSize * boardSize }).map((_, index) => {
              const x = index % boardSize;
              const y = Math.floor(index / boardSize);
              const isPlayer = player.x === x && player.y === y;
              const isCoin = coin.x === x && coin.y === y;

              return (
                <div key={`${x}-${y}`} className={`tile ${isPlayer ? 'player' : ''} ${isCoin ? 'coin' : ''}`}>
                  {isPlayer && 'P'}
                  {isCoin && 'C'}
                </div>
              );
            })}
          </div>

          <div className="game-status-box">
            {status === 'playing' && <p>Recoge 5 monedas antes de que termine el tiempo.</p>}
            {status === 'won' && <p>¡Victoria! Has completado el mini juego.</p>}
            {status === 'finished' && <p>Se acabó el tiempo. Inténtalo otra vez.</p>}
            <button className="primary-btn" onClick={resetGame}>Reiniciar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
