import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Narvar from "../components/Narvar";
import FormRuta from "../components/FormRuta";
import PanelRutas from "../components/PanelRutas";
import { getRutas } from "../services/RutasServices";
import "../styles/StylesHome.css";

function PageHome() {
  const navigate = useNavigate();

  const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const data = await getRutas();
        setRutas(data);
      } catch (error) {
        alert(`❌ Error al obtener rutas: ${error.message}`);
      }
    };
    fetchRutas();
  }, []);

  const handleRutaAñadida = (nuevaRuta) => {
    setRutas((prevRutas) => [...prevRutas, nuevaRuta]);
  };

  const handleDelete = (id) => {
    setRutas((prevRutas) => prevRutas.filter((ruta) => ruta.id_ruta !== id));
  };

  const handleUpdate = (id, nuevoNombre) => {
    setRutas((prevRutas) =>
      prevRutas.map((ruta) =>
        ruta.id_ruta === id ? { ...ruta, nombre_ruta: nuevoNombre } : ruta
      )
    );
  };

  return (
    <div className="home">
      <Narvar />
      <div className="content">
        <FormRuta onRutaAñadida={handleRutaAñadida} />
        <PanelRutas
          rutas={rutas}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default PageHome;
