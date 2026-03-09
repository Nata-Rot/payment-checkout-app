"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const product_orm_entity_1 = require("../entities/product.orm-entity");
const products = [
    { id: (0, uuid_1.v4)(), name: 'MacBook Pro M3', description: 'Laptop Apple chip M3 16GB RAM 512GB SSD', priceInCents: 750000000, stock: 10, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
    { id: (0, uuid_1.v4)(), name: 'Sony WH-1000XM5', description: 'Audifonos inalambricos cancelacion de ruido 30h bateria', priceInCents: 120000000, stock: 25, imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800' },
    { id: (0, uuid_1.v4)(), name: 'iPad Pro 12.9', description: 'Tablet chip M2 pantalla Liquid Retina XDR WiFi 6E', priceInCents: 520000000, stock: 15, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' },
];
async function seed() {
    const ds = new typeorm_1.DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [product_orm_entity_1.ProductOrmEntity],
        synchronize: true,
        ssl: process.env.DATABASE_URL?.includes('rds.amazonaws.com') ? { rejectUnauthorized: false } : false,
    });
    await ds.initialize();
    const repo = ds.getRepository(product_orm_entity_1.ProductOrmEntity);
    for (const p of products) {
        const exists = await repo.findOne({ where: { name: p.name } });
        if (!exists) {
            await repo.save(repo.create(p));
            console.log('Seeded:', p.name);
        }
        else {
            console.log('Already exists:', p.name);
        }
    }
    await ds.destroy();
    console.log('Seed complete');
}
seed().catch(console.error);
//# sourceMappingURL=product.seed.js.map