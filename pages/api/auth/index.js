import { connectToDatabase } from "@/helpers/auth/auth-db";
import { hashPassword } from "@/helpers/auth/auth-util";

export default async function handler(req, res) {

    const { email, password } = req.body;

    if (req.method === 'POST') {
        if (!email || !email.includes('@') || !password || !(password.trim().length > 7)) {
            res.status(422).json({ message: 'Invalid input - Email must be valid and password must be atleast 7 characters long!' });
            return;
        }

        const client = await connectToDatabase();
        const db = client.db();

        const existingUser = await db.collection('users').findOne({
            email
        });

        if (existingUser) {
            res.status(422).json({ message: 'User already exists!', exists: true });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User Created!' });
        client.close();
    }
    else {
        res.status(422).json({ message: 'Invalid Request' });
    }
}