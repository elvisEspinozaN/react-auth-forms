import React from "react";
import { useState } from "react";

function SignUpForm({ setToken, clearToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [signedInUser, setSignedInUser] = useState(null);

  const handleUsernameChange = (e) => {
    clearToken();
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 8) {
      setErrors("Username must be at least eight characters long.");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        setErrors(result.message || "Failed to sign up");
      }

      setToken(result.token);
      setSignedInUser(username);
      setUsername("");
      setPassword("");
      setErrors(null);
    } catch (E) {
      setErrors(E.message || "An Error occurred. Try again.");
    }
  };

  return (
    <div>
      {signedInUser ? <h2>Welcome, {signedInUser}</h2> : <h2>Sign Up</h2>}
      {errors && <p>{errors}</p>}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Username:{" "}
          <input onChange={handleUsernameChange} value={username} type="text" />
        </label>
        <label htmlFor="">
          Password:{" "}
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
