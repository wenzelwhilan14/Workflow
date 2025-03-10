import { useEffect, useState } from "react";
import { updatePunto, deletePunto } from "../services/PuntosServices";
import { useNavigate } from "react-router-dom";

function CardPunto({
  id,
  ruta,
  cliente,
  direccion,
  telefono,
  estado,
  onDelete,
  onUpdate,
  index,
}) {
  const navigate = useNavigate();
  const [edicion, setEdicion] = useState(false);
  const [inputCliente, setInputCliente] = useState(cliente);
  const [inputDireccion, setInputDireccion] = useState(direccion);
  const [inputTelefono, setInputTelefono] = useState(telefono);

  const getPuntoName = (index) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return `Punto ${alphabet[index % alphabet.length]}`;
  };

  const puntoName = getPuntoName(index);

  const toggleInput = () => {
    setEdicion(!edicion);
    setInputCliente(cliente);
    setInputDireccion(direccion);
    setInputTelefono(telefono);
  };

  const handleUpdate = async () => {
    if (!inputCliente.trim() || !inputDireccion.trim()) {
      alert("⚠ Los campos no pueden estar vacíos.");
      return;
    }

    try {
      const nuevosDatos = {
        cliente_punto: inputCliente,
        direccion_punto: inputDireccion,
        telefono_punto: inputTelefono,
      };
      await updatePunto(id, nuevosDatos);
      onUpdate(id, inputCliente, inputDireccion, inputTelefono);
      setEdicion(false);
    } catch (error) {
      alert(`❌ Error al actualizar el punto: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar este punto?")) {
      try {
        await deletePunto(id);
        onDelete(id);
      } catch (error) {
        alert(`❌ Error al eliminar el punto: ${error.message}`);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-punto">
        <div className="id-punto">{puntoName}</div>
        <div className="punto">
          <div className="punto-datos">
            <label>Cliente:</label>
            <input
              type="text"
              value={inputCliente}
              disabled={!edicion}
              onChange={(e) => setInputCliente(e.target.value)}
            />
            <label>Dirección:</label>
            <input
              type="text"
              value={inputDireccion}
              disabled={true}
              onChange={(e) => setInputDireccion(e.target.value)}
            />
            <div className="telefono-container">
              <label>Teléfono:</label>
              <input
                type="text"
                value={inputTelefono}
                disabled={!edicion}
                onChange={(e) => setInputTelefono(e.target.value)}
              />
              {!edicion && (
                <div className="telefono-buttons">
                  <button className="btn-call">CALL</button>
                  <button className="btn-sms">SMS</button>
                </div>
              )}
            </div>
          </div>
          <div className="punto-options">
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

export default CardPunto;
