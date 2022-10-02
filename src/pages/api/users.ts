// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { IUser } from '../../dto/IUser';

import Router from 'next/router';

type Data = {
  users?: IUser[];
  user?: IUser;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
  
      return res.status(200).json({ users });
    }

    else if (req.method === 'POST') {
      const { name, email } = req.body;
  
      const user = await prisma.user.create({
        data: {
          name,
          email
        }
      });

      return res.status(200).json({ user });
    }

    else if (req.method === 'DELETE') {
      const { id } = req.body;
  
      const user = await prisma.user.delete({
        where: {
          id
        }
      });

      return res.status(200).json({ user });
    }

    else if (req.method === 'PUT') {
      const { id, name, email } = req.body;
  
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          name,
          email
        }
      });

      return res.status(200).json({ user });
    }

    Router.reload();
  }
  catch (error) {
    console.error(error);

    return res.status(500);
  }
}
