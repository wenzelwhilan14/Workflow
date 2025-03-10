import { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import MapsService from "../services/MapsServices";
import { getPuntosByRuta } from "../services/PuntosServices";

function MapaRuta({ id, updateOptimizedPoints }) {
  const [userLocation, setUserLocation] = useState(null);
  const [puntos, setPuntos] = useState([]);
  const [order, setOrder] = useState([]);
  const [directions, setDirections] = useState(null);
  const [optimizedOrder, setOptimizedOrder] = useState([]);

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        alert("No se pudo obtener tu ubicación.");
      }
    );

    async function fetchPuntos() {
      try {
        const puntosObtenidos = await getPuntosByRuta(id);
        console.log("📌 Puntos obtenidos:", puntosObtenidos);
        setOrder(puntosObtenidos);
        setPuntos(
          puntosObtenidos.map((p) => ({
            lat: p.latitud_punto,
            lng: p.altitud_punto,
          }))
        );
      } catch (error) {
        console.error("Error obteniendo puntos:", error);
      }
    }

    fetchPuntos();
  }, [id]);

  useEffect(() => {
    if (userLocation && puntos.length > 0) {
      calcularRutaOptimizada();
    }
  }, [userLocation, puntos]);

  const calcularRutaOptimizada = () => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps no está cargado todavía.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: userLocation,
        destination: userLocation,
        waypoints: puntos.map((p) => ({ location: p, stopover: true })),
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log("✅ Ruta optimizada:", result);

          const optimizedOrder = result.routes[0].waypoint_order;

          if (optimizedOrder.length > 0) {
            const lastWaypointIndex = optimizedOrder[optimizedOrder.length - 1];
            const optimizedDestination = puntos[lastWaypointIndex];

            console.log("🎯 Destino optimizado:", optimizedDestination);

            directionsService.route(
              {
                origin: userLocation,
                destination: optimizedDestination,
                waypoints: puntos
                  .filter((_, index) => index !== lastWaypointIndex)
                  .map((p) => ({ location: p, stopover: true })),
                travelMode: window.google.maps.TravelMode.DRIVING,
                optimizeWaypoints: true,
              },
              (newResult, newStatus) => {
                if (newStatus === window.google.maps.DirectionsStatus.OK) {
                  setDirections(newResult);
                  const optimizedOrder = result.routes[0].waypoint_order;
                  setOptimizedOrder(optimizedOrder);
                  const puntosOrdenados = optimizedOrder.map(
                    (index) => order[index]
                  );
                  updateOptimizedPoints(puntosOrdenados);
                  console.log("🔹 Puntos ordenados:", puntosOrdenados);
                } else {
                  console.error("Error en la segunda optimización:", newStatus);
                }
              }
            );
          } else {
            setDirections(result);
          }
        } else {
          console.error("Error al obtener la ruta optimizada:", status);
        }
      }
    );
  };

  return (
    <div className="map">
      <div className="mapa-ruta">
        <LoadScriptNext googleMapsApiKey={MapsService.apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || MapsService.defaultCenter}
            zoom={12}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "white",
                }}
              />
            )}
            {optimizedOrder.map((orderIndex, idx) => (
              <Marker
                key={idx}
                position={puntos[orderIndex]}
                label={{
                  text: String.fromCharCode(65 + idx),
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            ))}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                }}
              />
            )}
          </GoogleMap>
        </LoadScriptNext>
      </div>
    </div>
  );
}

export default MapaRuta;
