import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function getProductsToCartHandler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method === 'GET') {
        // Get all products to cart from database
        try {
            const productsToCart = await prisma.cart.findMany({})
            res.status(200).json(productsToCart);
        } catch (error) {
            res.status(403).json({ err: 'Error fetching products to cart' })
        }
    }
}