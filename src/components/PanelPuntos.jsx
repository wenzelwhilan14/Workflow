import CardPunto from "./CardPunto";

function PanelPuntos({ optimizedPoints, onDelete, onUpdate }) {
  return (
    <div className="puntos">
      <div className="puntos-panel">
        <p>mis puntos:</p>
        {optimizedPoints.length > 0 ? (
          optimizedPoints.map((optimizedPoints, index) => (
            <CardPunto
              key={optimizedPoints.id_punto}
              id={optimizedPoints.id_punto}
              ruta={optimizedPoints.id_ruta}
              cliente={optimizedPoints.cliente_punto}
              direccion={optimizedPoints.direccion_punto}
              telefono={optimizedPoints.telefono_punto}
              estado={optimizedPoints.estado_punto}
              onDelete={onDelete}
              onUpdate={onUpdate}
              index={index}
            />
          ))
        ) : (
          <p>📌 No hay puntos registrados.</p>
        )}
      </div>
    </div>
  );
}

export default PanelPuntos;
