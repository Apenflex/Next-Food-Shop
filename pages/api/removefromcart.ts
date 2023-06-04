import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function removeFromCartHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const cartItemId = req.query.cartItemId as string

            const deletedCartItem = await prisma.cart.delete({
                where: {
                    id: cartItemId,
                },
            })

            res.status(200).json({ message: 'Cart item deleted', cart: deletedCartItem })
        } catch (error) {
            res.status(403).json({ error: 'Error deleting cart item' })
        }
    }
}