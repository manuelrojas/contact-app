import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    const {
      body: { contactId, title, content },
      method,
    } = req

    if(!session) {
      res.status(403).end('Unauthorized route')
    }
    
    try {
      if(method === 'POST') {
          const user = await prisma.comment.create({
            data: {
              contactId: contactId as string,
              title: title as string,
              content: content as string
            },
          });
          res.status(200).json(user);
      }
      res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
      res.status(500).send({ error: 'API failed' })
    }
    
}

