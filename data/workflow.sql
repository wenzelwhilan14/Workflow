create table rutas (
  id_ruta uuid default gen_random_uuid() primary key,
  nombre_ruta TEXT not null,
  user TEXT
);

CREATE TABLE puntos (
  id_punto UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_ruta UUID NOT NULL,
  cliente_punto TEXT NOT NULL,
  direccion_punto TEXT NOT NULL,
  latitud_punto DECIMAL(9,6) NOT NULL,
  altitud_punto DECIMAL(9,6) NOT NULL,
  telefono_punto TEXT,
  estado_punto TEXT NOT NULL DEFAULT 'pendiente',
  FOREIGN KEY (id_ruta) REFERENCES rutas(id_ruta) ON DELETE CASCADE
);
