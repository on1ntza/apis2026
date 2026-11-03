const express = require('express');
const app = express();

// Middleware global obligatorio para parsear cuerpos en formato JSON
app.use(express.json());

// 1. Captura de Query Parameters (req.query)
app.get('/api/v1/products', (req, res) => {
    const { category, limit } = req.query;
    res.status(200).json({
        message: "Listando productos",
        filters: { category, limit: limit || 10 }
    });
});

// 2. Captura de Route Parameters (req.params)
app.get('/api/v1/products/:id', (req, res) => {
    const productId = req.params.id;
    res.status(200).json({
        message: `Consultando producto con ID: ${productId}`
    });
});

// 3. Captura de Body Parameters (req.body)
app.post('/api/v1/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: "Los campos 'name' y 'price' son obligatorios" });
    }

    const newProduct = { id: Date.now(), name, price };
    res.status(201).json(newProduct);
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en el puerto 3000");
});