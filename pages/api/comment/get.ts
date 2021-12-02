import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { contactId },
  } = req 

  try {
   // console.log(global.prisma);
    const data = await prisma.comment.findMany({
      where: {
        contactId: contactId as string,
    }}); 
   // const data = await prisma.comment.findMany(); 

    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
     console.log(error);
     res.status(500).send({ error: 'API failed' })
  }
 
 



}

