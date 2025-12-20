import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_INSTRUCTION = `Eres el asistente de la iglesia cristiana 'Dios con Nosotros' en Quito. 
INFO CLAVE:
- Horarios: Domingos 8:00 AM y 10:30 AM.
- Ubicación: Quito, sector Villaflora.
Responde de forma breve, amable y siempre con un tono cristiano.`;

export default async function handler(req, res) {
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
