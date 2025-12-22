
async function testChat() {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje: "¿A qué hora es el culto del domingo?" })
        });

        if (!response.ok) {
            console.error("Error:", response.status, await response.text());
            return;
        }

        const data = await response.json();
        console.log("Respuesta del chatbot:", data.respuesta);
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

testChat();
