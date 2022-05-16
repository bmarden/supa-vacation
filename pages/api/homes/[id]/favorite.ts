import { prisma } from '@/lib/prisma';
import { getId } from 'utils/helpers';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = getId(req.query.id);

  if (req.method === 'PUT') {
    try {
      await prisma.user.update({
        where: {
          id: session.user.sub ?? ''
        },
        data: {
          favoriteHomes: {
            connect: {
              id
            }
          }
        }
      });
      res.status(200).json({ message: 'success' });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  if (req.method === 'DELETE') {
    return;
  }
  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).json({ message: `HTTP method ${req.method} is not supported` });
});
