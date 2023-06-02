import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const DEFAULT_COOKIE_NAME = 'defaultCookieName'

export default async function logOut(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }
    try {
        const cookieName = process.env?.COOKIE_NAME || DEFAULT_COOKIE_NAME
        res.setHeader(
            'Set-Cookie',
            serialize(cookieName, '', {
                httpOnly: true,
                path: '/',
                expires: new Date(0),
                sameSite: 'strict',
            })
        )
        res.status(200).json({ message: 'Logout Successful' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
        return
    }
}
