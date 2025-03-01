import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setSuccessMessage(null);
    setErrors(null);
  }, [token]);

  const handleClick = async () => {
    setErrors(null);
    setSuccessMessage(null);

    try {
      if (!token) {
        setErrors("No authentication token available");
        return;
      }

      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      setSuccessMessage(result.message || "Successfull authenticated");
    } catch (E) {
      setErrors(E.message || "An error occurred during authentication");
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {errors && <p>{errors}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </div>
  );
}

export default Authenticate;
