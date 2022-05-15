import { prisma } from '@/lib/prisma';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // Create new home
  if (req.method === 'POST') {
    try {
      const { image, title, description, price, guests, beds, baths } = req.body;

      console.log(session.user);
      // Retrieve the current authenticated user
      const user = await prisma.user.findUnique({
        where: { id: session.user.sub }
      })

      const home = await prisma.home.create({
        data: { image, title, description, price, guests, beds, baths, ownerId: user?.id ?? '' }
      });
      res.status(200).json(home);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported` });
  }
});
