import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function addToCartHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { productId, quantity, name, price, image } = req.body

            const product = await prisma.products.findFirst({
                where: {
                    id: productId,
                },
            })

            if (!product) {
                throw new Error('Product not found')
            }

            const existingCartItem = await prisma.cart.findFirst({
                where: {
                    products: {
                        some: {
                            id: productId,
                        },
                    },
                },
            })

            if (existingCartItem) {
                const updatedCartItem = await prisma.cart.update({
                    where: {
                        id: existingCartItem.id,
                    },
                    data: {
                        quantity: existingCartItem.quantity + parseInt(quantity, 10),
                    },
                    include: {
                        products: true,
                    },
                })

                res.status(200).json({ message: 'Product added to cart', cart: updatedCartItem })
            } else {
                const cart = await prisma.cart.create({
                    data: {
                        quantity: parseInt(quantity, 10),
                        products: {
                            connect: {
                                id: productId,
                            },
                        },
                        name,
                        price,
                        image,
                    },
                    include: {
                        products: true,
                    },
                })

                res.status(200).json({ message: 'Product added to cart', cart })
            }
        } catch (error) {
            res.status(403).json({ error: 'Error adding product to cart' })
        }
    }
}
