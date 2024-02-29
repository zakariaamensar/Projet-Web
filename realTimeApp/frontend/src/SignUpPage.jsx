import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const BACKEND_URL = "http://localhost:3000";

  const registerSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${BACKEND_URL}/register`,
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
    <div className="register_page">
      <form className="form" onSubmit={registerSubmit}>
        <h4>Sign Up</h4>
        <div className="field">
          <label htmlFor="username">Username</label> <br />
          <input
            className="form-input"
            type="text"
            id="username"
            placeholder="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />

        <button className="btn" type="submit">
          register
        </button>

        <p>
          Already have an account? <a href="/login">Login Now</a>
        </p>
      </form>
    </div>
  );
};
export default SignUpPage;
