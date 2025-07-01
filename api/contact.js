// main/api/contact.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nombre, email, comentarios } = req.body;

  if (!nombre || !email || !comentarios) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    // Example: log or send to your backend / database / webhook
    console.log({ nombre, email, comentarios });

    // Respond with success
    return res.status(200).json({ message: 'Formulario enviado exitosamente.' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Error del servidor. Intenta de nuevo.' });
  }
}
