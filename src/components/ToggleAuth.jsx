const ToggleAuth = ({ isSign, handleToggle }) => {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div
          className={`toggle-panel ${isSign ? "toggle-left" : "toggle-right"}`}
        >
          <h1>{isSign ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}</h1>
          <p>
            {isSign
              ? "Ingresa tus datos y mantente en el camino correcto para que sigas avanzando."
              : "Regístra tus datos y trazaremos el camino correcto para que sigas en marcha."}
          </p>
          <button className="hidden" onClick={handleToggle}>
            {isSign ? "iniciar sesion" : "crear cuenta"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleAuth;
