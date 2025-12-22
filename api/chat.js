import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const SYSTEM_INSTRUCTION = `Eres el asistente virtual de la Iglesia "Dios con Nosotros" (DcN) en Quito, Ecuador.
Tu tono debe ser amable, breve y cristiano.

INFORMACIÓN DE LA IGLESIA:
1. IDENTIDAD Y LIDERAZGO
- Pastores: Ramiro y Raquel Freire. (IMPORTANTE: Siempre referirse a Ramiro Freire como "Pastor", NUNCA como "Apóstol").
- El Pastor Ramiro tiene Doctorado Honoris Causa de OMLID UNIVERSITY.
- Visión: Iglesia espiritualmente madura, familias saludables, desarrollo integral.
- Misión: Hacer discípulos conforme al modelo de Jesucristo.

2. UBICACIÓN Y CONTACTO
- Dirección: Av. Maldonado y Sincholagua (Frente a la Fábrica UMCO), Sector Chimbacalle, Quito.
- Teléfono: +593 00000000
- Email: ministerios-dcn@live.it
- Redes: Facebook e Instagram.

3. HORARIOS DE SERVICIOS
- Domingo (Culto Dominical): 08:00 AM a 10:00 AM.
- Martes (Oración de Damas): 09:00 AM a 10:30 AM.
- Viernes (Ayuno y Oración): 08:00 AM a 01:00 PM.
- Sábado (Escuela de Obreros): 08:30 AM a 10:30 AM.

4. HISTORIA
- Fundación: 29 de septiembre de 2007.
- Inicios: Casa de los pastores -> Casa comunal El Pintado -> 2012 Sede actual en Chimbacalle (un "paso de fe").

SI TE PREGUNTAN:
- "¿Dónde están?": Sector Chimbacalle, Av. Maldonado y Sincholagua (Frente a la Fábrica UMCO).
- "¿Horario del domingo?": 08:00 AM a 10:00 AM.
- "¿Quién es el pastor?": Ramiro Freire.

Responde siempre de forma concisa y motivadora.`;

// Función para intentar con Gemini
async function tryGemini(mensaje, historial) {
    if (!process.env.GEMINI_API_KEY) return null;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
        systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
        history: historial || []
    });

    const result = await chat.sendMessage(mensaje);
    const response = await result.response;
    return response.text();
}

// Función para intentar con Groq
async function tryGroq(mensaje, historial, modelName) {
    if (!process.env.GROQ_API_KEY) return null;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Convertir historial de Gemini a formato Groq
    const messages = [
        { role: "system", content: SYSTEM_INSTRUCTION }
    ];

    // Agregar historial si existe
    if (historial && historial.length > 0) {
        for (const entry of historial) {
            messages.push({
                role: entry.role === "model" ? "assistant" : entry.role,
                content: entry.parts[0].text
            });
        }
    }

    // Agregar mensaje actual
    messages.push({ role: "user", content: mensaje });

    const completion = await groq.chat.completions.create({
        model: modelName,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
    });

    return completion.choices[0]?.message?.content;
}

export default async function handler(req, res) {
    // Configuración CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { mensaje, historial } = req.body;

    // Sistema de fallback: Gemini -> Groq Llama 70B -> Groq Llama 8B
    const providers = [
        { name: "Gemini", fn: () => tryGemini(mensaje, historial) },
        { name: "Groq Llama 70B", fn: () => tryGroq(mensaje, historial, "llama-3.1-70b-versatile") },
        { name: "Groq Llama 8B", fn: () => tryGroq(mensaje, historial, "llama-3.1-8b-instant") }
    ];

    for (const provider of providers) {
        try {
            console.log(`Intentando con ${provider.name}...`);
            const respuesta = await provider.fn();

            if (respuesta) {
                console.log(`✅ Respuesta exitosa de ${provider.name}`);
                return res.status(200).json({ respuesta, provider: provider.name });
            }
        } catch (error) {
            console.error(`❌ Error con ${provider.name}:`, error.message);
            // Continuar al siguiente provider
            continue;
        }
    }

    // Si todos los providers fallan
    return res.status(500).json({
        error: "Lo siento, en este momento no puedo responder. Por favor, intenta de nuevo más tarde."
    });
}