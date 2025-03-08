import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormAuth from "../components/FormAuth";
import ToggleAuth from "../components/ToggleAuth";
import * as auth from "../services/AuthServices";
import { traducirError } from "../utils/ErrorMessages";
import "../styles/StylesAuth.css";

const PageAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSign, setIsSign] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await auth.getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  if (user) {
    navigate("/home", { replace: true });
  }

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
        navigate("/home", { replace: true });
      }
      clearForm();
    } catch (err) {
      setError(traducirError(err.message));
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="auth">
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
    </div>
  );
};

export default PageAuth;
