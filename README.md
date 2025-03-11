<div style="text-align: justify;">

# Workflow

Workflow es una aplicación web desarrollada en React que optimiza rutas, mostrando el orden y detalle de los puntos de las rutas en un mapa, junto con funciones de comunicación como llamadas y mensajes SMS. Los usuarios pueden registrarse, iniciar sesión y gestionar sus rutas de manera eficiente.

## ✅ Requisitos

Antes de empezar, asegúrate de cumplir con los siguientes requisitos:

1. **Cuenta de Supabase**:
   - Necesitas una cuenta en [Supabase](https://supabase.io/). Crear una base de datos utlizando el script en la carpeta "data" dentro del repositorio y obtener las credenciales necesarias (URL y API Key).
2. **Cuenta de Google Cloud (API Key)**:
   - Para integrar mapas y servicios de geolocalización, necesitas una cuenta de [Google Cloud](https://cloud.google.com/) y una API Key de Google Maps.
   - Asegúrate de habilitar la API de Google Maps JavaScript y Routes API en la consola de Google Cloud.
3. **Cuenta de Twilio y Backend TwilioAPI**:
   - Nesecitas una cuenta en [Twilio](https://www.twilio.com/en-us), nesecitas verificar un numero de telefono para hacer llamadas y mensajes de prueba.
   - Nesecitas desplegar el backend [TwilioAPI](https://github.com/wenzelwhilan14/TwilioAPI). En este repositorio esta para desplegar una API ya sea de manera local o con render.
   - copiar el link de la API desplegada y colocarla como variable de entorno.
4. **Archivo de variables de entorno (.env)**:
   - Asegúrate de crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
VITE_SUPABASE_URL=<TU_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<TU_SUPABASE_API_KEY>
VITE_GOOGLE_APIKEY=<TU_GOOGLE_API_KEY>
VITE_TWILIO_API=<API_TWILIO_URL>
```

## 🚀 Características

- **Optimización de rutas**: El sistema optimiza las rutas y las ordena alfabéticamente según los puntos en las rutas.
- **Gestión de rutas**: Los usuarios pueden visualizar todas sus rutas, acceder a detalles de cada una y ver los puntos de la ruta, que pueden ser hasta 5.
- **Mapa interactivo**: Las rutas se muestran en un mapa donde los puntos están organizados en el orden correcto, alfabéticamente.
- **Autenticación de usuario**: Los usuarios pueden registrarse e iniciar sesión para ver y gestionar sus rutas de manera personalizada.
- **Llamadas y SMS**: La aplicación permite realizar llamadas y enviar mensajes SMS a los puntos de contacto de las rutas.

## 🛠️ Tecnologías utilizadas

- **React**: Biblioteca JavaScript para construir la interfaz de usuario.
- **Node.js**: Entorno de ejecución para el backend.
- **Twilio API**: Para realizar llamadas y enviar SMS.
- **Supabase (PostgreSQL)**: Base de datos para almacenar información de rutas y usuarios.
- **Vercel / Netlify**: Despliegue en la nube (dependiendo de la plataforma elegida).

## 📥 Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/wenzelwhilan14/Workflow
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd Workflow
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia la aplicación de React:

   ```bash
   npm run dev
   ```

**NOTA**: No te olvides que ejecutar el script.sql en la consola de supabase, el script esta en la carpeta data del proyecto.

## 🚀 Despliegue

Para desplegar la aplicación de React de manera gratuita, puedes usar Vercel o Netlify.

- **Desplegar con Vercel**:
  1. Regístrate o inicia sesión en [Vercel](https://vercel.com).
  2. Conecta tu repositorio de GitHub y despliega el proyecto.
  3. Vercel se encargará del resto, incluyendo la configuración de dominios y CI/CD.
- **Desplegar con Netlify**:
  1. Regístrate o inicia sesión en [Netlify](https://www.netlify.com).
  2. Conecta tu repositorio de GitHub y despliega el proyecto.
  3. Configura el build y las opciones de despliegue, si es necesario.

## 💻 Uso

1. **Registro y Login**: Los usuarios deben registrarse con su información y luego iniciar sesión para acceder a sus rutas.
2. **Ver rutas**: Una vez iniciada la sesión, pueden ver todas sus rutas.
3. **Ver detalles de ruta**: Al seleccionar una ruta, se muestra un mapa con los puntos ordenados alfabéticamente según la optimización de la ruta.
4. **Llamadas y SMS**: Los usuarios pueden realizar llamadas o enviar mensajes a los contactos de los puntos de la ruta.

## 📝 Licencia

Este proyecto es de código abierto. ¡Úsalo como quieras! 😃

---

## 📌 Autor

🔹 **Wenzel Whilan Cruzado Villegas**  
📧 Contacto: [wenzelcruzado14@gmail.com](mailto:wenzelcruzado14@gmail.com)

</div>
