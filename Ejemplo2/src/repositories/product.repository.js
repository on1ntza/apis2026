let products = [];
let nextId = 1;

exports.getAll = async () => products;

exports.getById = async (id) => products.find(p => p.id === Number(id));

exports.create = async (data) => {
    const product = { id: nextId++, ...data };
    products.push(product);
    return product;
};

exports.update = async (id, data) => {
    const product = products.find(p => p.id === Number(id));
    if (!product) return null;
    Object.assign(product, data);
    return product;
};

exports.remove = async (id) => {
    const index = products.findIndex(p => p.id === Number(id));
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
};