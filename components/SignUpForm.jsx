import React from "react";
import { useState } from "react";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(result);
    } catch (E) {
      setErrors(E.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {errors && <p>{errors}</p>}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Username:{" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
          />
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
