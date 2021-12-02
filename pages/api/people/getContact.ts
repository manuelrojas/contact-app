import jwt from 'next-auth/jwt';
import {google} from 'googleapis'
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.SECRET;
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export default async (req: NextApiRequest, _res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret });
  
  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });

  auth.setCredentials({
    access_token: token?.accessToken as string
  });

  const service = google.people({version: 'v1', auth});
  const options = {
    resourceName: 'people/me',
    pageSize: 10,
    personFields: 'names,emailAddresses,photos,metadata',
  };

let peopleApiResolve, peopleApiReject;

var getData = new Promise(function(resolve, reject){
  peopleApiResolve = resolve;
  peopleApiReject = reject;
});
 
  const getPeople = (err, res) => {
    if(err) peopleApiReject(err);

    const { connections } = res?.data;
      if (connections) {
        let newData = [];
        newData = connections.map(person => {
          return {
            id: person.metadata?.sources[0]?.id,
            name: person.names[0]?.displayName,
            photo: person.photos[0]?.url,
            email: person.emailAddresses[0]?.value
          }
        })
        peopleApiResolve(newData)
      }

    return res;
  } 


  service.people.connections.list(options, getPeople);
  const data = await getData.then(data => data);

  _res.send(JSON.stringify(data, null, 2));
};