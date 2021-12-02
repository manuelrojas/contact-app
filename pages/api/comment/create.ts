import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
      body: { contactId, title, content },
      method,
    } = req
    if(method === 'POST') {
      try {
        const user = await prisma.comment.create({
          data: {
            contactId: contactId as string,
            title: title as string,
            content: content as string
          },
        });
        res.status(200).json(user)
      } catch (error) {
        res.status(500).send({ error: 'API failed' })
      }
  
    }

    res.status(405).end(`Method ${method} Not Allowed`)
}

