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
  return data;
};

// 🔹 CERRAR SESIÓN
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// 🔹 OBTENER USUARIO ACTUAL
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
