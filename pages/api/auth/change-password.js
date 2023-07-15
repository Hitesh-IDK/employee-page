import { connectToDatabase } from "@/helpers/auth/auth-db";
import { hashPassword, verifyPassword } from "@/helpers/auth/auth-util";
import { getServerSession } from "next-auth";

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getServerSession(req, res);

    if (!session) {
        res.status(401).json({ message: 'Not Authenticated!' });
        return;
    }

    const email = session.user.email;
    const { oldPassword, newPassword } = JSON.parse(req.body);

    if(newPassword.length < 7) {
        res.status(406).json({message: 'New password must be 7 characters or longer!'});
        return;
    }

    const client = await connectToDatabase();
    const users = client.db().collection('users');

    const user = await users.findOne({ email: email });

    if (!user) {
        res.status(404).json({ message: 'User not found!' });
        client.close();
        return;
    }

    const currentPassword = user.password;
    const isValid = await verifyPassword(oldPassword, currentPassword);

    if (!isValid) {
        res.status(422).json({ message: 'Passwords not equal!' });
        client.close();
        return;
    }

    const newHashPassword = await hashPassword(newPassword);

    await users.updateOne({ email: email }, { $set: { password: newHashPassword } });
    res.status(200).json({ message: 'New password set!' });
    client.close();
}

export default handler;