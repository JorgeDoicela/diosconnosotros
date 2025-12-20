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
- Teléfono: +593 02 668 073
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

5. PILARES
- Fe en la Palabra de Dios y guía del Espíritu Santo.
- Énfasis en discipulado y liderazgo ético.
- Testimonios de sanidad y milagros.

SI TE PREGUNTAN:
- "¿Dónde están?": Sector Chimbacalle, Av. Maldonado y Sincholagua (Frente a la Fábrica UMCO).
- "¿Horario del domingo?": 08:00 AM a 10:00 AM.
- "¿Quién es el pastor?": Ramiro Freire.
- "¿Programas para mujeres?": Sí, oración de damas los martes a las 9:00 AM.

Responde siempre de forma concisa y motivadora.`;

export default async function handler(req, res) {
    console.log("Handler started"); // Debug log

    if (!process.env.GROQ_API_KEY) {
        console.error("GROQ_API_KEY is missing");
        return res.status(500).json({ error: "Configuration Error: GROQ_API_KEY is missing" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    // Manejo básico de CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { mensaje } = req.body;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: SYSTEM_INSTRUCTION
                },
                {
                    role: "user",
                    content: mensaje,
                },
            ],
            // Llama 3.1 8B es gratis, rapidísimo y muy inteligente
            model: "llama-3.1-8b-instant",
        });

        res.status(200).json({ respuesta: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error("Error Groq:", error);
        res.status(500).json({ error: "Error al conectar con el asistente" });
    }
}
