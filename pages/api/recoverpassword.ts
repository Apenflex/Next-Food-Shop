import { NextApiRequest, NextApiResponse } from 'next'

export default async function recoverPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
      res.status(405).end()
      return
  }

  const { email, password } = req.body

  if (!email || !password) {
      res.status(401).json({ error: 'Missing email or password' })
      return
  }
}
