import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { comparePasswords, createJWT } from '@/lib/auth';
import prisma from '@/prisma/client';

const DEFAULT_COOKIE_NAME = 'defaultCookieName'
const MAX_AGE = 60 * 60 * 24 * 7

export default async function signIn(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  // console.log('req.body', req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: 'Missing email or password' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Invalid login' });
      return;
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const jwtToken = await createJWT(user);
    const cookieName = process.env?.COOKIE_NAME || DEFAULT_COOKIE_NAME
    res.setHeader(
        'Set-Cookie',
        serialize(cookieName, jwtToken, {
            httpOnly: true,
            path: '/',
            maxAge: MAX_AGE,
            sameSite: 'strict', // Adds SameSite attribute as strict to the cookie
        })
    )
    
    res.status(201).json({ message: 'Login Successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
}
