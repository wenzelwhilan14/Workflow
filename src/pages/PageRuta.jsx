import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Narvar from "../components/Narvar";
import FormPunto from "../components/FormPunto";
import MapaRuta from "../components/MapaRuta";
import PanelPuntos from "../components/PanelPuntos";
import { getRutaById, getCantidadPuntos } from "../services/RutasServices";
import { getPuntosByRuta } from "../services/PuntosServices";
import { useNavigate } from "react-router-dom";
import "../styles/StylesRuta.css";

function PageRuta() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cantPuntos, setCantPuntos] = useState("0");
  const [nombreRuta, setNombreRuta] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [puntos, setPuntos] = useState([]);
  const [optimizedPoints, setOptimizedPoints] = useState([]);

  const handleRutas = () => {
    navigate(`/home`);
  };

  const fetchRuta = async () => {
    try {
      const ruta = await getRutaById(id);
      setNombreRuta(ruta.nombre_ruta);
    } catch (error) {
      console.error("Error obteniendo la ruta:", error);
    }
  };

  const updateOptimizedPoints = (orderedPoints) => {
    setOptimizedPoints(orderedPoints);
  };

  const fetchPuntos = async () => {
    try {
      const cantidadDePuntos = await getCantidadPuntos(id);
      setCantPuntos(cantidadDePuntos);

      const puntosObtenidos = await getPuntosByRuta(id);
      setPuntos(
        puntosObtenidos.map((p) => ({
          lat: p.latitud_punto,
          lng: p.altitud_punto,
        }))
      );
    } catch (error) {
      console.error("Error obteniendo puntos:", error);
    }
  };

  useEffect(() => {
    fetchRuta();
    fetchPuntos();
  }, [id]);

  const handleDelete = (id) => {
    setOptimizedPoints((prevPuntos) =>
      prevPuntos.filter((punto) => punto.id_punto !== id)
    );
    setOptimizedPoints((prevPuntos) =>
      prevPuntos.filter((punto) => punto.id_punto !== id)
    );
  };

  const handleUpdate = (id, nuevoCliente, nuevaDireccion, nuevoTelefono) => {
    setOptimizedPoints((prevPuntos) =>
      prevPuntos.map((punto) =>
        punto.id_punto === id
          ? {
              ...punto,
              cliente_punto: nuevoCliente,
              direccion_punto: nuevaDireccion,
              telefono_punto: nuevoTelefono,
            }
          : punto
      )
    );
  };

  return (
    <div className="ruta">
      <Narvar />
      <div className="content">
        <div className="ruta-detalles">
          <div className="ruta-datos-detalles">
            <div className="id-ruta-detalles">ID: {id}</div>
            <div className="ruta-datos-detalles-id">
              <label>Ruta:</label>{" "}
              <p className="nombre-ruta-detalles">{nombreRuta}</p>
              <label>Puntos:</label>{" "}
              <p className="puntos-ruta-detalles">{cantPuntos}</p>
            </div>
          </div>
        </div>

        <MapaRuta
          id={id}
          puntos={puntos}
          updateOptimizedPoints={updateOptimizedPoints}
        />

        <div className="buscar">
          <div className="barra-buscar">
            <button className="btn-ver-rutas" onClick={handleRutas}>
              Ver Rutas
            </button>
            <input type="text" placeholder="Buscar ruta por nombre" />
            <button className="btn-buscar-punto">Buscar</button>
            <button
              className="btn-añadir-punto"
              onClick={() => setShowModal(true)}
            >
              Añadir Punto
            </button>
          </div>
        </div>

        <PanelPuntos
          optimizedPoints={optimizedPoints}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormPunto
              setShowModal={setShowModal}
              idRuta={id}
              fetchPuntos={fetchPuntos}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default PageRuta;
