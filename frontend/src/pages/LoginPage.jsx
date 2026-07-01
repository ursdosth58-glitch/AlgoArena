import { useState } from "react";
import "./LoginPage.css";
import API from "../services/api";

function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post("/auth/login",
        {
            email,
            password,
        }
      );


      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
        
      window.location.href = "/";

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="login-page page-enter">

      <div className="login-container">

        <h1>Login</h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit"
            className="primary-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
}

export default LoginPage;