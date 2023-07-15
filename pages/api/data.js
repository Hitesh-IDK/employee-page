import fs from 'fs';
import path from 'path';

export function buildDataPath() {
    //emplyData.json is a json file where the local data is stored, create a data folder in the main directory and place a emplyData.json file with a [] in there.
    return path.join(process.cwd(), 'data', 'emplyData.json');
}

export async function extractData(filePath, source=' ') {

    if(source === 'remote') {
        const response = await fetch(`${process.env.APIURL}.json`);
        const data = await response.json();
        return data;
    }
    else {
        const readData = fs.readFileSync(filePath);
        const data = JSON.parse(readData);
        return data;
    }
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body.data;
        const destination = req.body.destination;

        if (destination === 'local') {
            //store the data in a local file
            const filePath = buildDataPath();
            const fileData = await extractData(filePath, 'remote');

            fileData.push(data);
            fs.writeFileSync(filePath, JSON.stringify(fileData));
            res.status(200).json('Success!');
        }
        else if (destination === 'remote') {
            //store the data on a remote database
            fetch(`${process.env.APIURL}.json`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            res.status(200).json('Success!');
        }
        else if (destination === 'hybrid') {
            //store the data in a local file
            const filePath = buildDataPath();
            const fileData = await extractData(filePath);

            fileData.push(data);
            fs.writeFileSync(filePath, JSON.stringify(fileData));

            //store the data on a remote database
            const response = await fetch(`${process.env.APIURL}.json`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            res.status(200).json({message: 'Successfully added!'});
        }
        else {
            res.status(502).json({ message: 'Invalid Destination Specified!', data: data });
            return;
        }

        // //sending a response once data has been stored\        res.status(201).json({ feedback: 'Success', data: data });
    }
    else {
        const filePath = buildDataPath();
        const data = await extractData(filePath, 'remote');

        res.status(200).json({ emplyData: data });
    }
}

export default handler;