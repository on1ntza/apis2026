const service = require('../services/product.service');

exports.getAll = async (req, res, next) => {
    try {
        const products = await service.getAll();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const product = await service.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { nombre, precio, cantidad } = req.body;
        if (!nombre || precio == null || cantidad == null) {
            return res.status(400).json({ error: 'nombre, precio y cantidad son obligatorios' });
        }
        if (typeof precio !== 'number' || typeof cantidad !== 'number') {
            return res.status(400).json({ error: 'precio y cantidad deben ser números' });
        }
        const product = await service.create({ nombre, precio, cantidad });
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { nombre, precio, cantidad } = req.body;
        if (!nombre || precio == null || cantidad == null) {
            return res.status(400).json({ error: 'PUT requiere nombre, precio y cantidad' });
        }
        const product = await service.update(req.params.id, { nombre, precio, cantidad });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.updatePartial = async (req, res, next) => {
    try {
        const product = await service.updatePartial(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const deleted = await service.remove(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};