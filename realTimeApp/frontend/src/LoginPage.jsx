import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:3000";
  const loginSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${BACKEND_URL}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    if (response.data) {
      navigate("/");
    }
  };

  return (
    <div className="login_page">
      <form className="form" onSubmit={loginSubmit}>
        <h4>Sign In</h4>
        <div className="field">
          <label htmlFor="username">Username</label> <br />
          <input
            className="form-input"
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* // */}
        <br />
        {/*  */}
        <div className="field">
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="form-input"
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <p>
          Don't have an account yet? <a href="/signup">Register Now</a>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
