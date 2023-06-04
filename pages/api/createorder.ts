import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function createOrderHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { formData, cartProducts, totalPrice } = req.body
            
            /**
             * Save data from form into cart in db
             */
            const createdOrder = await prisma.order.create({
                data: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    totalPrice: totalPrice,
                    orderItems: {
                        create: cartProducts.map((cartProduct) => ({
                            productId: cartProduct.id,
                            productName: cartProduct.name,
                            quantity: cartProduct.quantity,
                            productPrice: cartProduct.price,
                        })),
                    },
                },
            })

            res.status(200).json({ message: 'Order created', order: createdOrder })
        } catch (error) {
            res.status(403).json({ error: 'Error creating order' })
        }
    }
}
