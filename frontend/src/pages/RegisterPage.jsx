import { useState } from "react";
import { registerUser } from "../services/authService";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(formData);


      setMessage(data.message);


    } catch (error) {
      console.log(error);

      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-enter">
      <form className="form" onSubmit={handleSubmit}>
        <h1>AlgoArena Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Loading..." : "Register"}
        </button>

        <p>{message}</p>
      </form>
    </div>
  );
}

export default RegisterPage;