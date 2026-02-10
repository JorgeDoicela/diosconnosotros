# Dios Con Nosotros (DcN) - Plataforma Web

Este es el repositorio oficial de la Iglesia "Dios con Nosotros" (Quito, Ecuador). La plataforma es una aplicación web moderna construida con React y Vite, diseñada para brindar información sobre la iglesia, horarios, historia y cuenta con un asistente virtual inteligente.

## Tecnologías Principales

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **IA:** [Google Generative AI (Gemini)](https://ai.google.dev/) & [Groq SDK](https://groq.com/)
- **Despliegue:** [Vercel](https://vercel.com/)

## Prerrequisitos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/)

## Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JorgeDoicela/diosconnosotros.git
   cd diosconnosotros
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y añade tus claves de API:
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   GROQ_API_KEY=tu_clave_aqui
   ```
   *Nota: El sistema utiliza Gemini como proveedor principal y Groq como respaldo (llama-3.1).*

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Construcción para Producción

Para generar los archivos listos para despliegue:

```bash
npm run build
```

## Asistente Virtual

El proyecto incluye una función de API (`/api/chat.js`) que maneja la lógica del asistente virtual de la iglesia. Está configurado para responder de manera amable y breve, siguiendo la voz y misión de la Iglesia DcN.

## Ubicación de la Iglesia

- **Dirección:** Av. Maldonado y Sincholagua (Frente a la Fábrica UMCO), Sector Chimbacalle, Quito, Ecuador.
- **Contacto:** ministerios-dcn@live.it
