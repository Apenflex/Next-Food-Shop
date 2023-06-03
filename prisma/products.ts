const fs = require('fs')
const path = require('path')
import prisma from '@prisma/client'

async function main() {
    const products = [
        {
            name: 'Product 1',
            price: 100,
            image: 'https://picsum.photos/200/300',
        },
        {
            name: 'Product 2',
            price: 200,
            image: 'https://picsum.photos/200/300',
        },
        {
            name: 'Product 3',
            price: 300,
            image: 'https://picsum.photos/200/300',
        },
        {
            name: 'Product 4',
            price: 400,
            image: 'https://picsum.photos/200/300',
        },
        {
            name: 'Product 5',
            price: 500,
            image: 'https://picsum.photos/200/300',
        },
        {
            name: 'Product 6',
            price: 600,
            image: 'https://picsum.photos/200/300',
        },
    ]

    products.map(async (product) => {
        await prisma.product.upsert({
            where: { name: product.name },
            update: {},
            create: product,
        })
        console.log(`Product ${product.name} created successfully`)
    }
    )

    main()
        .then(async () => {
            await prisma.$disconnect()
        }
    )
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        }
    )
}
