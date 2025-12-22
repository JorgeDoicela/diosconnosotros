import { GoogleGenerativeAI } from "@google/generative-ai";

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

export default async function handler(req, res) {
    // Verificación de API Key
    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Configuration Error: GEMINI_API_KEY is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    // 1. AHORA RECIBIMOS 'historial' ADEMÁS DEL MENSAJE
    const { mensaje, historial } = req.body;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-latest", // El modelo que funcionó
            systemInstruction: SYSTEM_INSTRUCTION
        });

        // 2. INICIAMOS EL CHAT CON MEMORIA
        // Gemini espera el historial en formato: [{ role: "user", parts: [...] }, { role: "model", parts: [...] }]
        const chat = model.startChat({
            history: historial || [] // Si no hay historial, empieza vacío
        });

        // 3. ENVIAMOS EL MENSAJE NUEVO
        const result = await chat.sendMessage(mensaje);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ respuesta: text });
    } catch (error) {
        console.error("Error Gemini:", error);
        res.status(500).json({ error: "Error al conectar con el asistente" });
    }
}