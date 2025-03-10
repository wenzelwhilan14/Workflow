import Cookies from "js-cookie";
import { supabase } from "../config/SupabaseClient";

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

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

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  Cookies.remove("supabase_session");
};

export const getUser = async () => {
  const sessionFromCookie = Cookies.get("supabase_session");

  if (sessionFromCookie) {
    return JSON.parse(sessionFromCookie).user;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }
};
