import { supabase } from "../config/SupabaseClient";

export const getPuntosByRuta = async (id_ruta) => {
  const { data, error } = await supabase
    .from("puntos")
    .select("*")
    .eq("id_ruta", id_ruta);
  if (error) throw error;
  return data;
};

export const getPuntoById = async (id_punto) => {
  const { data, error } = await supabase
    .from("puntos")
    .select("*")
    .eq("id_punto", id_punto)
    .single();
  if (error) throw error;
  return data;
};

export const createPunto = async (
  id_ruta,
  cliente,
  direccion,
  latitud,
  altitud,
  telefono
) => {
  const { data, error } = await supabase
    .from("puntos")
    .insert([
      {
        id_ruta,
        cliente_punto: cliente,
        direccion_punto: direccion,
        latitud_punto: latitud,
        altitud_punto: altitud,
        telefono_punto: telefono || null,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updatePunto = async (id_punto, nuevosDatos) => {
  const { data, error } = await supabase
    .from("puntos")
    .update(nuevosDatos)
    .eq("id_punto", id_punto)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePunto = async (id_punto) => {
  const { error } = await supabase
    .from("puntos")
    .delete()
    .eq("id_punto", id_punto);
  if (error) throw error;
  return { message: "Punto eliminado correctamente" };
};
