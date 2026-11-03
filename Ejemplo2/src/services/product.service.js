const repository = require('../repositories/product.repository');

exports.getAll = () => repository.getAll();

exports.getById = (id) => repository.getById(id);

exports.create = (data) => repository.create(data);

exports.update = (id, data) => repository.update(id, data);

exports.updatePartial = (id, data) => {
    const allowed = ['nombre', 'precio', 'cantidad'];
    const filtered = {};
    for (const key of allowed) {
        if (data[key] !== undefined) filtered[key] = data[key];
    }
    return repository.update(id, filtered);
};

exports.remove = (id) => repository.remove(id);