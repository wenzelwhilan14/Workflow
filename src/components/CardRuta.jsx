import { useEffect, useState } from "react";
import {
  updateRuta,
  deleteRuta,
  getCantidadPuntos,
} from "../services/RutasServices";
import { useNavigate } from "react-router-dom";

function CardRuta({ id, nombre, onDelete, onUpdate }) {
  const navigate = useNavigate();
  const [edicion, setEdicion] = useState(false);
  const [inputRuta, setInputRuta] = useState(nombre);
  const [cantPuntos, setCantPuntos] = useState("0");

  useEffect(() => {
    const fetchCant = async () => {
      const cant = await getCantidadPuntos(id);
      setCantPuntos(cant);
    };
    fetchCant();
  }, []);

  const toggleInput = () => {
    setEdicion(!edicion);
    setInputRuta(nombre);
  };

  const handleUpdate = async () => {
    if (!inputRuta.trim()) {
      alert("⚠ El nombre de la ruta no puede estar vacío.");
      return;
    }

    try {
      await updateRuta(id, inputRuta.toLowerCase());
      onUpdate(id, inputRuta.toLowerCase());
      setEdicion(false);
    } catch (error) {
      alert(`❌ Error al actualizar ruta: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar esta ruta?")) {
      try {
        await deleteRuta(id);
        onDelete(id);
      } catch (error) {
        alert(`❌ Error al eliminar ruta: ${error.message}`);
      }
    }
  };

  const handleDetalles = () => {
    navigate(`/home/ruta/${id}`);
  };

  return (
    <div className="card">
      <div className="card-ruta">
        <div className="id-ruta">ID: {id}</div>
        <div className="ruta">
          <div className="ruta-datos">
            <label>Ruta:</label>
            <input
              type="text"
              value={inputRuta}
              disabled={!edicion}
              onChange={(e) => setInputRuta(e.target.value)}
            />
            <label>Puntos:</label>
            <span>{cantPuntos} puntos</span>
          </div>
          <div className="ruta-options">
            {edicion && (
              <button className="btn-guardar" onClick={handleUpdate}>
                Guardar
              </button>
            )}
            {edicion && (
              <button className="btn-cancelar" onClick={toggleInput}>
                Cancelar
              </button>
            )}
            {!edicion && (
              <button className="btn-editar" onClick={toggleInput}>
                Editar
              </button>
            )}
            {!edicion && (
              <button className="btn-detalles" onClick={handleDetalles}>
                Detalles
              </button>
            )}
            {!edicion && (
              <button className="btn-eliminar" onClick={handleDelete}>
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRuta;
