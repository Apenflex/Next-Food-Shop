import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Get all products from database
        try {
            const products = await prisma.products.findMany({})
            res.status(200).json(products);
        } catch (error) {
            res.status(403).json({ err: 'Error fetching products' })
        }
    }
}