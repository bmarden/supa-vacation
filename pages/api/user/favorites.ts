import { prisma } from '@/lib/prisma';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  console.log('Called /api/user/favorites')
  const session = getSession(req, res);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.sub
      },
      include: {
        favoriteHomes: true
      }
    });
    const favorites = user?.favoriteHomes.map((home) => home.id)
    console.log(favorites)
    res.status(200).json({ favorites });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
});
