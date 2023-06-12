import { NextApiRequest, NextApiResponse } from 'next'

import { compareRecoverCodes, hashPassword } from '@/lib/auth'
import prisma from '@/prisma/client'

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.status(405).end()
        return
    }

    const { email, newPassword, code } = req.body

    switch (true) {
        case !email:
            res.status(401).json('Missing email')
            return
        case !newPassword:
            res.status(401).json('Missing password')
            return
        case !code:
            res.status(401).json('Missing code')
            return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4}).*$/

    if (!passwordRegex.test(newPassword)) {
        res.status(401).json('Password must contain one uppercase letter, one lowercase letter, and four digits')
        return
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            res.status(404).json('User not found. Please check your email')
            return
        }

        const isCodeValid = await compareRecoverCodes(code, user.recoverCode)

        if (!isCodeValid) {
            res.status(401).json('Invalid recovery code')
            return
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                password: await hashPassword(newPassword),
            },
        })

        res.status(200).json({ message: 'Password reset successful' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
