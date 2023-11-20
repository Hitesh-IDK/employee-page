
import { connectToDatabase } from '@/helpers/auth/auth-db';
import { extractData } from './data';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let client;
        try {
            client = await connectToDatabase();
        }
        catch (error) {
            const homeData = {
                emplyCount: ' - ',
                queryCount: ' - '
            }

            res.status(504).json({ data: homeData, message: 'Server failed to connect' })
            return;
        }

        try {
            const data = await extractData('', 'remote');
            let count = 0;
            for (const i in data)
                count++;

            const queries = client.db().collection('queries');
            const queryData = await queries.find().toArray();

            let queryCount = 0;

            if (queryData) {
                for (const i in queryData) {
                    queryCount += queryData[i].queryCount;
                }
            }

            client.close();
            const homeData = {
                emplyCount: count,
                queryCount: queryCount
            }

            res.status(200).json({ data: homeData, message: 'Success' })
        }

        catch (error) {
            client.close();
            const homeData = {
                emplyCount: ' - ',
                queryCount: ' - '
            }

            res.status(503).json({ data: homeData, message: 'Server failed to connect' })
        }
        return;
    }
    else {
        res.status(405).json({ message: 'Invalid Request' });
        return;
    }
}