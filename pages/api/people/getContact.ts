import jwt from 'next-auth/jwt';
import {google} from 'googleapis'

const secret = process.env.SECRET;
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export default async (req, _res) => {
  const token = await jwt.getToken({ req, secret });
  
  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });

  auth.setCredentials({
    access_token: token.accessToken as string
  });

  const service = google.people({version: 'v1', auth});
  const options = {
    resourceName: 'people/me',
    pageSize: 10,
    personFields: 'names,emailAddresses,photos',
  };

  const getPeople = (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);

  const { connections } = res.data;
    let newData = [];
    if (connections) {
      newData = connections.map(person => {
        return {
          name: person.names[0]?.displayName,
          photo: person.photos[0]?.url,
          emailAddresses: person.emailAddresses[0]?.value
        }
      })
    }

    _res.send(JSON.stringify(newData, null, 2));
  }

  service.people.connections.list(options, getPeople);
};