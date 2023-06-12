import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

import { hashRecoverCode } from '@/lib/auth'
import prisma from '@/prisma/client'

export default async function sendRecoverCode(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'defaultKey')

    const { email } = req.body

    if (!email) {
        res.status(401).json('Please fill your Email')
        return
    }

    const recoverCode = Math.floor(100000 + Math.random() * 900000).toString()

    try {
        await prisma.user.update({
            where: { email },
            data: {
                recoverCode: await hashRecoverCode(recoverCode),
            },
        })
    } catch (error) {
        console.error(error)
        res.status(500).json('Internal server error')
    }

    const msg = {
        to: email,
        from: 'blackdbf@gmail.com',
        subject: 'Recover password',
        text: `Your recovery code is ${recoverCode}`,
        // html: `<p>${recoverCode}</p>`,
    }

    try {
        await sgMail.send(msg)
        res.status(200).end()
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).send('Message not sent.')
    }
}
