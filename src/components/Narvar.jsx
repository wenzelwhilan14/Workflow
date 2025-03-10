import { useNavigate } from "react-router-dom";
import * as auth from "../services/AuthServices";

function Narvar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/auth", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };
  return (
    <div className="narvar">
      <p>workflow</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default Narvar;
