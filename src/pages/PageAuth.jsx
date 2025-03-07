import React, { useState } from "react";
import FormAuth from "../components/FormAuth";
import ToggleAuth from "../components/ToggleAuth";
import * as auth from "../services/AuthServices";
import { traducirError } from "../utils/errorMessages";
import "../styles/StylesAuth.css";

const PageAuth = () => {
  const [isSign, setIsSign] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleToggle = () => {
    setIsSign(!isSign);
    clearForm();
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSign) {
        await auth.signUp(email, password);
        alert("Registro exitoso");
      } else {
        await auth.signIn(email, password);
        alert("Inicio de sesión exitoso");
      }
      clearForm();
    } catch (err) {
      setError(traducirError(err.message));
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className={`container ${isSign ? "active" : ""}`}>
      <FormAuth
        isSign={isSign}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
      <ToggleAuth isSign={isSign} handleToggle={handleToggle} />
    </div>
  );
};

export default PageAuth;
