import { useState } from "react";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import { createPunto } from "../services/PuntosServices";
import MapsService from "../services/MapsServices";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function FormPunto({ setShowModal, idRuta, fetchPuntos }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [center, setCenter] = useState(MapsService.defaultCenter);
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({}); //

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = "El nombre es obligatorio.";
    if (!address.trim()) errors.address = "La dirección es obligatoria.";
    if (!phone.trim()) errors.phone = "El teléfono es obligatorio.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "300px",
    borderRadius: "20px",
  };

  const handleCheckAddress = async () => {
    if (!address.trim()) return;
    try {
      const coordinates = await MapsService.getCoordinatesFromAddress(address);
      if (coordinates) {
        setCenter(coordinates);
      } else {
        alert("No se pudo encontrar la dirección.");
      }
    } catch (error) {
      console.error("Error al buscar dirección:", error);
      alert("Ocurrió un error al buscar la dirección.");
    }
  };

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCenter({ lat, lng });

    try {
      const newAddress = await MapsService.getAddressFromCoordinates(lat, lng);
      if (newAddress) {
        setAddress(newAddress);
      }
    } catch (error) {
      console.error("Error al obtener dirección:", error);
    }
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      alert("⚠️ Complete todos los campos obligatorios antes de continuar.");
      return;
    }

    try {
      const coordinates = await MapsService.getCoordinatesFromAddress(address);
      if (!coordinates) {
        alert("No se pudo encontrar la dirección.");
        return;
      }

      setCenter(coordinates);

      await createPunto(
        idRuta,
        name,
        address,
        coordinates.lat,
        coordinates.lng,
        phone
      );

      await fetchPuntos();
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el punto:", error);
      alert("Error al agregar el punto.");
    }
  };

  return (
    <div className="form">
      <div className="form-punto">
        <div className="nuevo-punto">
          <p>Nuevo Punto</p>
          <form>
            <div className="input-group">
              <label>Nombre:</label>
              <input
                type="text"
                placeholder="Ingrese el nombre del cliente"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Teléfono:</label>
              <PhoneInput
                country={"pe"}
                disableCountryCode={false}
                disableDropdown={false}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: "100%",
                  height: "38px",
                  paddingLeft: "50px",
                }}
                containerStyle={{ width: "100%" }}
                buttonStyle={{
                  borderRadius: "4px 0 0 4px",
                  borderRight: "1px solid #ccc",
                  padding: "8px",
                  background: "#f8f8f8",
                }}
                required
              />
            </div>

            <div className="input-group">
              <label>Dirección:</label>
              <div className="direccion-container">
                <input
                  type="text"
                  placeholder="Ingrese la dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="comprobar-btn"
                  onClick={handleCheckAddress}
                >
                  Comprobar
                </button>
              </div>
            </div>

            <div className="opciones">
              <button className="btn-añadir" type="button" onClick={handleAdd}>
                Añadir
              </button>
              <button
                className="btn-cancelar"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className="mapa-punto">
          <LoadScriptNext googleMapsApiKey={MapsService.apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={MapsService.defaultZoom}
              onClick={handleMapClick}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScriptNext>
        </div>
      </div>
    </div>
  );
}

export default FormPunto;
