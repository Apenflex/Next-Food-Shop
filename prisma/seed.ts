import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const shops = [
        {
            name: 'Mac',
            address: 'Avenue 1',
            products: {
                create: [{ name: 'Big Mac', price: 3.99, image: 'https://picsum.photos/400/200' },
                    { name: 'McChicken', price: 2.99, image: 'https://picsum.photos/400/200' },
                    { name: 'McNuggets', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'McFlurry', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Fries', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Coke', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Sprite', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Water', price: 1.99, image: 'https://picsum.photos/400/200' }
                ],
            },
        },
        {
            name: 'Burger King',
            address: 'Avenue 2',
            products: {
                create: [{ name: 'Whopper', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Sandwich', price: 3.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Fries', price: 2.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Onion Rings', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Fries XL', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Coke Zero', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Fanta', price: 1.99, image: 'https://picsum.photos/400/200' },
                ],
            },
        },
        {
            name: 'KFC',
            address: 'Avenue 3',
            products: {
                create: [{ name: 'Bucket of Chicken', price: 9.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Sandwich XL', price: 3.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Tenders', price: 2.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Fries SM', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Coke Large', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Sprite Large', price: 1.99, image: 'https://picsum.photos/400/200' },
                ],
            },
        },
        {
            name: 'Pizza Hut',
            address: 'Avenue 4',
            products: {
                create: [{ name: 'Pepperoni Pizza', price: 7.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Cheese Pizza', price: 6.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Hawaiian Pizza', price: 8.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Wings', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Garlic Bread', price: 2.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Coke Medium', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Sprite Medium', price: 1.99, image: 'https://picsum.photos/400/200' },
                ],
            },
        },
        {
            name: 'Subway',
            address: 'Avenue 5',
            products: {
                create: [{ name: 'Footlong', price: 5.99, image: 'https://picsum.photos/400/200' },
                    { name: '6-inch', price: 3.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Meatball Marinara', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Chicken Teriyaki', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Tuna', price: 4.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Coke Small', price: 1.99, image: 'https://picsum.photos/400/200' },
                    { name: 'Sprite Small', price: 1.99, image: 'https://picsum.photos/400/200' },
                ],
            },
        },
    ]

    for (let shop of shops) {
        await prisma.shops.create({
            data: {
                name: shop.name,
                address: shop.address,
                products: shop.products,
            },
        })
    }

    console.log('Shops and products seeded successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
