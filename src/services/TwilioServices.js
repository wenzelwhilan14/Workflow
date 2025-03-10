import TWILIO_API from "../config/TwilioApi";

const API_BASE_URL = TWILIO_API;

const formatPhoneNumber = (number) => {
  if (!number.startsWith("+")) {
    return `+${number}`;
  }
  return number;
};

export const sendSMS = async (to, message) => {
  try {
    const formattedTo = formatPhoneNumber(to);
    const response = await fetch(`${API_BASE_URL}/sms/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: formattedTo, message }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al enviar SMS:", error);
    throw error;
  }
};

export const makeCall = async (to, message) => {
  try {
    const formattedTo = formatPhoneNumber(to); // Asegura el formato
    const response = await fetch(`${API_BASE_URL}/calls/make`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: formattedTo, message }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al realizar la llamada:", error);
    throw error;
  }
};
