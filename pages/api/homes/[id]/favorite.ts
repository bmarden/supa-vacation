import { prisma } from '@/lib/prisma';
import { getId } from 'utils/helpers';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { handleServerError, handleSuccess, handleUnauthorized } from 'utils/respHandlers';
import { StandardResponse } from 'types/responses';
import { NextApiRequest, NextApiResponse } from 'next';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandardResponse>
) {
  const session = getSession(req, res);

  if (!session) {
    handleUnauthorized(res);
    return;
  }

  const homeId = getId(req.query.id);

  if (req.method === 'PUT') {
    try {
      await prisma.user.update({
        where: {
          id: session.user.sub ?? ''
        },
        data: {
          favoriteHomes: {
            connect: {
              id: homeId
            }
          }
        }
      });
      handleSuccess(res, { message: 'successfully added favorite' });
      return;
    } catch (err) {
      handleServerError(res, err);
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.user.update({
        where: {
          id: session.user.sub
        },
        data: {
          favoriteHomes: {
            disconnect: {
              id: homeId
            }
          }
        }
      });
      handleSuccess(res, { message: 'successfully removed favorite' });
    } catch (error) {
      handleServerError(res, error);
      return;
    }
    return;
  }
  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).json({ message: `HTTP method ${req.method} is not supported` });
});
