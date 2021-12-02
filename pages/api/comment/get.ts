import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { contactId },
  } = req 

  const session = await getSession({ req })

  if(!session) {
    res.status(403).end('Unauthorized route');
  }

  try {
    const data = await prisma.comment.findMany({
        where: {
            contactId: contactId as string,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        take: 3
    }); 
    
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
      res.status(500).send({ error: 'API failed' })
  }
}

