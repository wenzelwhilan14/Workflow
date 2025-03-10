import { supabase } from "../config/SupabaseClient";
import { getUser } from "./AuthServices";

export const getRutas = async () => {
  try {
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("No se encontró un usuario autenticado.");
    }

    const { data, error } = await supabase
      .from("rutas")
      .select("*")
      .eq("user", user.id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error obteniendo rutas:", error);
    return null;
  }
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
  try {
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("No se encontró un usuario autenticado.");
    }

    const { data, error } = await supabase
      .from("rutas")
      .insert([{ nombre_ruta, user: user.id }]) // Agregar usuario
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al crear la ruta:", error);
    return null;
  }
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
