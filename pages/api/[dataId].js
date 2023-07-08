import { buildDataPath, extractData } from './data'
import fs from 'fs';

function handler(req, res) {
    const dataId = req.query.dataId;
    const filePath = buildDataPath();
    const data = extractData(filePath);

    if (req.method === 'DELETE') {
        const filteredData = data.filter((item) => {
            if (item.name.toLowerCase() !== dataId)
                return item;
        })

        fs.writeFileSync(filePath, JSON.stringify(filteredData));
        res.status(200).json('Success!');
    }
    else {
        res.status(201).json('Success!');
    }
}

export default handler;