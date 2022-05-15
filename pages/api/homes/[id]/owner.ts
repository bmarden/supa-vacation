import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import * as URL from 'url';
import { getId } from 'utils/helpers';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const id = getId(req.query.id);
      // console.log(id);

      const result = await prisma.home.findUnique({
        where: { id },
        select: { owner: true }
      });
      res.status(200).json(result?.owner);
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
