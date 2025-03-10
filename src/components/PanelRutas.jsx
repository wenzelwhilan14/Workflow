import CardRuta from "./CardRuta";

function PanelRutas({ rutas, onDelete, onUpdate }) {
  return (
    <div className="panel">
      <div className="panel-rutas">
        <p>Mis rutas:</p>
        {rutas.length > 0 ? (
          rutas.map((ruta) => (
            <CardRuta
              key={ruta.id_ruta}
              id={ruta.id_ruta}
              nombre={ruta.nombre_ruta}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <p>📌 No hay rutas registradas.</p>
        )}
      </div>
    </div>
  );
}

export default PanelRutas;
