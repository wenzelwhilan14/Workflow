const FormAuth = ({ isSign }) => {
  return (
    <div className={`form-container ${isSign ? "sign-up" : "sign-in"}`}>
      <form>
        <h1>{isSign ? "Crear cuenta" : "Ingresar cuenta"}</h1>

        <span>
          {isSign
            ? "usa tu correo y contraseña para registrarte"
            : "usa tu correo y contraseña para ingresar"}
        </span>

        <input type="email" placeholder="Ingresa tu correo" />
        <input type="password" placeholder="Ingresa tu contraseña" />

        {!isSign && <a href="#">¿olvidaste tu contraseña?</a>}

        <button>{isSign ? "registar" : "ingresar"}</button>
      </form>
    </div>
  );
};

export default FormAuth;
