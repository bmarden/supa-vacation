import { NextApiResponse } from 'next';
import type { StandardResponse } from 'types/responses';

export function handleServerError(res: NextApiResponse<StandardResponse>,  err: any)  {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
};

export function handleUnauthorized(res: NextApiResponse<StandardResponse>) {
  res.status(401).json({ message: 'Unauthorized', success: false });
}

export function handleSuccess<T extends StandardResponse>(res: NextApiResponse<T>, body: T) {
  res.status(200).json({ ...body, success: true });
}
