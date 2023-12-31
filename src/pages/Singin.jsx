//hooks
import { useState } from 'react';
import { useLogIn } from '../hooks/useLogIn';
import { useNavigate } from 'react-router-dom';
//styles
//see signup.css sheet for .auth-form

function Singin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, isPending, error } = useLogIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="auth-container">
      {!isPending ? (
        <form className="auth-form-signin" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          {!isPending && <button className="btn">Sign In</button>}
          {isPending && <button className="btn">Signing In...</button>}
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div>Signing You In</div>
      )}
    </div>
  );
}

export default Singin;
