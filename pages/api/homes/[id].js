import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Get the user
  const user = await prisma.user.findUnique({
    where: { id: session.user.sub },
    select: { listedHomes: true }
  });

  // Check if authenticated user is owner of this home
  const { id } = req.query;
  if (!user?.listedHomes?.find((home) => home.id === id)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Update home
  if (req.method === 'PATCH') {
    try {
      const home = await prisma.home.update({
        where: { id },
        data: req.body
      });
      res.status(200).json(home);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
});
