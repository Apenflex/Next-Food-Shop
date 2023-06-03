import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method === 'GET') {
        // Get all shops from database
        try {
            const shops = await prisma.shops.findMany({})
            res.status(200).json(shops);
        } catch (error) {
            res.status(403).json({ err: 'Error fetching shops' })
        }
    }
}