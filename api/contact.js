export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { nombre, email, comentarios } = req.body;

  if (!nombre || !email || !comentarios) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {
    const query = `
      mutation CreateItem($boardId: Int!, $itemName: String!, $columnVals: JSON!) {
        create_item (
          board_id: $boardId,
          item_name: $itemName,
          column_values: $columnVals
        ) {
          id
        }
      }
    `;

    const variables = {
      boardId: 8333309683,
      itemName: nombre,
      columnVals: {
        text_mkmkt1wj: nombre,
        email_mkmkjje1: email,
        long_text_mkmkb82h: { text: comentarios } // ✅ long text requires an object with "text"
      }
    };

    const response = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Authorization': process.env.MONDAY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('Monday.com error:', data.errors);
      return res.status(500).json({ error: 'Error al crear el ítem en Monday.com.' });
    }

    return res.status(200).json({ message: 'Formulario enviado exitosamente.' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Error del servidor.' });
  }
}

