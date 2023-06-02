import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { createJWT, hashPassword } from '@/lib/auth';
import prisma from '@/prisma/client';

const DEFAULT_COOKIE_NAME = 'defaultCookieName';
const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export default async function signUp(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
    });

    const jwtToken = await createJWT(user);
    const cookieName = process.env?.COOKIE_NAME || DEFAULT_COOKIE_NAME;
    res.setHeader(
      'Set-Cookie',
      serialize(cookieName, jwtToken, {
        httpOnly: true,
        path: '/',
        maxAge: MAX_AGE,
      })
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
