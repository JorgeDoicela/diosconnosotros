
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function verModelosReales() {
    if (!API_KEY) {
        console.log("❌ No hay API KEY en .env");
        return;
    }

    console.log("📡 Consultando a Google...");

    // Hacemos una petición directa a la API REST de Google
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();

    if (data.error) {
        console.error("❌ Error de la API:", data.error.message);
        return;
    }

    console.log("\n✅ MODELOS DISPONIBLES PARA TU CUENTA:");
    console.log("---------------------------------------");

    // Filtramos solo los que sirven para generar contenido
    const modelosUtiles = data.models
        .filter(m => m.supportedGenerationMethods.includes("generateContent"))
        .map(m => m.name.replace("models/", "")); // Limpiamos el nombre

    modelosUtiles.forEach(nombre => console.log(`👉 "${nombre}"`));

    console.log("---------------------------------------");
    console.log("COPIA UNO DE ESTOS NOMBRES EXACTAMENTE en tu api/chat.js");
}

verModelosReales();
