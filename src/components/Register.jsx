import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/network";

function Register({ registerSuccess }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpw, setConfirmpw] = useState('');

  const navigate = useNavigate();

  async function onSubmitHandler(event){
    event.preventDefault();

    if (password !== confirmpw) {
      alert("Password tidak sama!");
      return;
    }

    const {error} = await register({ name, email, password });

    if (!error) {
      alert("User berhasil dibuat! Silahkan login.");
      navigate("/login");
    }
  }

 return (
    <div className="input-register">
      <h2>Register</h2>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmpw">Confirm Password</label>
        <input
          type="password"
          id="confirmpw"
          value={confirmpw}
          onChange={(e) => setConfirmpw(e.target.value)}
          required
        />

        <button type="submit">Daftar</button>
      </form>

      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}

export default Register;