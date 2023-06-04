import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function updateCartItemHandler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'PUT') {
        try {
            const { cartItemId, quantity } = req.body

            const updatedCartItem = await prisma.cart.update({
                where: {
                    id: cartItemId,
                },
                data: {
                    quantity: quantity,
                },
            })

            res.status(200).json({ message: 'Cart item updated', cart: updatedCartItem })
        } catch (error) {
            res.status(403).json({ error: 'Error updating cart item' })
        }
    }
}