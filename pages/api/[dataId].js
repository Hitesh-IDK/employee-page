import { buildDataPath, extractData } from './data'
import fs from 'fs';

async function handler(req, res) {
    const dataId = req.query.dataId;
    const filePath = buildDataPath();
    const data = await extractData(filePath, 'remote');

    if (req.method === 'DELETE') {

        for (const i in data) {
            if (data[i].name.toLowerCase() === dataId) {
                fetch(`${process.env.APIURL}/${i}.json`, {
                    method: 'DELETE'
                })
            }
        }

        res.status(200).json('Success!');
    }
    else {
        res.status(201).json('Invalid!');
    }
}

export default handler;