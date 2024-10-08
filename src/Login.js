import React, { useState } from "react";
import "./Login.css";
import CurrencyInput from "react-currency-input-field";

function Login({ onLogin,salary, setSalary }) {
  const [username, setUsername] = useState("");
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (/^[a-zA-Z0-9_]+$/.exec(username)) {
      onLogin(username.toLowerCase() + salary);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Enter user name to track expense</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="salary">Salary</label>
          <CurrencyInput
            onChange={(e) => setSalary(e.target.value)}
            type="text"
            defaultValue={1000}
            decimalsLimit={2}
            allowNegativeValue={0}
            prefix="₹"
            intlConfig={{ locale: "en-IN", currency: "INR" }}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
