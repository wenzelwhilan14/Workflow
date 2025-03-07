const FormAuth = ({
  isSign,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  error,
  loading,
}) => {
  return (
    <div className={`form-container ${isSign ? "sign-up" : "sign-in"}`}>
      <form onSubmit={handleSubmit}>
        <h1>{isSign ? "Crear cuenta" : "Ingresar cuenta"}</h1>

        <span>
          {isSign
            ? "usa tu correo y contraseña para registrarte"
            : "usa tu correo y contraseña para ingresar"}
        </span>

        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isSign && <a href="#">¿olvidaste tu contraseña?</a>}

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : isSign ? "registar" : "ingresar"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default FormAuth;
