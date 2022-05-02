import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import * as URL from 'url';
import { getId } from 'utils/helpers';

const supabaseBucket = process.env.SUPABASE_BUCKET;
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

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
  const id = getId(req.query.id);

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
  } else if (req.method === 'DELETE') {
    try {
      // delete home
      const home = await prisma.home.delete({
        where: { id }
      });

      // remove image from storage bucket
      if (home.image) {
        const path = home.image.split(`${supabaseBucket}/`)?.[1];
        await supabase.storage.from(supabaseBucket).remove([path]);
      }
      res.status(200).json(home);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PATCH', 'DELETE']);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }
});
