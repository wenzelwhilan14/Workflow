export const traducirError = (errorCode) => {
  const errores = {
    "Invalid login credentials": "Credenciales incorrectas.",
    "User already registered": "El usuario ya está registrado.",
    "User not found": "Usuario no encontrado.",
    "Password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres.",
    "Email not confirmed": "Debes confirmar tu email antes de iniciar sesión.",
    "Session expired": "Sesión expirada, vuelve a iniciar sesión.",
    "Email already exists": "Este correo ya está en uso.",
  };

  return errores[errorCode] || "Ocurrió un error desconocido.";
};
