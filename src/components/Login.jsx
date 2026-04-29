import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../utils/network";

function Login({ loginSuccess }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmitHandler(event){
    event.preventDefault();

    const {error, data} = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

 return (
    <div className="input-login">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Belum punya akun? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;