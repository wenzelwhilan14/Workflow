import { supabase } from "../config/SupabaseClient";

export const getRutas = async () => {
  const { data, error } = await supabase.from("rutas").select("*");
  if (error) throw error;
  return data;
};

export const getRutaById = async (id_ruta) => {
  const { data, error } = await supabase
    .from("rutas")
    .select("*")
    .eq("id_ruta", id_ruta)
    .single();
  if (error) throw error;
  return data;
};

export const createRuta = async (nombre_ruta) => {
  const { data, error } = await supabase
    .from("rutas")
    .insert([{ nombre_ruta }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateRuta = async (id_ruta, nombre_ruta) => {
  const { data, error } = await supabase
    .from("rutas")
    .update({ nombre_ruta })
    .eq("id_ruta", id_ruta)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteRuta = async (id_ruta) => {
  const { error } = await supabase
    .from("rutas")
    .delete()
    .eq("id_ruta", id_ruta);
  if (error) throw error;
  return { message: "Ruta eliminada correctamente" };
};

export const getCantidadPuntos = async (id_ruta) => {
  const { count, error } = await supabase
    .from("puntos")
    .select("id_punto", { count: "exact" })
    .eq("id_ruta", id_ruta);

  if (error) throw error;

  return count;
};
