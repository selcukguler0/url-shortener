// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import generateRandomString from '@/libs/generateRandomString';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const now = Date.now();
	const randomString = now + "-"+ generateRandomString(7);
  res.status(200).json({ name: 'John Doe' })
}
