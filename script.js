const Login = ({ onFormSwitch, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => onFormSwitch('register')}>Register</button>
      </p>
    </div>
  );
};

const Register = ({ onFormSwitch, onRegister }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="auth-form">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <button onClick={() => onFormSwitch('login')}>Login</button>
      </p>
    </div>
  );
};

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin panel</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

const App = () => {
  const [currentForm, setCurrentForm] = React.useState('login');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : currentForm === 'login' ? (
        <Login 
          onFormSwitch={setCurrentForm}
          onLogin={handleLogin}
        />
      ) : (
        <Register 
          onFormSwitch={setCurrentForm}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));