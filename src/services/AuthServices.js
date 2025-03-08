import Cookies from "js-cookie";
import { supabase } from "../config/SupabaseClient";

// 🔹 REGISTRAR USUARIO
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// 🔹 INICIAR SESIÓN
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  if (data?.session) {
    Cookies.set("supabase_session", JSON.stringify(data.session));
  }

  return data;
};

// 🔹 CERRAR SESIÓN
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  Cookies.remove("supabase_session");
};

// 🔹 OBTENER USUARIO ACTUAL
export const getUser = async () => {
  const sessionFromCookie = Cookies.get("supabase_session");

  if (sessionFromCookie) {
    // Si hay una sesión guardada en la cookie, la devolvemos
    return JSON.parse(sessionFromCookie).user;
  } else {
    // Si no, obtenemos el usuario actual desde Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }
};
