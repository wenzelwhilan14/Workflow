import { useState } from "react";
import { createRuta } from "../services/RutasServices";

function FormRuta({ onRutaAñadida }) {
  const [nombreRuta, setNombreRuta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreRuta.trim()) {
      alert("⚠ El nombre de la ruta no puede estar vacío.");
      return;
    }

    try {
      const ruta = nombreRuta.toLowerCase();
      const nuevaRuta = await createRuta(ruta);
      onRutaAñadida(nuevaRuta);
      setNombreRuta("");
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="form">
      <div className="form-ruta">
        <p>nueva ruta</p>
        <form onSubmit={handleSubmit}>
          <label>ruta:</label>
          <input
            type="text"
            placeholder="Ingrese el nombre de la ruta"
            value={nombreRuta}
            onChange={(e) => setNombreRuta(e.target.value)}
          />
          <button type="submit">añadir</button>
        </form>
      </div>
    </div>
  );
}

export default FormRuta;
