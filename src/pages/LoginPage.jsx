import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login
      if (!email || !password) {
        setError('Por favor completa todos los campos');
        return;
      }
      onLogin({ email, username: email.split('@')[0] });
    } else {
      // Register
      if (!username || !email || !password) {
        setError('Por favor completa todos los campos');
        return;
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
      onLogin({ email, username });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark">F</div>
          <div className="brand-text">FansGamesCreate</div>
        </div>

        <h1>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h1>
        <p className="login-subtitle">
          {isLogin
            ? 'Bienvenido de vuelta'
            : 'Únete a nuestra comunidad de creadores'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu_usuario"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <div className="login-toggle">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="toggle-btn"
            >
              {isLogin ? 'Registrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>

        <div className="login-demo">
          <p className="demo-hint">
            <strong>Demo:</strong> Usa cualquier email y contraseña para probar
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
